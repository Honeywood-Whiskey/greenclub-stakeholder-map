# 🗺️ Mapbox Setup Guide

This guide walks you through setting up **Mapbox** to visualize the stakeholder data fetched from Airtable.

Mapbox serves as the visualization layer in the GreenClub Stakeholder Map — turning clean, structured data into an interactive public map that can be shared with the Cornell community.

> 🧭 **Audience:** GreenClub technical and visualization leads.

---

## 🌍 1. Create a Mapbox Account

1. Visit [https://www.mapbox.com](https://www.mapbox.com).  
2. Click **Sign Up → Individual Plan** (the free tier is sufficient).  
3. Verify your email and log in to the [Mapbox Dashboard](https://account.mapbox.com/).

---

## 🔑 2. Create a New Access Token

1. Navigate to [Access Tokens](https://account.mapbox.com/access-tokens).  
2. Click **“Create a token.”**  
3. Name it: GreenClub Development Key
4. Copy the token — it will start with `pk.` (public key).  
5. Add it to your `.env` file:

MAPBOX_TOKEN=pk.xxxxxx
MAPBOX_USERNAME=honeywood-whiskey


> ⚠️ Tokens are tied to your account.  
> Only share them securely with current GreenClub project maintainers.

---

## 🗂️ 3. Create a Dataset

1. Go to [Mapbox Studio → Datasets](https://studio.mapbox.com/datasets/).  
2. Click **“New Dataset.”**  
3. Name it: GreenClub Stakeholders

4. This dataset will later be updated automatically via your Python script (in `/src/mapbox/`).

---

## 🎨 4. Create and Style Your Map

1. In [Mapbox Studio → Styles](https://studio.mapbox.com/styles/), click **“New style.”**  
2. Choose a base theme — for example:
- 🌿 *Light* (clean and accessible)  
- 🪴 *Outdoors* (green tones fit sustainability branding)
3. Click **“Customize”** and name your style: GreenClub Stakeholder Map

4. Publish your style.  
The URL will look like: mapbox://styles/honeywood-whiskey/clxxxxxxx

Your **style ID** is the part after your username (e.g., `clxxxxxxx`).

---

## 🧩 5. Connect Your Map to the Front-End

In your `web/index.html` file, locate this snippet:

Your **style ID** is the part after your username (e.g., `clxxxxxxx`).

our **style ID** is the part after your username (e.g., `clxxxxxxx`).

---

## 🧩 5. Connect Your Map to the Front-End

In your `web/index.html` file, locate this snippet:

```js
mapboxgl.accessToken = MAPBOX_TOKEN;
const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/MAPBOX_USERNAME/YOUR_STYLE_ID',
center: [-76.5, 42.45],
zoom: 11
});
```

Replace YOUR_STYLE_ID with the ID of your published style.
style: 'mapbox://styles/honeywood-whiskey/cl123abc456xyz'

6. Upload Data Automatically
The project’s Python script (src/sync.py) handles the data upload process.

When you run:

```bash
python src/sync.py
```

You should see output like:

✅ GeoJSON file generated: /data/greenclub_map.geojson
✅ Mapbox dataset updated successfully.


This process:

Airtable → fetch_records.py → geojson_builder.py → sync.py → Mapbox Dataset

## 🧠 7. Verify Your Map

Once your dataset syncs:

1. Open **Mapbox Studio → Datasets → GreenClub Stakeholders**  
2. You should see new data points representing your Airtable records.  
3. Click **“Preview”** to confirm the coordinates appear correctly around Ithaca, NY.

Then open your demo map locally to confirm visualization:
```bash
open web/index.html

🧭 8. Optional Styling Enhancements

| Feature                    | Description                                                                   |
| -------------------------- | ----------------------------------------------------------------------------- |
| **Category-based icons**   | Assign unique icons for restaurants, compost sites, nonprofits, etc.          |
| **Popups**                 | Show partner name, contact, and notes when a user clicks on a point.          |
| **Heatmaps or clustering** | Combine nearby points for clearer visualization of dense areas.               |
| **Thematic color scheme**  | Use a Cornell or sustainability-inspired palette (e.g., green, amber, white). |
| **Layer toggles**          | Add filters for stakeholder types or engagement levels.                       |






