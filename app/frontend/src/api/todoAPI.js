import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL
const API = axios.create({
  baseURL: BASE_URL,
});

export const getTodos = () => API.get("/api/tasks");
export const createTodo = (data) => API.post("/api/tasks", data);
export const updateTodo = (id, data) => API.put(`/api/tasks/${id}`, data);
export const deleteTodo = (id) => API.delete(`/api/tasks/${id}`);
