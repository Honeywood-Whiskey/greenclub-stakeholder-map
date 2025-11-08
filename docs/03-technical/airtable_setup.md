# 📊 Airtable Setup Guide

This guide explains how to set up **Airtable** as the central CRM for GreenClub’s Stakeholder Map.  
Airtable will serve as the **single source of truth** for all partner and stakeholder data.

> 🧭 **Audience:** GreenClub members managing data entry or integration.

---

## 🧠 1. Create a New Base

1. Go to [https://airtable.com](https://airtable.com)  
2. Click **“Add a base” → “Start from scratch.”**  
3. Name it: GreenClub Stakeholder Map
4. Inside your new base, create a table called: Stakeholders


---

## 📋 2. Add Required Fields

Each stakeholder should have these fields (columns):

| Field Name | Type | Description |
|-------------|------|-------------|
| **Name** | Single line text | Stakeholder or organization name |
| **Category** | Single select | Restaurant, Compost Site, Nonprofit, Student Org, etc. |
| **Address** | Text | Full address (used to geocode) |
| **Latitude** | Number | Decimal coordinate for map plotting |
| **Longitude** | Number | Decimal coordinate for map plotting |
| **Contact** | Email or text | Contact email or phone |
| **Notes** | Long text | Comments, partnership details, or updates |
| **Last Updated** | Date | Tracks the most recent record change |

> 💡 **Tip:** Airtable auto-saves all changes and maintains a version history.

---

## 🧱 3. Optional: Add Linked Tables

You can add linked tables later for extra functionality, such as:
- `Projects` → to track collaborations
- `Contacts` → to store individuals tied to organizations
- `Tags` → for flexible metadata

These are optional but help as your dataset grows.

---

## 🔑 4. Create a Personal Access Token (PAT)

1. In Airtable, click your **profile icon → Developer Hub → Personal Access Tokens**.  
2. Click **“Create new token.”**  
3. Name it: GreenClub Data Connector

4. Under **Scopes**, check:
- `data.records:read`
- `schema.bases:read`
5. Under **Access**, choose only your **Stakeholder Map base**.  
6. Copy the token — it will start with `pat`.

> ⚠️ You will **not be able to view the token again** once you leave the page — store it securely in your `.env` file.

---

## ⚙️ 5. Find Your Base ID

To locate your base ID:
1. Go to the [Airtable API docs](https://airtable.com/api).  
2. Select your new base.  
3. Look at the URL — it will look like: https://airtable.com/appXXXXXXX/api/docs

Your base ID is the part starting with `app`.

Example: AIRTABLE_BASE_ID=appabcdef1234567


---

## 🧩 6. Add Values to `.env`

Add the following lines to your `.env` file (in the project root):
AIRTABLE_TOKEN=pat_xxxxxx
AIRTABLE_BASE_ID=appXXXXXXX
AIRTABLE_TABLE=Stakeholders


> Make sure your `.env` file is listed in `.gitignore` so it isn’t uploaded to GitHub.

---

## 🧮 7. Test the Connection

Run this command to test your integration:

```bash
python src/airtable/fetch_records.py
```

✅ Successfully fetched 50 records from Airtable!

🧭 8. Data Maintenance Workflow
📋 Step 1 → Add or edit stakeholder records in Airtable
📦 Step 2 → Python script fetches updated data via API
🧮 Step 3 → Data transforms to GeoJSON
🗺️ Step 4 → New map is built and uploaded to Mapbox



