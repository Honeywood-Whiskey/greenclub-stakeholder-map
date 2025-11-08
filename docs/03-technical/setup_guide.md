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
