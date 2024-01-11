"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Edit } from "@/components/Icons";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const EditTasks = ({ task }) => {
  const [description, setDescription] = useState(task.description);
  const [date, setDate] = useState(new Date());

  const dispatch = useDispatch();

  const updateTask = async (e) => {
    e.preventDefault();
    try {
      const options = { year: "numeric", month: "short", day: "numeric" };
      const prettyDate = date.toLocaleDateString("en-US", options);
      const body = { description, prettyDate };
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_LOCAL_URL}/tasks/${task.task_id}`,
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
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Edit size={20} />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-left pl-2">Edit Task</DialogTitle>
          </DialogHeader>
          <input
            className="w-full border p-2 rounded-lg"
            placeholder={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex items-center place-self-end gap-3">
            <span>Finish By </span>
            <input
              type="date"
              defaultValue={new Date().toISOString().split("T")[0]}
              id="date-time"
              onChange={(e) => dispatch(setDate(e.target.value))}
              className=" p-2 border rounded-lg"
            />
          </div>
          <div className="flex justify-end gap-4">
            <DialogClose
              asChild
              type="button"
              className="hover:bg-red-700 p-2 rounded-lg px-3 text-red-600 hover:text-white bg-red-100"
            >
              <button onClick={() => setDescription(task.description)}>
                Cancel
              </button>
            </DialogClose>
            <DialogClose
              asChild
              type="submit"
              onClick={(e) => dispatch(updateTask(e))}
              className="hover:bg-green-200 p-2 rounded-lg px-3 hover:text-green-700 bg-green-100 text-green-700"
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
