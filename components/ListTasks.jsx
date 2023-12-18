"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import EditTasks from "./EditTasks";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ListTasks = () => {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const response = await axios.get(
        "https://task-manager-backend-production-90d7.up.railway.app/tasks"
      );
      setTasks(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      const deleteTask = await axios.delete(
        `https://task-manager-backend-production-90d7.up.railway.app/tasks/${id}`
      );

      setTasks(tasks.filter((task) => task.task_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="lg:w-2/3 max-md:w-3/4 max-sm:w-full max-sm:w-full">
        <h2 className="text-3xl font-bold pl-8">All Tasks</h2>

        <div className="h-[60vh] overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tasks</TableHead>
                <TableHead>Finish By</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.task_id}>
                  <TableCell className="font-medium max-sm:w-[150px] sm:w-[400px]">
                    <div className="truncate max-sm:w-[150px] sm:w-[400px]">{task.description}</div>
                  </TableCell>
                  <TableCell>{task.finishby}</TableCell>
                  <TableCell className="text-right flex justify-end items-center gap-3">
                    <span className="hover:bg-neutral-200 p-[5px] rounded self-center">
                      <EditTasks task={task} />
                    </span>
                    <span
                      onClick={() => deleteTask(task.task_id)}
                      className="border bg-neutral-100 hover:bg-red-700 hover:text-white text-sm hover:drop-shadow-sm px-3 font-medium rounded-lg text-red-600 p-[6px] unselectable"
                    >
                      Delete
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ListTasks;
