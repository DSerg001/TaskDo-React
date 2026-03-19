import { useRef, useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import {
  IoCloseOutline,
  IoCheckmarkOutline,
  IoArrowUndoOutline,
} from "react-icons/io5"; // Added Restore Icon
import { TbDotsVertical } from "react-icons/tb";
import { ImUndo, ImRedo } from "react-icons/im";
import { motion, AnimatePresence } from "framer-motion";
import AddTaskInput from "../AddTaskInput/AddTaskInput";
import TypingInput from "../TypingInput/TypingInput";
import { useTaskStore } from "../../store/store";
import { Link } from "react-router-dom";
import "./TaskDo.css";

const TaskDo = ({ current }) => {
  const tasks = useTaskStore((state) => state.tasks);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const completeTask = useTaskStore((state) => state.completeTask);
  const editTask = useTaskStore((state) => state.editTask);
  const restoreTask = useTaskStore((state) => state.restoreTask); // Ensure this exists in your store
  const searchQuery = useTaskStore((state) => state.searchQuery) || "";

  const listRef = useRef(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [text, setText] = useState("");
  const [history, setHistory] = useState([]);
  const [step, setStep] = useState(0);

  // Auto scroll
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [tasks, current]);

  // ESC close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const filteredTasks = tasks.filter(
    (t) =>
      t.status === current &&
      (t.text || "").toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const openModal = (task) => {
    setSelectedTask(task);
    setText(task.text);
    setHistory([task.text]);
    setStep(0);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setText("");
    setHistory([]);
    setStep(0);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const newHistory = history.slice(0, step + 1);
    newHistory.push(value);
    setHistory(newHistory);
    setStep(newHistory.length - 1);
    setText(value);
  };

  const handleUndo = () => {
    if (step === 0) return;
    const newStep = step - 1;
    setStep(newStep);
    setText(history[newStep]);
  };

  const handleRedo = () => {
    if (step >= history.length - 1) return;
    const newStep = step + 1;
    setStep(newStep);
    setText(history[newStep]);
  };

  const handleSave = () => {
    if (!text.trim()) return;
    editTask(selectedTask.id, text);
    closeModal();
  };

  return (
    <section className="taskdo">
      <header className="taskdo-header">
        <Link to="/in-progress" className="website-logo">
          TaskDo
        </Link>
      </header>

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

      <div className="search-area">
        <TypingInput />
        <FaMagnifyingGlass className="search-icon" />
      </div>

      {current === "in-progress" && (
        <AddTaskInput hasTasks={filteredTasks.length > 0} />
      )}

      <ul className="task-list" ref={listRef}>
        {filteredTasks.map((t) => (
          <li key={t.id} className="task-item">
            <div
              onClick={() => openModal(t)}
              className="edit-button"
              title="Open Edit Modal"
            >
              <TbDotsVertical />
            </div>
            <span>{t.text}</span>

            <div className="task-actions">
              {/* Show Restore button if task is Deleted or Done */}
              {(current === "deleted" || current === "done") && (
                <IoArrowUndoOutline
                  className="task-restore-icon"
                  onClick={() => restoreTask(t.id)}
                />
              )}

              {/* Show Complete/Delete buttons only in Progress */}
              {current === "in-progress" && (
                <>
                  <IoCloseOutline
                    className="task-cancel-icon"
                    onClick={() => deleteTask(t.id)}
                    title="Delete Task"
                  />
                  <IoCheckmarkOutline
                    className="task-done-icon"
                    onClick={() => completeTask(t.id)}
                    title="Done Task"
                  />
                </>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* Modal remains the same */}
      <AnimatePresence>
        {selectedTask && (
          <motion.div
            className="edit-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="edit-modal"
              initial={{ scale: 0.8, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 40, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>
                   Edit Task
                </h3>
                <IoMdClose className="close-icon" onClick={closeModal} />
              </div>
              <textarea
                value={text}
                onChange={handleChange}
                placeholder="Update task..."
              />
              <div className="edit-buttons">
                <button
                  onClick={handleSave}
                  disabled={!text.trim()}
                  className="saveEdit"
                >
                  Save
                </button>
                <button onClick={closeModal} className="cancelEdit">
                  Cancel
                </button>
                <button
                  onClick={handleUndo}
                  disabled={step === 0}
                  className="undoEdit"
                >
                  <ImUndo /> Undo
                </button>
                <button
                  onClick={handleRedo}
                  disabled={step >= history.length - 1}
                  className="redoEdit"
                >
                  <ImRedo /> Redo
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TaskDo;
