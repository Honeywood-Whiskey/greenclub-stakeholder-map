# 🧩 Information Architecture

## Purpose
The GreenClub Stakeholder Map is structured around the principle of **clarity and continuity** — ensuring that both student contributors and future project maintainers can understand how data flows through the system at a glance.  
Each layer in the architecture has a *single, well-defined responsibility*, allowing GreenClub to evolve without breaking existing workflows.

---

## 📊 High-Level Data Flow

```
📊 GreenClub Stakeholder Map – Information Architecture
│
├── 1️⃣ Data Layer
│ ├── Airtable Base: "Stakeholder Records"
│ │ • Source of truth for all partner data
│ │ • Fields include name, location, contact, category, notes
│ │ • Data entered manually by GreenClub members
│ └── Version Control: Airtable history log and backup exports
│
├── 2️⃣ Processing Layer
│ ├── fetch_records.py
│ │ • Pulls records from Airtable via API (JSON)
│ │ • Normalizes data (e.g. ensures location coordinates exist)
│ │ • Handles errors and missing fields gracefully
│ ├── geojson_builder.py
│ │ • Converts cleaned records to GeoJSON format
│ │ • Groups stakeholders by category (e.g. restaurant, nonprofit)
│ │ • Prepares map metadata (color, tags, tooltip content)
│ └── sync.py
│ • Coordinates full update cycle (fetch → clean → export)
│
├── 3️⃣ Visualization Layer
│ ├── Mapbox Dataset
│ │ • Stores up-to-date spatial data (GeoJSON)
│ │ • Synced automatically from Processing Layer
│ ├── Public Map (index.html + scripts.js)
│ │ • Displays map on a simple front-end webpage
│ │ • Provides search and category filtering
│ └── style.css
│ • Controls visual styling for accessibility and clarity
│
└── 4️⃣ Documentation Layer
├── Markdown files under /docs
│ • Define architecture, schema, and governance
│ • Help onboard future GreenClub teams
└── Structured naming ensures predictable discovery
```


---

## 🧠 Design Rationale

### 1. Separation of Concerns
Each layer handles only one function — **Airtable stores data**, **Python cleans it**, **Mapbox visualizes it**.  
This separation allows easy updates without rewriting the entire pipeline.

### 2. Reproducibility and Transparency
Because everything from schema to scripts is version-controlled, the entire data journey — from spreadsheet to visualization — can be reproduced by future members or auditors.

### 3. Human-Centric Design
GreenClub members aren’t all programmers. Airtable provides a familiar interface for manual data entry, while automation quietly handles synchronization and formatting behind the scenes.

### 4. Minimal Infrastructure
The project intentionally avoids complex servers or databases.  
Using lightweight APIs (Airtable + Mapbox) ensures that the tool can run from any student laptop or GitHub Actions workflow.

---

## 🔄 Update Cycle Summary
1. New or edited records are entered in Airtable.  
2. Python scripts fetch and clean this data automatically.  
3. Updated GeoJSON is uploaded to Mapbox via API.  
4. The public map reflects these changes instantly.  

This cycle enables both **ease of maintenance** and **real-time transparency** across the GreenClub network.

---

## 🪴 Future Extension Ideas
- Add basic analytics (e.g. stakeholder density by category)  
- Include time-based map layers (showing partnership growth)  
- Integrate with student project tracking dashboards  
- Automate change alerts via Slack or email webhook

---

_Last updated: November 2025_

