import { Link } from "react-router-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import { IoMdCheckmarkCircle, IoMdRefreshCircle } from "react-icons/io";
import TypingInput from "../../components/TypingInput/TypingInput";
import { useTaskStore } from "../../store/store";
import "./Deleted.css";

const Deleted = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const restoreTask = useTaskStore((state) => state.restoreTask);
  const moveToDone = useTaskStore((state) => state.moveToDone);
  const permanentDelete = useTaskStore((state) => state.permanentDelete);
  const searchQuery = useTaskStore((state) => state.searchQuery) || "";

  const deletedTasks = tasks.filter(
    (t) =>
      t.status === "deleted" &&
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
        {deletedTasks.length === 0 ? (
          <p className="empty">No deleted tasks</p>
        ) : (
          deletedTasks.map((t) => (
            <li key={t.id} className="task-item">
              <span className="task-text">{t.text || "(No text)"}</span>
              <div className="task-actions">
                <MdCancel
                  className="task-icon cancel-icon"
                  onClick={() => permanentDelete(t.id)}
                  title="Delete permanently"
                />
                <IoMdRefreshCircle
                  className="task-icon restore-icon"
                  onClick={() => restoreTask(t.id)}
                  title="Restore to In Progress"
                />
                <IoMdCheckmarkCircle
                  className="task-icon done-icon"
                  onClick={() => moveToDone(t.id)}
                  title="Move to Done"
                />
              </div>
            </li>
          ))
        )}
      </ul>
    </section>
  );
};

export default Deleted;
