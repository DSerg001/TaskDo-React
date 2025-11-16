import { useState, useRef, useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { useTaskStore } from "../../store/store";
import "./AddTaskInput.css";

const AddTaskInput = ({ hasTasks }) => {
  const [task, setTask] = useState("");
  const addTask = useTaskStore((state) => state.addTask);
  const listRef = useRef(null);

  const handleAddTask = () => {
    if (task.trim() !== "") {
      addTask(task);
      setTask("");
    }
  };

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [task]);

  return (
    <div className={`task-container ${hasTasks ? "fixed-bottom" : "centered"}`}>
      <input
        type="text"
        value={task}
        maxLength={300}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Write your task here..."
        onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
      />
      <FaPlusCircle className="add-icon" onClick={handleAddTask} />
    </div>
  );
};

export default AddTaskInput;
