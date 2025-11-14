// === MAPBOX INIT ===
mapboxgl.accessToken =
  'pk.eyJ1IjoiY29ybmVsbC1ncmVlbmNsdWItbWFwIiwiYSI6ImNtaHNxOXFxYzFubzEybHExeWF0Ymw4bzYifQ.j1WXA1sRXlFdN7XH7_8lTg';

const map = new mapboxgl.Map({
  container: "map",
  style: 'mapbox://styles/mapbox/streets-v12',
  center: [-76.5, 42.44],
  zoom: 11
});

// Color legend for categories
const COLOR_MAP = {
  "Restaurant": "#ff7b00",
  "Compost Site": "#009688",
  "Food Pantry": "#4CAF50",
  "Nonprofit": "#9C27B0",
  "Grocery Store": "#3F51B5",
  "Co-op": "#8BC34A",
  "Community Kitchen": "#D32F2F",
  "Distributor": "#795548",
  "Farm": "#2E7D32",
  "Liquor Store": "#6D4C41",
  "Other": "#555"
};

let allMarkers = [];
let allRecords = [];

// === FETCH DATA FROM BACKEND ===
async function loadAirtableData() {
  try {
    const res = await fetch("/api/get_data");
    const data = await res.json();
    return data.records || [];
  } catch (err) {
    console.error("Frontend fetch error:", err);
    return [];
  }
}

// === CLEAR ALL MAP MARKERS ===
function clearMarkers() {
  allMarkers.forEach((m) => m.remove());
  allMarkers = [];
}

// === APPLY FILTERS + REDRAW MARKERS ===
function applyFilters() {
  const search = document.getElementById("search").value.toLowerCase();
  const category = document.getElementById("categoryFilter").value;
  const subteam = document.getElementById("subteamFilter").value;

  clearMarkers();

  allRecords.forEach((rec) => {
    const f = rec.fields;
    if (!f.Latitude || !f.Longitude) return;

    const nameMatch = f.Name?.toLowerCase().includes(search);
    // Stakeholder Type may be an array
    const types = f["Stakeholder Type"];
    const categoryMatch =
      !category ||
      (Array.isArray(types) && types.includes(category));

    // Subteam Tag may be an array
    const teams = f["Subteam Tag"];
    const subteamMatch =
      !subteam ||
      (Array.isArray(teams) && teams.includes(subteam));

    if (nameMatch && categoryMatch && subteamMatch) {
      const lat = parseFloat(f.Latitude);
      const lng = parseFloat(f.Longitude);

      const color = COLOR_MAP[f["Stakeholder Type"]] || "#555";

      const marker = new mapboxgl.Marker({ color })
        .setLngLat([lng, lat])
        .setPopup(
          new mapboxgl.Popup().setHTML(`
            <strong>${f.Name}</strong><br>
            ${f.Address || ""}<br>
            <i>${f["Stakeholder Type"] || ""}</i><br>
            <i>${f["Subteam Tag"] || ""}</i>
          `)
        )
        .addTo(map);

      allMarkers.push(marker);
    }
  });
}

// === BUILD LEGEND ===
function buildLegend() {
  const legend = document.getElementById("legend");
  legend.innerHTML = "";

  Object.entries(COLOR_MAP).forEach(([label, color]) => {
    const row = document.createElement("div");
    row.innerHTML = `<span style="background:${color}"></span> ${label}`;
    legend.appendChild(row);
  });
}

// === INITIAL LOAD ===
(async () => {
  allRecords = await loadAirtableData();
  buildLegend();
  applyFilters();
})();

// === FILTER EVENT LISTENERS ===
document.getElementById("search").addEventListener("input", applyFilters);
document.getElementById("categoryFilter").addEventListener("change", applyFilters);
document.getElementById("subteamFilter").addEventListener("change", applyFilters);
