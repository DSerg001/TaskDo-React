import { Link } from "react-router-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoCheckmarkOutline } from "react-icons/io5";
import TypingInput from "../../components/TypingInput/TypingInput";
import { useTaskStore } from "../../store/store";
import "./Done.css";

const Done = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const removeFromDone = useTaskStore((state) => state.removeFromDone);
  const searchQuery = useTaskStore((state) => state.searchQuery) || "";

  const doneTasks = tasks.filter(
    (t) =>
      t.status === "done" &&
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
          <button className="header-deleted">Deleted</button>
        </Link>
        <Link to="/in-progress">
          <button className="header-progress">In Progress</button>
        </Link>
        <Link to="/done">
          <button className="header-done">Done</button>
        </Link>
      </div>

      <ul className="task-list">
        {doneTasks.length === 0 ? (
          <p className="empty">No completed tasks</p>
        ) : (
          doneTasks.map((t) => (
            <li key={t.id} className="task-item">
              <span className="task-text">{t.text || "(No text)"}</span>
              <div className="task-actions">
                <IoCheckmarkOutline
                  className="task-done-icon"
                  onClick={() => removeFromDone(t.id)}
                  title="Confirm task completion"
                />
              </div>
            </li>
          ))
        )}
      </ul>
    </section>
  );
};

export default Done;
