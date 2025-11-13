// === CONFIGURATION ===
mapboxgl.accessToken = '';
const AIRTABLE_BASE_ID = '';
const AIRTABLE_TABLE_ID = '';
const AIRTABLE_TOKEN = '';

// === INITIALIZE MAP ===
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v11', 
  center: [-76.5, 42.44],
  zoom: 11
});

// === FETCH STAKEHOLDER DATA FROM AIRTABLE ===
async function loadAirtableData() {
  const response = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}`, {
    headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` }
  });
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

    // Color by stakeholder type
    const colorMap = {
      Restaurant: "#ff7b00",
      "Food Pantry": "#009688",
      "Compost Site": "#8BC34A",
      "Nonprofit": "#0066ff",
      "Co-op": "#9C27B0",
      "Grocery Store": "#4CAF50"
    };

    // Handle arrays or single text fields
    const type = Array.isArray(f["Stakeholder Type"])
      ? f["Stakeholder Type"][0]
      : f["Stakeholder Type"];
    const subteam = Array.isArray(f["Subteam Tag"])
      ? f["Subteam Tag"].join(", ")
      : f["Subteam Tag"];
    const markerColor = colorMap[type] || "#555";

    // Create and add marker
    new mapboxgl.Marker({ color: markerColor })
      .setLngLat(coords)
      .setPopup(
        new mapboxgl.Popup().setHTML(`
          <b>${f.Name}</b><br>
          <i>${type}</i><br>
          ${f.Address}<br>
          Subteam: ${subteam || "—"}<br>
          <a href="${f.Wesbite}" target="_blank">Website</a>
        `)
      )
      .addTo(map);
  }
}

plotStakeholders();
