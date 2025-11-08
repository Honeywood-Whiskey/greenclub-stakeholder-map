# 🏗️ System Diagram

This document visualizes the **technical architecture** of the GreenClub Stakeholder Map.  
It describes how data moves between systems, who interacts with it, and why this setup supports long-term continuity across semesters.

---

## 🌐 Overview

The system is composed of three primary subsystems, each with a clear responsibility:

| Subsystem | Function | Owner |
|------------|-----------|--------|
| **Airtable CRM** | Stores all stakeholder data (partners, addresses, categories, notes). | GreenClub members |
| **Python Data Pipeline** | Fetches, transforms, and exports Airtable data into GeoJSON format. | Technical contributors |
| **Mapbox Visualization** | Hosts the live, interactive stakeholder map. | GreenClub Tech / Design Team |

---

## 🧩 High-Level Architecture

```
📊 GreenClub Stakeholder Map – Data Pipeline
│
├── Data Layer
│ └── Airtable Base → Stakeholder Records
│
├── Processing Layer
│ ├── fetch_records.py → pulls and normalizes data
│ └── geojson_builder.py → builds map dataset
│
└── Visualization Layer
├── Mapbox Dataset → uploaded via API
└── Public Map (HTML + JS) → viewed by community users
```
