import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import InputTasks from "@/components/InputTasks";
import ListTasks from "@/components/ListTasks";

export default function Home() {
  return (
    <div className="h-[100vh]">
      <ToastContainer />
      <InputTasks />
      <ListTasks />
    </div>
  );
}
