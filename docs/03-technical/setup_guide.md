# ⚙️ Technical Setup Guide

The **GreenClub Stakeholder Map** connects Airtable, Mapbox, and Python scripts to create a living visualization of Cornell’s sustainability network.

This guide walks you through setting up your environment so that the project can run seamlessly on your local machine.

> 🧭 **Audience:** GreenClub technical leads, data officers, or members helping maintain the digital map.

---

## 🪴 1. Prerequisites

Before beginning, make sure you have the following installed:

| Tool | Purpose |
|------|----------|
| **Git** | To clone and update the repository |
| **Python 3.10+** | For running sync and data processing scripts |
| **Airtable Account** | To store stakeholder data |
| **Mapbox Account** | To host and style the public map |
| **GitHub Access** | To contribute updates to the shared repo |

Check your versions:

```bash
git --version
python3 --version
git clone https://github.com/Honeywood-Whiskey/greenclub-stakeholder-map.git
cd greenclub-stakeholder-map
pip install -r requirements.txt
pip freeze > requirements.txt
requests
python-dotenv
```

🧮 5. Test Airtable Connection

Run the following to confirm your token and base ID are correct:

```bash
python src/airtable/fetch_records.py
```

Expected output:

✅ Fetched 50 records from Airtable.


If errors occur, revisit airtable_setup.md for troubleshooting steps.

🗺️ 6. Generate and Upload Map Data

Build and upload the map dataset:

```bash
python src/utils/geojson_builder.py
python src/sync.py
```

Expected output:

✅ GeoJSON file generated: /data/greenclub_map.geojson
✅ Mapbox dataset updated successfully.


If you see a 401 Unauthorized error, double-check your MAPBOX_TOKEN in .env.

🧠 7. Verify the Visualization

Open your local demo map:

```bash
open web/index.html
```

You should see Cornell-area stakeholders plotted on an interactive map.
If not:
- Ensure your dataset ID in Mapbox matches your style ID.
- Confirm that all coordinates are valid (latitude/longitude).

🧭 8. Project File Overview
```
📂 greenclub-stakeholder-map
│
├── data/                → Output GeoJSON + sample Airtable exports
├── docs/                → Documentation (this folder)
├── src/                 → Python scripts
│   ├── airtable/        → Pull + clean Airtable data
│   ├── utils/           → Build GeoJSON, handle errors
│   ├── mapbox/          → Upload to Mapbox via API
│   └── sync.py          → Orchestrates the pipeline
└── web/                 → Demo map frontend (HTML, JS, CSS)
```

🔄 9. Typical Workflow
🧩 Step 1 → Update Airtable records
📡 Step 2 → Run sync.py to rebuild GeoJSON
🗺️ Step 3 → Push updates to Mapbox
🌐 Step 4 → Open web/index.html to verify

🧾 10. Next Steps

Set up Airtable: airtable_setup.md

Set up Mapbox: mapbox_setup.md

Secure credentials: environment_config.md

Last updated: November 2025


