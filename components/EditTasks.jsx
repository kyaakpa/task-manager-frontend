"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import DatePicker from "react-datepicker";
import { Edit } from "@/components/Icons";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const EditTasks = ({ task }) => {
  const [description, setDescription] = useState(task.description);
  const [date, setDate] = useState(new Date());

  const updateTask = async (e) => {
    e.preventDefault();
    try {
      const options = { year: "numeric", month: "short", day: "numeric" };
      const prettyDate = date.toLocaleDateString("en-US", options);
      const body = { description, prettyDate };
      const response = await axios.put(
        `https://task-manager-backend-production-90d7.up.railway.app/tasks/${task.task_id}`,
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
      setTimeout(() => {
        window.location = "/";
      }, 2000);
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Edit />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          <input
            className="w-full border p-2 rounded-lg"
            placeholder={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <DatePicker
            selected={date}
            id="date-time"
            onChange={(date) => setDate(date)}
            className="p-2"
          />
          <div className="flex justify-end gap-4">
            <DialogClose
              asChild
              type="button"
              className="hover:bg-red-700 p-2 rounded-lg px-3 text-red-600 hover:text-white bg-neutral-100"
            >
              <button onClick={() => setDescription(task.description)}>
                Cancel
              </button>
            </DialogClose>
            <DialogClose
              asChild
              type="submit"
              onClick={(e) => updateTask(e)}
              className="hover:bg-green-200 p-2 rounded-lg px-3 hover:text-green-700 bg-neutral-100"
            >
              <button>Save Changes</button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditTasks;
