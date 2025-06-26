import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getStats } from "../api/employeeApi";

const Stats = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["statistics"],
    queryFn: getStats,
  });

  if (isLoading) return <p className="text-center">Loading stats...</p>;
  if (isError)
    return <p className="text-center text-red-500">Error loading stats</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <h2 className="text-2xl font-bold mb-2">Employee Statistics</h2>

      {/* Salary Range wise Employee Count */}
      <div>
        <h3 className="text-lg font-semibold mb-2">
          1. Salary Range wise Employee Count
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(data.salaryRanges).map(([range, count]) => (
            <div
              key={range}
              className="bg-blue-100 text-blue-800 p-4 rounded shadow text-center"
            >
              <div className="text-lg font-medium">{range}</div>
              <div className="text-2xl font-bold">{count}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Department wise Highest Salary of Employees */}
      <div>
        <h3 className="text-lg font-semibold mb-2">
          2. Department wise Highest Salary of Employees
        </h3>
        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 text-center">Department_Name</th>
              <th className="p-2 text-center">Highest Salary</th>
            </tr>
          </thead>
          <tbody>
            {data.highestSalaryByDepartment.map((item, idx) => (
              <tr key={idx} className="border-t hover:bg-gray-50">
                <td className="p-2 text-center">{item.department}</td>
                <td className="p-2 text-center">₹{item.highest_salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Name and Age of the Youngest Employee of Each Department */}
      <div>
        <h3 className="text-lg font-semibold mb-2">
          3. Name and Age of the Youngest Employee of Each Department
        </h3>
        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 text-center">Department_Name</th>
              <th className="p-2 text-center">Employee_Name</th>
              <th className="p-2 text-center">Age</th>
            </tr>
          </thead>
          <tbody>
            {data.youngestEmployees.map((item, idx) => (
              <tr key={idx} className="border-t hover:bg-gray-50">
                <td className="p-2 text-center">{item.department}</td>
                <td className="p-2 text-center">{item.employee}</td>
                <td className="p-2 text-center">{item.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Stats;
