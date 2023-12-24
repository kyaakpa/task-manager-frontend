"use client";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";
import { List } from "@/components/Icons";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { setDescription } from "@/app/features/description/descriptionSlice";
import { setDate } from "@/app/features/date/dateSlice";
import { addTask } from "@/app/features/tasks/tasksSlice";
import formatDate from "./functions/FomartDate";

const InputTasks = () => {
  // const [description, setDescription] = useState("");
  // const [date, setDate] = useState(new Date());
  const description = useSelector((state) => state.description.value);
  const date = useSelector((state) => state.date.value);
  const tasks = useSelector((state) => state.tasks.list);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { description, date };
      console.log(body);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_LOCAL_URL}/tasks`,
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
        dispatch(addTask(body));
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
      <div className="lg:w-1/2 md:w-3/4 max-sm:w-full flex flex-col max-md:p-8">
        <h1 className="text-4xl font-bold flex items-center gap-3 my-4 tracking-tighter">
          Task Manager
          <List size={36} />
        </h1>

        <h2 className="text-xl font-semibold pl-4 tracking-tight">
          Create Task
        </h2>
        <form
          className="flex items-center justify-between gap-3 sm:px-4 mt-2"
          onSubmit={handleSubmit}
        >
          <div className="w-full ">
            <label className="text-gray-800 pl-2 text-sm">
              Task Description
            </label>
            <input
              className="border p-2 w-full rounded-lg"
              placeholder="Task Description"
              value={description}
              onChange={(e) => dispatch(setDescription(e.target.value))}
              required
            />
          </div>
          <div className="flex gap-3">
            <div>
              <label className="text-gray-800 pl-2 text-sm">Finish By</label>
              <input
                type="date"
                id="date-time"
                onChange={(date) => dispatch(setDate(date.target.value))}
                className=" p-2 border rounded-lg"
              />
            </div>
            <button
              type="submit"
              onSubmit={handleSubmit}
              className="p-[10px] tracking-wide font-medium px-4 rounded-lg  unselectable self-end bg-green-200 text-green-700"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputTasks;
