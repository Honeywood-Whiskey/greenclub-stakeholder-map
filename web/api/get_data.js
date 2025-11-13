// api/get_data.js
export default async function handler(req, res) {
  const AIRTABLE_KEY = process.env.AIRTABLE_API_KEY;
  const BASE_ID = process.env.AIRTABLE_BASE_ID;
  const TABLE_ID = process.env.AIRTABLE_TABLE_ID;

  const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`;
  const headers = { Authorization: `Bearer ${AIRTABLE_KEY}` };

  try {
    const r = await fetch(url, { headers });
    const data = await r.json();
    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching Airtable:", err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
