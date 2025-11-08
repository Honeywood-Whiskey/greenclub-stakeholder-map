# Stakeholders

The **GreenClub Stakeholder Map** connects the people and organizations driving sustainability efforts at Cornell and in the wider Ithaca community.  
This document outlines who contributes to, benefits from, and maintains the project.

---

## 🎓 Internal Stakeholders

| Group | Description | Role |
|--------|--------------|------|
| **Cornell GreenClub Members** | Undergraduate and graduate students working on sustainability initiatives. | Primary maintainers of the Airtable CRM and project documentation. |
| **GreenClub Leadership Team** | Project leads responsible for semester planning and stakeholder handoff. | Define data collection standards and oversee updates to Airtable and Mapbox. |
| **Cornell Sustainability Office** | Institutional partner that supports cross-campus sustainability projects. | Acts as an advisory partner, potential data collaborator. |
| **Faculty Advisors / Mentors** | Professors and sustainability coordinators who provide academic context. | Offer feedback, research integration, and continuity. |

---

## 🌎 External Stakeholders

| Group | Description | Role |
|--------|--------------|------|
| **Local Restaurants & Cafés** | Partners donating food or participating in composting initiatives. | Data sources; represented as pins on the stakeholder map. |
| **Composting Sites** | Local and campus-based compost facilities. | Provide data for waste diversion and processing capacity. |
| **Food Redistribution Orgs** | Groups like Loaves & Fishes, Friendship Donations Network. | Collaborators in sustainability and hunger mitigation programs. |
| **Municipal & Community Partners** | City of Ithaca, Tompkins County Solid Waste, etc. | Infrastructure and policy-level collaboration. |
| **Nonprofits** | Cornell Food Pantry, Rethink Food, etc. | Infrastructure and policy-level collaboration. |

---

## 💻 Technical Stakeholders

| Group | Description | Role |
|--------|--------------|------|
| **Developers / Contributors** | Students working on automation, web development, or data analysis. | Maintain scripts, integration logic, and documentation. |
| **Designers & Communicators** | GreenClub members creating outreach visuals, branding, and UI/UX. | Shape the visual identity of the stakeholder map. |
| **Future Student Teams** | GreenClub members in future semesters. | Continue development, add new data, and maintain systems. |

---

## 🧩 How Stakeholders Interact

```mermaid
flowchart TD
    A[Local Partners] --> B[Airtable Database]
    B --> C[Python Sync Script]
    C --> D[Mapbox Dataset]
    D --> E[Public Map Interface]
    E --> F[Students, Researchers, and Community Members]
