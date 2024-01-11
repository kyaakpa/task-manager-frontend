"use client";
import { toast } from "react-toastify";
import axios from "axios";
import { List } from "@/components/Icons";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { setDescription } from "@/app/features/description/descriptionSlice";
import { setDate } from "@/app/features/date/dateSlice";
import { addTask } from "@/app/features/tasks/tasksSlice";

const InputTasks = () => {
  const description = useSelector((state) => state.description.value);
  const date = useSelector((state) => state.date.value);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { description, date };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_LOCAL_URL}/tasks`,
        JSON.stringify(body),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { data, status } = response;

      if (status === 200) {
        const [{ task_id }] = data;
        const newTask = {
          task_id,
          description,
          finishby: date,
        };
        toast.success("Success", {
          position: toast.POSITION.TOP_RIGHT,
        });

        dispatch(addTask(newTask));
      } else {
        toast.error("Failed", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (err) {
      console.error(err.message);
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
                defaultValue={new Date().toISOString().split("T")[0]}
                id="date-time"
                onChange={(e) => dispatch(setDate(e.target.value))}
                className=" p-2 border rounded-lg"
              />
            </div>
            <button
              type="submit"
              onSubmit={handleSubmit}
              className="p-[10px] tracking-wide font-medium px-4 rounded-lg  unselectable self-end bg-green-200 text-green-700 hover:border-b-4 border-green-600"
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
