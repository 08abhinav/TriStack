import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL
const API = axios.create({
  baseURL: BASE_URL,
});

export const getTodos = () => API.get("/tasks");
export const createTodo = (data) => API.post("/tasks", data);
export const updateTodo = (id, data) => API.put(`/tasks/${id}`, data);
export const deleteTodo = (id) => API.delete(`/tasks/${id}`);
