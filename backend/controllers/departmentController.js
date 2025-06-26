const db = require("../config/db");

exports.getDepartments = (req, res) => {
  const sql = `SELECT id, name FROM department WHERE status = 'active'`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
