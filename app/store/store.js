import { combineReducers, configureStore } from "@reduxjs/toolkit";
import descriptionReducer from "@/app/features/description/descriptionSlice";
import dateReducer from "@/app/features/date/dateSlice";
import tasksReducer from "@/app/features/tasks/tasksSlice";

const rootReducer = combineReducers({
  description: descriptionReducer,
  date: dateReducer,
  tasks: tasksReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
