"use client";

import axios from "axios";
import { useState } from "react";

const InputTasks = () => {
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await axios.post(
        "http://localhost:5500",
        JSON.stringify(body),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {}
  };
  return (
    <div className="flex justify-center">
      <div className="w-2/3 flex flex-col gap-8 p-8">
        <h1 className="text-4xl font-bold">Task Manager</h1>
        <form className="flex" onSubmit={handleSubmit}>
          <input
            className="border p-2 w-80 rounded-lg rounded-r-none"
            placeholder="Search for tasks"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className="border border-l-0 p-2 rounded-lg rounded-l-none">
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default InputTasks;
