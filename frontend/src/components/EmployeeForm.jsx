import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addEmployee,
  updateEmployee,
  getDepartments,
} from "../api/employeeApi";
import { validateEmployeeForm } from "../validations/employeeValidation";

const EmployeeForm = ({ onClose, initialData = null }) => {
  const isEdit = Boolean(initialData);
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    salary: "",
    department_id: "",
    status: 1,
  });

  useEffect(() => {
    if (isEdit && initialData) {
      setFormData({
        name: initialData.name || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        dob: initialData.dob?.split("T")[0] || "",
        salary: initialData.salary || "",
        department_id: initialData.department_id || "",
        status: initialData.status ?? 1,
      });
    }
  }, [initialData]);

  const { data: departments } = useQuery({
    queryKey: ["departments"],
    queryFn: getDepartments,
  });

  const mutation = useMutation({
    mutationFn: isEdit
      ? (data) => updateEmployee({ id: initialData.id, data })
      : addEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries(["employees"]);
      onClose();
    },
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateEmployeeForm(formData);

    if (errors.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        html: errors.map((e) => `<p>${e}</p>`).join(""),
      });
      return;
    }

    mutation.mutate(formData, {
      onSuccess: () => {
        Swal.fire({
          icon: "success",
          title: isEdit ? "Employee updated!" : "Employee added!",
          timer: 1500,
          showConfirmButton: false,
        });
        onClose();
      },
      onError: (err) => {
        const msg =
          err?.response?.data?.error ||
          err?.response?.data?.errors?.join("<br>") ||
          "Something went wrong";
        Swal.fire({
          icon: "error",
          title: "Server Error",
          html: msg,
        });
      },
    });
  };

  return (
    <div className="p-4 bg-white rounded shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">
        {isEdit ? "Edit Employee" : "Add New Employee"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="w-full p-2 border rounded"
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-2 border rounded"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-2 border rounded"
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          className="w-full p-2 border rounded"
          type="date"
          name="dob"
          placeholder="DOB"
          value={formData.dob}
          onChange={handleChange}
        />
        <input
          className="w-full p-2 border rounded"
          type="number"
          name="salary"
          placeholder="Salary"
          value={formData.salary}
          onChange={handleChange}
          required
        />

        <select
          className="w-full p-2 border rounded"
          name="department_id"
          value={formData.department_id}
          onChange={handleChange}
          required
        >
          <option value="">Select Department</option>
          {departments?.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {isEdit ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
