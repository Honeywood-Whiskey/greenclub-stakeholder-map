# 🌱 GreenClub Stakeholder Map  
### Cornell GreenClub | Sustainability | Community Mapping  
Interactive, API-driven mapping of Ithaca & Cornell food-waste stakeholders.

---

## 🏛️ Project Context  
**Sustainability NME – FA 2025**  
A centralized stakeholder CRM + interactive public outreach map to support Cornell GreenClub’s restaurant partnerships, composting initiatives, food-waste reduction projects, and community relationships.

This project links **data + design + environmental impact** into one living system.

---

# 🧭 Overview  
The **GreenClub Stakeholder Map** connects Cornell’s sustainability ecosystem by integrating:

- **Airtable** → structured CRM for all stakeholders  
- **Node/JS backend** → secure middleware (no API keys in the browser)  
- **Mapbox GL JS** → interactive filtering map  
- **Vercel** → public deployment (auto rebuilds on push)  
- **Python (optional)** → data enrichment & batch ingestion  

This map powers:
- restaurant outreach workflows  
- composting site mapping  
- nonprofit + municipal partner discovery  
- long-term CRM continuity for future GreenClub teams  

> 💡 **Goal:** a transparent, evolving map of Ithaca’s sustainability landscape — discoverable, filterable, and operationally useful.

---

# 🧩 System Architecture  
**Airtable → Vercel Serverless Endpoint → GeoJSON → Mapbox Front-End**

| Layer | Description | Technology |
|--------|-------------|-------------|
| **Data Layer** | Stakeholder master table stored in Airtable | Airtable API |
| **Backend Layer** | Serverless function fetches → normalizes → outputs clean JSON | `/api/get_data.js` on Vercel |
| **Visualization Layer** | Interactive frontend map, filtering, search | Mapbox GL JS |
| **Deployment Layer** | CI/CD deploys frontend + backend together | Vercel |
| **Documentation** | Governance, schema, workflows | `/docs` directory |

### 🔐 Security  
- Airtable API key moved **server-side only**  
- No secrets in client-side JS  
- Environment variables handled through Vercel + `.env.local`  

---

# 🗂️ Repository Structure  
```
├── api/ # Backend (Vercel serverless)
│ └── get_data.js # Fetch + normalize Airtable → JSON
│
├── docs/ # Full project documentation
│ ├── 00-glossary/
│ ├── 01-overview/
|
├── public/ # Static assets (optional)
│
├── index.html # Main map page (served by Vercel)
├── map.js # Frontend JS (Mapbox + filters + search)
├── style.css # Styling
│
├── package.json # Dependencies for Vercel + local dev
├── .env.example # Template with required variables
├── .gitignore
└── README.md
```


---

# 🔍 Features  
- Interactive Mapbox GL visualization  
- Multi-select category filters  
- **Global text search** across all Airtable fields  
- Secure serverless Airtable fetching  
- Color-coded stakeholder markers  
- Clean popups with category tags  
- Responsive public web UI  
- Automatic rebuilds on Vercel deployments  

---

# 🧰 Developer Setup (Quickstart)

### **1. Clone the repository**
```bash
git clone https://github.com/Honeywood-Whiskey/greenclub-stakeholder-map.git
cd greenclub-stakeholder-map
```

### **2. Install dependencies**
```bash
npm install
```

### **3. Configure environment variables**
Copy .env.example to .env.local:

```bash
MAPBOX_TOKEN=pk.xxxxxxxx
AIRTABLE_TOKEN=pat.xxxxxxxx
AIRTABLE_BASE_ID=appXXXXXXXX
AIRTABLE_TABLE=Stakeholders
```
Local development: .env.local
Production (Vercel): Project Settings → Environment Variables

### **4. Run locally**
```bash
vercel dev
```

The backend will be available at:
```bash
http://localhost:3000/api/get_data
```

### **5. Deploy to Vercel**

Push to GitHub → Vercel auto-deploys.
Or deploy manually:
```bash
vercel --prod
```

Your live map will be hosted at a URL like:
```bash
https://greenclub-stakeholder-map.vercel.app/
```

🛠️ Technology Stack
| Layer                | Technology                            |
| -------------------- | ------------------------------------- |
| **Backend**          | Node.js serverless (Vercel Functions) |
| **Database**         | Airtable                              |
| **Frontend Map**     | Mapbox GL JS                          |
| **Styling**          | CSS                                   |
| **Deployment**       | Vercel CI/CD                          |
| **Optional Scripts** | Python for scraping / data enrichment |

📚 Documentation Index
| Category                  | Folder                 |
| ------------------------- | ---------------------- |
| 🌍 Mission & Stakeholders | `docs/01-overview`     |
| 📐 Architecture           | `docs/02-architecture` |
| ⚙️ Technical Setup        | `docs/03-technical`    |
| 🗺️ Data Model            | `docs/04-data-sources` |
| 🎨 Map Features           | `docs/07-features`     |
| 🚀 Roadmap                | `docs/10-roadmap`      |
| 📕 Glossary               | `docs/00-glossary`     |


---

If you'd like, I can also provide:

📸 A version with screenshot placeholders  
🎨 Color palette version matching Honeywood & Whisky  
🛠️ A `CONTRIBUTING.md` rewrite  
📈 A visual architecture diagram  

Just tell me!


