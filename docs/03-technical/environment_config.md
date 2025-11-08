# 🔒 Environment Configuration Guide

This guide explains how to securely manage **API keys** and **environment variables** for the GreenClub Stakeholder Map.  
Proper configuration keeps sensitive tokens (like Airtable and Mapbox keys) safe while allowing your scripts to access them automatically.

> 🧭 **Audience:** Any GreenClub member running local scripts or connecting external APIs.

---

## 🧩 1. Purpose of the `.env` File

The `.env` file is where you store all your **private credentials** and configuration variables.  
It lives in the root directory of your project — the same level as your `README.md`.

```
📂 greenclub-stakeholder-map
│
├── .env
├── README.md
├── src/
└── docs/
```

---

## 🪴 2. Create the `.env` File

Inside your project’s root folder, create a new file named `.env` (no filename extension).  
Paste the following template and fill in your credentials:
MAPBOX_TOKEN=pk.xxxxxx
MAPBOX_USERNAME=honeywood-whiskey
AIRTABLE_TOKEN=pat.xxxxxx
AIRTABLE_BASE_ID=appXXXXXXX
AIRTABLE_TABLE=Stakeholders


> ⚠️ **Do not** share or commit this file — these keys grant full access to your map and database.

---

## ⚙️ 3. How the `.env` File Works

When you run your Python scripts (like `sync.py`), the `python-dotenv` package automatically loads your `.env` variables into memory.

Example inside a Python script:

```python
from dotenv import load_dotenv
import os

load_dotenv()

mapbox_token = os.getenv("MAPBOX_TOKEN")
print("Using Mapbox token:", mapbox_token[:10], "...")



