import Airtable from "airtable";

export default async function handler(req, res) {
  console.log("API KEY:", process.env.AIRTABLE_API_KEY ? "LOADED" : "MISSING");
  console.log("BASE ID:", process.env.AIRTABLE_BASE_ID);
  console.log("TABLE NAME:", process.env.AIRTABLE_TABLE_NAME);

  if (!process.env.AIRTABLE_TABLE_NAME) {
    return res.status(500).json({ error: "TABLE NAME NOT FOUND IN ENV" });
  }

  try {
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
      .base(process.env.AIRTABLE_BASE_ID);

    const tableName = process.env.AIRTABLE_TABLE_NAME;

    let allRecords = [];

    const query = base(tableName).select({
      view: "Grid view",
      pageSize: 100,
    });

    await query.eachPage(
      function page(records, fetchNextPage) {
        allRecords = allRecords.concat(records);
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          console.error("Airtable Fetch Error:", err);
          return res.status(500).json({ error: "Airtable fetch error" });
        }

        const clean = allRecords.map((rec) => ({
          id: rec.id,
          fields: rec.fields,
        }));

        return res.status(200).json({ records: clean });
      }
    );

  } catch (err) {
    console.error("Server Error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
