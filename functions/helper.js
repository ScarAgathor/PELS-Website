export default async function handler(req, res) {
  if (req.method === 'POST') {
    const newOfficer = req.body;

    // 1. Read current officers.json
    const officers = JSON.parse(fs.readFileSync('../data/officers.json', 'utf8'));

    // 2. Add new officer
    officers.push(newOfficer);

    // 3. Write back to file
    fs.writeFileSync('../data/officers.json', JSON.stringify(officers, null, 2));

    res.status(200).json({ success: true });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}