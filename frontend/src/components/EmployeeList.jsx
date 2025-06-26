import React, { useState } from "react";
import Swal from "sweetalert2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getEmployees, deleteEmployee } from "../api/employeeApi";
import EmployeeForm from "./EmployeeForm";

const EmployeeList = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);

  const queryClient = useQueryClient();

  // Fetch Employees
  const { data, isLoading, isError } = useQuery({
    queryKey: ["employees", page, limit],
    queryFn: () => getEmployees(page, limit),
    keepPreviousData: true,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries(["employees"]);
    },
  });

  //DELETE Employee
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id, {
          onSuccess: () => {
            Swal.fire("Deleted!", "Employee has been deleted.", "success");
          },
          onError: () => {
            Swal.fire("Error", "Could not delete the employee.", "error");
          },
        });
      }
    });
  };

  //UPDATE Employee
  const handleEdit = (employee) => {
    setEditData(employee);
    setShowForm(true);
  };

  //ADD Employee
  const handleAdd = () => {
    setEditData(null);
    setShowForm(true);
  };

  if (isLoading) return <p className="text-center">Loading employees...</p>;
  if (isError)
    return <p className="text-center text-red-500">Error loading employees</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 items-end"
        >
          + Add Employee
        </button>
      </div>

      <div className="mb-4 flex justify-end items-center gap-2">
        <label htmlFor="limit">Rows per page:</label>
        <select
          id="limit"
          value={limit}
          onChange={(e) => {
            setLimit(parseInt(e.target.value));
            setPage(1);
          }}
          className="border p-1 rounded"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>

      <table className="min-w-full border rounded overflow-hidden">
        <thead className="bg-gray-200 text-left">
          <tr>
            <th className="p-2 text-center">#</th>
            <th className="p-2 text-center">Name</th>
            <th className="p-2 text-center">Email</th>
            <th className="p-2 text-center">Phone</th>
            <th className="p-2 text-center">DOB</th>
            <th className="p-2 text-center">Salary</th>
            <th className="p-2 text-center">Department</th>
            <th className="p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.employees?.map((emp, idx) => (
            <tr key={emp.id} className="border-b hover:bg-gray-50">
              <td className="p-2 text-center">
                {(page - 1) * limit + idx + 1}
              </td>
              <td className="p-2 text-center">{emp.name}</td>
              <td className="p-2 text-center">{emp.email}</td>
              <td className="p-2 text-center">{emp.phone}</td>
              <td className="p-2 text-center">{emp.dob?.split("T")[0]}</td>
              <td className="p-2 text-center">₹{emp.salary}</td>
              <td className="p-2 text-center">{emp.department_name}</td>
              <td className="p-2 text-center space-x-2">
                <button
                  onClick={() => handleEdit(emp)}
                  className="inline-block px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(emp.id)}
                  className="inline-block px-3 py-1 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
        >
          Prev
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage((old) => old + 1)}
          disabled={data?.employees?.length < limit}
          className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
        >
          Next
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-xl max-w-lg w-full">
            <EmployeeForm
              initialData={editData}
              onClose={() => {
                setShowForm(false);
                setEditData(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
