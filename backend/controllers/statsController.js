const db = require("../config/db");

const calculateAge = (dob) => {
  const diff = Date.now() - new Date(dob).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
};

exports.getStatistics = (req, res) => {
  // Highest salary per department
  const highestSalaryQuery = `
    SELECT d.name AS department, MAX(e.salary) AS highest_salary
    FROM employee e
    JOIN department d ON e.department_id = d.id
    GROUP BY d.name
  `;

  // Salary range count (single query using CASE)
  const salaryRangeQuery = `
    SELECT 
      SUM(CASE WHEN salary <= 50000 THEN 1 ELSE 0 END) AS '0-50000',
      SUM(CASE WHEN salary > 50000 AND salary <= 100000 THEN 1 ELSE 0 END) AS '50001-100000',
      SUM(CASE WHEN salary > 100000 THEN 1 ELSE 0 END) AS '100000+'
    FROM employee
  `;

  // Youngest employee in each department
  const youngestQuery = `
    SELECT d.name AS department, e.name AS employee, e.dob
    FROM employee e
    JOIN department d ON e.department_id = d.id
    WHERE e.dob IN (
      SELECT MAX(dob) FROM employee
      WHERE department_id = e.department_id
    )
    ORDER BY d.name
  `;

  db.query(highestSalaryQuery, (err1, salaryResults) => {
    if (err1)
      return res.status(500).json({ error: "Error fetching highest salary" });

    db.query(salaryRangeQuery, (err2, rangeResults) => {
      if (err2)
        return res.status(500).json({ error: "Error fetching salary ranges" });

      db.query(youngestQuery, (err3, youngestResults) => {
        if (err3)
          return res
            .status(500)
            .json({ error: "Error fetching youngest employees" });

        const youngestWithAge = youngestResults.map((row) => ({
          department: row.department,
          employee: row.employee,
          age: calculateAge(row.dob),
        }));

        res.json({
          highestSalaryByDepartment: salaryResults,
          salaryRanges: rangeResults[0],
          youngestEmployees: youngestWithAge,
        });
      });
    });
  });
};
