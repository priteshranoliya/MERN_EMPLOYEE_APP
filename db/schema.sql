-- Create database
CREATE DATABASE IF NOT EXISTS employee_db;
USE employee_db;

DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS department;

-- Department 
CREATE TABLE department (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  status ENUM('active', 'inactive') DEFAULT 'active',
  created DATETIME DEFAULT CURRENT_TIMESTAMP,
  modified DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Employee 
CREATE TABLE employee (
  id INT AUTO_INCREMENT PRIMARY KEY,
  department_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  dob DATE NOT NULL,
  phone VARCHAR(15),
  photo VARCHAR(255),
  email VARCHAR(100) UNIQUE,
  salary DECIMAL(10,2),
  status ENUM('active', 'inactive') DEFAULT 'active',
  created DATETIME DEFAULT CURRENT_TIMESTAMP,
  modified DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (department_id) REFERENCES department(id)
);

-- Insert Into Departments
INSERT INTO department (name, status) VALUES
('Engineering', 'active'),
('HR', 'active'),
('Sales', 'active'),
('Finance', 'active'),
('Marketing', 'active'),
('Operations', 'active'),
('Legal', 'active'),
('Design', 'active'),
('Customer Support', 'active'),
('Product Management', 'active'),
('R&D', 'inactive'),
('Admin', 'inactive');

-- Insert Into Employees
INSERT INTO employee (department_id, name, dob, phone, photo, email, salary, status)
VALUES
(1, 'Amit Sharma', '1995-06-15', '9999999991', '', 'amit@company.com', 60000, 'active'),
(2, 'Neha Sinha', '1998-07-10', '9999999992', '', 'neha@company.com', 95000, 'active'),
(3, 'Ravi Patel', '1997-02-28', '9999999993', '', 'ravi@company.com', 45000, 'active'),
(12, 'Sneha Iyer', '2000-09-12', '9999999994', '', 'sneha@company.com', 50000, 'active'),
(4, 'Manish Gupta', '1992-01-01', '9999999995', '', 'manish@company.com', 110000, 'active'),
(5, 'Pooja Desai',     '1996-03-21', '9999999996', '', 'pooja@company.com', 72000, 'active'),
(6, 'Karan Malhotra',  '1994-11-11', '9999999997', '', 'karan@company.com', 85000, 'active'),
(6, 'Anjali Mehta',    '2001-04-05', '9999999998', '', 'anjali@company.com', 48000, 'active'),
(7, 'Rahul Verma',     '1990-08-19', '9999999999', '', 'rahul@company.com', 105000, 'active'),
(10, 'Deepika Joshi',   '1999-12-25', '9888888881', '', 'deepika@company.com', 98000, 'active'),
(10, 'Nikhil Saxena',   '1995-05-17', '9888888882', '', 'nikhil@company.com', 54000, 'active'),
(8, 'Simran Kaur',     '1997-07-09', '9888888883', '', 'simran@company.com', 61000, 'active'),
(8, 'Tushar Jain',     '2002-02-14', '9888888884', '', 'tushar@company.com', 47000, 'active'),
(5, 'Alok Mishra',     '1988-09-29', '9888888885', '', 'alok@company.com', 120000, 'active'),
(11, 'Divya Rana',      '2003-06-01', '9888888886', '', 'divya@company.com', 53000, 'active');