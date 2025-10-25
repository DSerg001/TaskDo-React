import { useState, useRef, useEffect } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaPlusCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { IoMdCheckmarkCircle } from "react-icons/io";
import TypingInput from "../TypingInput/TypingInput";
import { useTaskStore } from "../../store/store";
import { Link } from "react-router-dom";
import "./TaskDo.css";

const TaskDo = ({ current }) => {
  const [task, setTask] = useState("");
  const tasks = useTaskStore((state) => state.tasks);
  const addTask = useTaskStore((state) => state.addTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const completeTask = useTaskStore((state) => state.completeTask);
  const searchQuery = useTaskStore((state) => state.searchQuery) || "";

  const listRef = useRef(null);

  // Scroll to bottom on tasks change
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [tasks, current]);

  const handleAddTask = () => {
    if (task.trim() !== "") {
      addTask(task);
      setTask("");
    }
  };

  const filteredTasks = tasks.filter(
    (t) =>
      t.status === current &&
      (t.text || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="taskdo">
      <header className="taskdo-header">
        <h1>TaskDo</h1>
      </header>

      <div className="search-area">
        <TypingInput />
        <FaMagnifyingGlass className="search-icon" />
      </div>

      <div className="status-buttons">
        <Link to="/deleted">
          <button className="deleted">Deleted</button>
        </Link>
        <Link to="/in-progress">
          <button className="progress">In Progress</button>
        </Link>
        <Link to="/done">
          <button className="done">Done</button>
        </Link>
      </div>

      {current === "in-progress" && (
        <div className="task-container">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Write your task here..."
            onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
          />
          <FaPlusCircle className="add-icon" onClick={handleAddTask} />
        </div>
      )}

      <ul className="task-list" ref={listRef}>
        {filteredTasks.length === 0 ? (
          <p className="empty">No tasks found</p>
        ) : (
          filteredTasks.map((t) => (
            <li key={t.id} className="task-item">
              <span className="task-text">{t.text || "(No text)"}</span>
              {current === "in-progress" && (
                <div className="task-actions">
                  <MdCancel
                    className="task-icon cancel-icon"
                    onClick={() => deleteTask(t.id)}
                    title="Delete"
                  />
                  <IoMdCheckmarkCircle
                    className="task-icon done-icon"
                    onClick={() => completeTask(t.id)}
                    title="Done"
                  />
                </div>
              )}
            </li>
          ))
        )}
      </ul>
    </section>
  );
};

export default TaskDo;
