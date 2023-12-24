// tasksSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    list: [],
  },
  reducers: {
    setTasks: (state, action) => {
      state.list = action.payload;
    },
    addTask: (state, action) => {
      state.list.push(action.payload);
    },
    deleteTask: (state, action) => {
      state.list = state.list.filter((task) => task.task_id !== action.payload);
    },
    updateTask: (state, action) => {
      const { task_id, updatedTask } = action.payload;
      state.list = state.list.map((task) =>
        task.task_id === task_id ? updatedTask : task
      );
    },
  },
});

export const { setTasks, addTask, deleteTask, updateTask } = tasksSlice.actions;

export default tasksSlice.reducer;
