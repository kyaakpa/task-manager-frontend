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
        "http://localhost:5500/tasks",
        JSON.stringify(body),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(body);
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
      <div className="w-2/3 flex flex-col p-8">
        <h1 className="text-4xl font-bold flex items-center gap-3">
          Task Manager
          <List size={36} />
        </h1>
        <div className="flex mt-4 [&>*]:text-neutral-600 [&>*]:text-sm">
          <label className="w-80 ml-2">Task Description</label>
          <label>Finish By</label>
        </div>
        <form className="flex items-center mt-[2px]" onSubmit={handleSubmit}>
          <input
            className="border p-2 w-80 rounded-lg rounded-r-none"
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
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
          <button
            type="submit"
            onSubmit={handleSubmit}
            className="border border-l-0 p-2 px-3 rounded-lg rounded-l-none unselectable"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default InputTasks;
