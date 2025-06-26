export const validateEmployeeForm = (data) => {
  const errors = [];

  if (!data.name || data.name.length < 3) {
    errors.push("Name must be at least 3 characters");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push("Invalid email format");
  }

  const phoneRegex = /^[0-9]{10}$/;
  if (!data.phone || !phoneRegex.test(data.phone)) {
    errors.push("Phone must be a valid 10-digit number");
  }

  if (!data.salary || isNaN(data.salary) || Number(data.salary) <= 0) {
    errors.push("Salary must be a positive number");
  }

  if (!data.dob) {
    errors.push("Date of birth is required");
  }

  if (!data.department_id) {
    errors.push("Please select a department");
  }

  return errors;
};
