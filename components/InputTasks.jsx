"use client";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";
import { List, ChevronDown } from "@/components/Icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const InputTasks = () => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const options = { year: "numeric", month: "short", day: "numeric" };
      const prettyDate = date.toLocaleDateString("en-US", options);
      const body = { description, prettyDate };
      const response = await axios.post(
        "https://task-manager-backend-production-90d7.up.railway.app/tasks",
        JSON.stringify(body),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        toast.success("Success", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error("Failed", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex justify-center">
      <div className="lg:w-2/3 max-md:w-3/4 max-sm:w-full flex flex-col max-sm:p-8">
        <h1 className="text-4xl font-bold flex items-center gap-3 my-4">
          Task Manager
          <List size={36} />
        </h1>

        <h2 className="text-xl font-medium">Create Task</h2>
        <form
          className="flex items-center sm:px-4 mt-2"
          onSubmit={handleSubmit}
        >
          <div className="w-full ">
            <label className="text-gray-800 pl-2 max-sm:text-sm">
              Task Description
            </label>
            <input
              className="border p-2 w-full rounded-lg rounded-r-none"
              placeholder="Task Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-gray-800 pl-2 max-sm:text-sm">
              Finish By
            </label>
            <div className="flex items-center  border-y border-r">
              <DatePicker
                selected={date}
                id="date-time"
                onChange={(date) => setDate(date)}
                className="w-[105px] p-2 outline-none "
              />
              <label htmlFor="date-time">
                <ChevronDown />
              </label>
            </div>
          </div>
          <button
            type="submit"
            onSubmit={handleSubmit}
            className="border border-l-0 p-2 px-3 rounded-lg rounded-l-none unselectable self-end"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default InputTasks;
