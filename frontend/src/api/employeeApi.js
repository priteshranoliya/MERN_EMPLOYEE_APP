import axios from "axios";

const baseURL = "http://localhost:5001/api";

export const getEmployees = async (page = 1, limit = 5) => {
  const res = await axios.get(
    `${baseURL}/employees?page=${page}&limit=${limit}`
  );
  return res.data;
};

export const deleteEmployee = async (id) => {
  return await axios.delete(`${baseURL}/employees/${id}`);
};

export const addEmployee = async (data) => {
  return await axios.post(`${baseURL}/employees`, data);
};

export const updateEmployee = async ({ id, data }) => {
  return await axios.put(`${baseURL}/employees/${id}`, data);
};

export const getDepartments = async () => {
  const res = await axios.get(`${baseURL}/departments`);
  return res.data;
};

export const getStats = async () => {
  const res = await axios.get(`${baseURL}/stats`);
  return res.data;
};
