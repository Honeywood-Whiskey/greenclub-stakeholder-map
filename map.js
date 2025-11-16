// =========================
//  MAPBOX INITIALIZATION
// =========================
mapboxgl.accessToken =
  "pk.eyJ1IjoiY29ybmVsbC1ncmVlbmNsdWItbWFwIiwiYSI6ImNtaHNxOXFxYzFubzEybHExeWF0Ymw4bzYifQ.j1WXA1sRXlFdN7XH7_8lTg";

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v12",
  center: [-76.5, 42.44],
  zoom: 11,
});

// Storage
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

  const combined = Object.values(fields)
    .flat()
    .join(" ")
    .toLowerCase();

  return combined.includes(term);
}

// =========================
//  MULTI-SELECT HELPERS
// =========================

// Returns array of selected values from a <select multiple>
function getSelectedValues(selectEl) {
  return Array.from(selectEl.selectedOptions).map((opt) => opt.value);
}

// OR check for single-value categories
function matchesOr(singleValue, selectedArray) {
  if (!selectedArray || selectedArray.length === 0) return true;
  return selectedArray.includes(singleValue);
}

// OR check for array fields (e.g., ["Echo", "Asphalt"])
function matchesAny(arrayField, selectedArray) {
  if (!selectedArray || selectedArray.length === 0) return true;
  return arrayField.some((v) => selectedArray.includes(v));
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

  // MULTI-SELECT FILTER ARRAYS
  const selectedCategories = getSelectedValues(
    document.getElementById("categoryFilter")
  );
  const selectedSubteams = getSelectedValues(
    document.getElementById("subteamFilter")
  );

  // Clear markers
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

    // LOGIC BLOCK
    const searchMatch = recordMatchesSearch(rec, search);
    const categoryMatch = matchesOr(typeField, selectedCategories);
    const subteamMatch = matchesAny(subteamField, selectedSubteams);

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

  document.getElementById("search").addEventListener("input", applyFilters);
  document.getElementById("categoryFilter").addEventListener("change", applyFilters);
  document.getElementById("subteamFilter").addEventListener("change", applyFilters);
})();
