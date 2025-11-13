// File: api/get_data.js
export default async function handler(req, res) {
  const AIRTABLE_KEY = process.env.AIRTABLE_API_KEY;
  const BASE_ID = process.env.AIRTABLE_BASE_ID;
  const TABLE_NAME = "Stakeholders"; // change to your table name

  const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;
  const headers = {
    Authorization: `Bearer ${AIRTABLE_KEY}`,
  };

  try {
    const response = await fetch(url, { headers });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching Airtable:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}

