import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:1337",
});

export default {
  //Get a list of tasks
  getTodo: (params) => API.get("/tasks", { params }),
  //Create a task
  createTodo: (item) => API.post("/tasks", item),
  //Delete a task
  deleteTodo: (id) => API.delete(`/tasks/${id}`),
  //Update a task
  updateTodo: (id, params) => API.patch(`/tasks/${id}`, params),
};
