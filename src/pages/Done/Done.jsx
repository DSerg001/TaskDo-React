import { Link } from "react-router-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdCheckmarkCircle } from "react-icons/io";
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
          <button className="deleted">Deleted</button>
        </Link>
        <Link to="/in-progress">
          <button className="progress">In Progress</button>
        </Link>
        <Link to="/done">
          <button className="done">Done</button>
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
                <IoMdCheckmarkCircle
                  className="task-icon done-icon"
                  onClick={() => removeFromDone(t.id)}
                  title="Move back to In Progress"
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
