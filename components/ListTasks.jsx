"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Edit } from "@/components/Icons";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ListTasks = () => {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5500/tasks");
      setTasks(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      const deleteTask = await axios.delete(
        `http://localhost:5500/tasks/${id}`
      );

      setTasks(tasks.filter((task) => task.task_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  console.log(tasks);

  return (
    <div className="flex justify-center">
      <div className="w-2/3 px-8">
        <h2 className="text-3xl font-bold">All Tasks</h2>

        <div className="h-[40vh] overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Tasks</TableHead>
                <TableHead>Date Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.task_id}>
                  <TableCell className="font-medium w-[400px] overflow-hidden whitespace-nowrap overflow-ellipsis">
                    {task.description}
                  </TableCell>
                  <TableCell>Jan 12, 2024</TableCell>
                  <TableCell className="text-right flex justify-end items-center gap-3">
                    <Edit />
                    <button
                      onClick={() => deleteTask(task.task_id)}
                      className="border bg-neutral-100 hover:bg-red-700 hover:text-white text-sm hover:drop-shadow-sm px-3 font-medium rounded-lg text-red-600 p-[6px]"
                    >
                      Delete
                    </button>
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
