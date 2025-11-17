import { useRef, useEffect } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import TaskBox from "../TaskBox/TaskBox";
import AddTaskInput from "../AddTaskInput/AddTaskInput";
import TypingInput from "../TypingInput/TypingInput";
import { useTaskStore } from "../../store/store";
import { Link } from "react-router-dom";
import "./TaskDo.css";

const TaskDo = ({ current }) => {
  const tasks = useTaskStore((state) => state.tasks);
  const addTask = useTaskStore((state) => state.addTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const completeTask = useTaskStore((state) => state.completeTask);
  const editTaskStore = useTaskStore((state) => state.editTask);
  const searchQuery = useTaskStore((state) => state.searchQuery) || "";

  const listRef = useRef(null);

  // Auto-scroll when tasks or status changes
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [tasks, current]);

  // Filter tasks by status + search
  const filteredTasks = tasks.filter(
    (t) =>
      t.status === current &&
      (t.text || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="taskdo">
      {/* Header */}
      <header className="taskdo-header">
        <h1>TaskDo</h1>
      </header>

      {/* Search */}
      <div className="search-area">
        <TypingInput />
        <FaMagnifyingGlass className="search-icon" />
      </div>

      {/* Navigation buttons */}
      <div className="status-buttons">
        <Link to="/deleted">
          <button className="header-deleted">Deleted</button>
        </Link>
        <Link to="/in-progress">
          <button className="header-progress">In Progress</button>
        </Link>
        <Link to="/done">
          <button className="header-done">Done</button>
        </Link>
      </div>

      {/* AddTaskInput ONLY for in-progress */}
      {current === "in-progress" && (
        <AddTaskInput hasTasks={filteredTasks.length > 0} />
      )}

      {/* Task Box */}
      <TaskBox
        current={current}
        filteredTasks={filteredTasks}
        deleteTask={deleteTask}
        completeTask={completeTask}
        listRef={listRef}
        editTask={editTaskStore}
      />
    </section>
  );
};

export default TaskDo;
