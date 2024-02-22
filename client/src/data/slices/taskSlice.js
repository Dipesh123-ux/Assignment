// tasksSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://wild-red-clownfish-cap.cyclic.app";

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    theme: "light",
  },
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateTaskSuccess: (state, action) => {
      const { id, updatedTask } = action.payload;
      const index = state.tasks.findIndex((task) => task._id === id);
      if (index !== -1) {
        state.tasks[index] = updatedTask;
      }
    },
    deleteTaskSuccess: (state, action) => {
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

export const {
  setTasks,
  addTask,
  updateTaskSuccess,
  deleteTaskSuccess,
  toggleTheme,
} = tasksSlice.actions;

export const selectTasks = (state) => state.tasks.tasks;
export const selectTheme = (state) => state.tasks.theme;

// Async action to initialize tasks from a JSON file
export const initializeTasks = () => async (dispatch) => {
  try {
    const response = await axios.get(`${url}/api/tasks`);
    dispatch(setTasks(response.data));
  } catch (error) {
    console.error("Error initializing tasks:", error);
  }
};

// Async action to create a new task
export const createTask = (newTask) => async (dispatch) => {
  try {
    const response = await axios.post(`${url}/api/tasks`, newTask);
    console.log(response)
    dispatch(addTask(response.data));
  } catch (error) {
    console.error("Error creating task:", error);
  }
};

// Async action to update a task
export const updateTask = (id, updatedTask) => async (dispatch) => {
  try {
    const response = await axios.put(`${url}/api/tasks/${id}`, updatedTask);
    dispatch(updateTaskSuccess({ id, updatedTask: response.data }));
  } catch (error) {
    console.error("Error updating task:", error);
  }
};

// Async action to delete a task
export const deleteTask = (id) => async (dispatch) => {
  console.log(id,"delete")
  try {
    await axios.delete(`${url}/api/tasks/${id}`);
    dispatch(deleteTaskSuccess(id));
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};

// Async action to search for tasks based on the name
export const searchTasks = (searchQuery) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${url}/api/tasks/search?name=${searchQuery}`
    );
    dispatch(setTasks(response.data));
  } catch (error) {
    console.error("Error searching tasks:", error);
  }
};

export default tasksSlice.reducer;
