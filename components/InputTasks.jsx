"use client";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";
import { List } from "@/components/Icons";

const InputTasks = () => {
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await axios.post(
        "http://localhost:5500/tasks",
        JSON.stringify(body),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      response.status === 200
        ? toast.success("Success", {
            position: toast.POSITION.TOP_RIGHT,
          })
        : toast.error("Failed", {
            position: toast.POSITION.TOP_RIGHT,
          });
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex justify-center">
      <div className="w-2/3 flex flex-col gap-8 p-8">
        <h1 className="text-4xl font-bold flex items-center gap-3">
          Task Manager
          <List size={36} />
        </h1>
        <form className="flex" onSubmit={handleSubmit}>
          <input
            className="border p-2 w-80 rounded-lg rounded-r-none"
            placeholder="Create a task"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            type="submit"
            className="border border-l-0 p-2 rounded-lg rounded-l-none hover:bg-red-600 hover:text-white"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default InputTasks;
