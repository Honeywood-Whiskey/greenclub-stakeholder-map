# 🌱 GreenClub Stakeholder Map

### Cornell GreenClub | Sustainability | Community Mapping

---

### 🏛️ Project Context
**Sustainability NME FA 2025 Project**  
Centralized stakeholder CRM and interactive public map for Cornell GreenClub members to manage, visualize, and grow community partnerships.

---

## 🧭 Overview

The **GreenClub Stakeholder Map** is an open-source information system designed to help Cornell GreenClub centralize and visualize its network of sustainability partners — including local restaurants, composting sites, nonprofits, and student organizations.

This project bridges **data, design, and impact**:
- Airtable serves as the structured CRM.  
- Python scripts handle data transformation.  
- Mapbox/Leaflet provides an interactive visualization layer.  

> 💡 The goal: a living, transparent ecosystem that empowers collaboration, continuity, and storytelling across Cornell’s sustainability community.

---

## 🧩 System Architecture
Airtable → Python Pipeline → GeoJSON → Map Visualization → Public Interaction

| Layer | Description | Technology |
|--------|-------------|-------------|
| **Data Layer** | Stakeholder data stored in Airtable | Airtable API |
| **Transformation Layer** | Converts Airtable data into GeoJSON format | Python (`requests`, `dotenv`) |
| **Visualization Layer** | Displays interactive, category-filtered map | Mapbox Studio / Leaflet JS |
| **Documentation Layer** | Defines conceptual, technical, and governance structure | Markdown in `/docs/` |

---

## 🗂️ Repository Structure
├── data/ # Generated or sample data
│ ├── greenclub_map.geojson
│ └── sample_airtable.json
│
├── docs/ # Full project documentation
│ ├── 00-glossary/ # Shared terminology
│ ├── 01-overview/ # Mission, stakeholders, context
│ ├── 02-architecture/ # Conceptual system design
│ ├── 03-technical/ # Setup & integration docs
│ ├── 04-data-sources/ # Airtable structure and data ownership
│ ├── 07-features/ # Map display attributes
│ └── 10-roadmap/ # Future plans and milestones
│
├── src/ # Data processing logic
│ ├── airtable/ # Airtable API logic
│ ├── mapbox/ # Upload & integration scripts
│ ├── utils/ # Helper functions (GeoJSON builder)
│ └── sync.py # Main orchestration script
│
├── web/ # Optional front-end demo
│ ├── index.html
│ ├── scripts.js
│ └── style.css
│
├── .gitignore
├── CONTRIBUTING.md
├── LICENSE
└── README.md

---


---

## 📘 Documentation Guide

| Category | Folder | Description |
|-----------|---------|-------------|
| 🌍 **Mission & Stakeholders** | [`docs/01-overview`](docs/01-overview) | Why the project exists and who it serves |
| 🧠 **Architecture** | [`docs/02-architecture`](docs/02-architecture) | Conceptual system design and data flow |
| ⚙️ **Technical Setup** | [`docs/03-technical`](docs/03-technical) | Airtable, Mapbox, and setup guides |
| 🗺️ **Data Model** | [`docs/04-data-sources`](docs/04-data-sources) | Airtable schema and stewardship rules |
| 🧩 **Map Features** | [`docs/07-features`](docs/07-features) | Visual attributes and filtering options |
| 🚀 **Roadmap** | [`docs/10-roadmap`](docs/10-roadmap) | Future development and milestones |
| 📖 **Glossary** | [`docs/00-glossary`](docs/00-glossary) | Key definitions and naming conventions |

---

## 🧰 Setup (Developer Quickstart)

1. **Clone this repository**
   ```bash
   git clone https://github.com/Honeywood-Whiskey/greenclub-stakeholder-map.git
   cd greenclub-stakeholder-map


2. **Install dependencies**
   pip install -r requirements.txt

3. **Configure Environement**
  MAPBOX_TOKEN=pk.xxxxxx
  MAPBOX_USERNAME=honeywood-whiskey
  AIRTABLE_TOKEN=pat.xxxxxx
  AIRTABLE_BASE_ID=appXXXXXXX
  AIRTABLE_TABLE=Stakeholders

4. **Run Data Sync**
   python src/sync.py

## 📜 License

This project is licensed under the MIT License — see LICENSE for details.
© 2025 Cornell GreenClub, Honeywood-Whiskey Project Maintainers

🌿 Maintainers
Affiliation: Cornell GreenClub
