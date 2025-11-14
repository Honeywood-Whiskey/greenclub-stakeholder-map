// =========================
//  MAPBOX INITIALIZATION
// =========================
mapboxgl.accessToken =
  "pk.eyJ1IjoiY29ybmVsbC1ncmVlbmNsdWItbWFwIiwiYSI6ImNtaHNxOXFxYzFubzEybHExeWF0Ymw4bzYifQ.j1WXA1sRXlFdN7XH7_8lTg";

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v12", // More colorful basemap
  center: [-76.5, 42.44],
  zoom: 11,
});

// Storage for markers (so filtering can hide/show them)
let allMarkers = [];
let allRecords = [];

// =========================
//  FETCH FROM BACKEND
// =========================
async function loadAirtableData() {
  try {
    const res = await fetch("/api/get_data");
    const data = await res.json();
    return data.records || [];
  } catch (err) {
    console.error("Frontend fetch failed:", err);
    return [];
  }
}

// =========================
//  UNIVERSAL SEARCH MATCHER
// =========================
function recordMatchesSearch(rec, searchTerm) {
  if (!searchTerm) return true;

  const term = searchTerm.toLowerCase();
  const fields = rec.fields;

  // Combine ALL fields into a single searchable string
  const combined = Object.values(fields)
    .flat() // unpack arrays like ["Farm"]
    .join(" ")
    .toLowerCase();

  return combined.includes(term);
}

// =========================
//  CATEGORY COLORS
// =========================
const colorMap = {
  "Compost Site": "#8BC34A",
  Distributor: "#795548",
  "Food Pantry": "#009688",
  Nonprofit: "#3F51B5",
  Other: "#607D8B",
  Restaurant: "#FF7043",
  "Grocery Store": "#4CAF50",
  "Co-op": "#9C27B0",
  "Community Kitchen": "#FFCA28",
  Farm: "#66BB6A",
  "Liquor Store": "#6D4C41",
};

// Build legend
function buildLegend() {
  const legend = document.getElementById("legend");
  legend.innerHTML = "";

  Object.entries(colorMap).forEach(([label, color]) => {
    const row = document.createElement("div");
    row.innerHTML = `<span style="background:${color}"></span> ${label}`;
    legend.appendChild(row);
  });
}

// =========================
//  CREATE MARKER
// =========================
function createMarker(rec) {
  const f = rec.fields;

  if (!f.Latitude || !f.Longitude) return null;

  const lat = parseFloat(f.Latitude);
  const lng = parseFloat(f.Longitude);

  if (isNaN(lat) || isNaN(lng)) return null;

  const type = Array.isArray(f["Stakeholder Type"])
    ? f["Stakeholder Type"][0]
    : f["Stakeholder Type"];

  const color = colorMap[type] || "#555";

  const popupHTML = `
    <strong>${f.Name || "Unnamed"}</strong><br>
    ${type || "Unknown Type"}<br>
    ${f.Address || ""}<br>
    <em>${(f["Subteam Tag"] || []).join(", ")}</em>
  `;

  const marker = new mapboxgl.Marker({ color })
    .setLngLat([lng, lat])
    .setPopup(new mapboxgl.Popup().setHTML(popupHTML))
    .addTo(map);

  return marker;
}

// =========================
//  APPLY FILTERING
// =========================
function applyFilters() {
  const search = document.getElementById("search").value.trim().toLowerCase();
  const category = document.getElementById("categoryFilter").value;
  const subteam = document.getElementById("subteamFilter").value;

  // Remove all markers from map first
  allMarkers.forEach((m) => m.remove());
  allMarkers = [];

  allRecords.forEach((rec) => {
    const f = rec.fields;

    const typeField = Array.isArray(f["Stakeholder Type"])
      ? f["Stakeholder Type"][0]
      : f["Stakeholder Type"] || "";

    const subteamField = Array.isArray(f["Subteam Tag"])
      ? f["Subteam Tag"]
      : f["Subteam Tag"]
      ? [f["Subteam Tag"]]
      : [];

    // ----- Filtering logic -----
    const searchMatch = recordMatchesSearch(rec, search);
    const categoryMatch = category ? typeField === category : true;
    const subteamMatch = subteam
      ? subteamField.includes(subteam)
      : true;

    if (searchMatch && categoryMatch && subteamMatch) {
      const marker = createMarker(rec);
      if (marker) allMarkers.push(marker);
    }
  });
}

// =========================
//  MAIN: LOAD + INIT
// =========================
(async () => {
  allRecords = await loadAirtableData();
  console.log("Loaded records:", allRecords.length);

  buildLegend();
  applyFilters();

  // Re-run filtering whenever dropdowns change
  document.getElementById("search").addEventListener("input", applyFilters);
  document.getElementById("categoryFilter").addEventListener("change", applyFilters);
  document.getElementById("subteamFilter").addEventListener("change", applyFilters);
})();
