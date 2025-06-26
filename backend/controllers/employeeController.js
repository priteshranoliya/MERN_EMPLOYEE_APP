const db = require("../config/db");
const { validateEmployee } = require("../validations/employeeValidation");

// GET Employees
exports.getEmployees = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const offset = (page - 1) * limit;

  const query = `
    SELECT e.*, d.name as department_name
    FROM employee e
    JOIN department d ON e.department_id = d.id
    ORDER BY e.created DESC
    LIMIT ? OFFSET ?
  `;

  db.query(query, [limit, offset], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({
      employees: results,
      page,
      limit,
    });
  });
};

// CREATE Employee
exports.addEmployee = (req, res) => {
  const errors = validateEmployee(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  const {
    department_id,
    name,
    dob,
    phone,
    email,
    salary,
    status,
    photo = "",
  } = req.body;

  const query = `
    INSERT INTO employee (department_id, name, dob, phone, email, salary, status, photo)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [department_id, name, dob, phone, email, salary, status, photo],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Employee added", id: result.insertId });
    }
  );
};

// UPDATE Employee
exports.updateEmployee = (req, res) => {
  const { id } = req.params;
  const {
    department_id,
    name,
    dob,
    phone,
    email,
    salary,
    status,
    photo = "",
  } = req.body;

  const query = `
    UPDATE employee SET
      department_id = ?, name = ?, dob = ?, phone = ?, email = ?,
      salary = ?, status = ?, photo = ?
    WHERE id = ?
  `;

  db.query(
    query,
    [department_id, name, dob, phone, email, salary, status, photo, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Employee updated" });
    }
  );
};

// DELETE Employee
exports.deleteEmployee = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM employee WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Employee deleted" });
  });
};
