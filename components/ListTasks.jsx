"use client";
import { useEffect } from "react";
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
import { setTasks, deleteTask } from "@/app/features/tasks/tasksSlice";
import { useDispatch, useSelector } from "react-redux";
import formatDate from "./functions/formatDate";

const ListTasks = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.list);

  const getTasks = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_LOCAL_URL}/tasks`
      );
      dispatch(setTasks(response.data));
    } catch (err) {
      console.error(err.message);
    }
  };

  const delTask = async (id) => {
    try {
      const delTask = await axios.delete(
        `${process.env.NEXT_PUBLIC_LOCAL_URL}/tasks/${id}`
      );

      dispatch(deleteTask(id));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="lg:w-1/2 md:w-3/4 max-sm:w-full max-sm:px-4">
        <h2 className="text-3xl font-bold ml-4 mt-4 tracking-tighter">
          All Tasks
        </h2>

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
                  <TableCell className="font-medium tracking-tight p-3 max-sm:w-[150px] sm:w-[300px]">
                    <div className="truncate max-sm:w-[150px] sm:w-[300px]">
                      {task.description}
                    </div>
                  </TableCell>
                  <TableCell className="p-3 pl-4">
                    {formatDate(task.finishby)}
                  </TableCell>
                  <TableCell className="text-right p-3 flex justify-end items-center gap-3">
                    <EditTasks
                      task={task}
                      className="hover:bg-gray-600 border-blue-400  self-center"
                    />
                    <span
                      onClick={() => delTask(task.task_id)}
                      className=" bg-red-100 hover:bg-red-700 hover:text-white text-sm hover:drop-shadow-sm px-3 font-medium rounded-lg text-red-600 p-1 unselectable"
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
