// === CONFIGURATION ===
mapboxgl.accessToken = 'pk.eyJ1IjoiY29ybmVsbC1ncmVlbmNsdWItbWFwIiwiYSI6ImNtaHNxOXFxYzFubzEybHExeWF0Ymw4bzYifQ.j1WXA1sRXlFdN7XH7_8lTg';

// === INITIALIZE MAP ===
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v11',
  center: [-76.5, 42.44],
  zoom: 11
});

// === FETCH DATA SAFELY THROUGH BACKEND ===
async function loadAirtableData() {
  const response = await fetch('/api/get_data');
  const json = await response.json();
  return json.records;
}

// === PLOT STAKEHOLDERS ON MAP ===
async function plotStakeholders() {
  const records = await loadAirtableData();

  for (const rec of records) {
    const f = rec.fields;
    if (!f.Latitude || !f.Longitude) continue;

    const coords = [parseFloat(f.Longitude), parseFloat(f.Latitude)];
    const colorMap = {
      Restaurant: "#ff7b00",
      "Food Pantry": "#009688",
      "Compost Site": "#8BC34A",
      "Nonprofit": "#0066ff",
      "Co-op": "#9C27B0",
      "Grocery Store": "#4CAF50"
    };

    const type = Array.isArray(f["Stakeholder Type"])
      ? f["Stakeholder Type"][0]
      : f["Stakeholder Type"];
    const subteam = Array.isArray(f["Subteam Tag"])
      ? f["Subteam Tag"].join(", ")
      : f["Subteam Tag"];
    const markerColor = colorMap[type] || "#555";

    new mapboxgl.Marker({ color: markerColor })
      .setLngLat(coords)
      .setPopup(
        new mapboxgl.Popup().setHTML(`
          <b>${f.Name}</b><br>
          <i>${type}</i><br>
          ${f.Address}<br>
          Subteam: ${subteam || "—"}<br>
          <a href="${f.Website}" target="_blank">Website</a>
        `)
      )
      .addTo(map);
  }
}

plotStakeholders();
