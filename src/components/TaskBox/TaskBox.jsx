import { useState } from "react";
import { MdCancel, MdEdit } from "react-icons/md";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { TbDotsVertical } from "react-icons/tb";
import { ImUndo, ImRedo } from "react-icons/im";
import "./TaskBox.css";

const TaskBox = ({
  current,
  filteredTasks,
  deleteTask,
  completeTask,
  listRef,
  editTask,
}) => {
  const [editId, setEditId] = useState(null); // modal բացված task-ի id
  const [editText, setEditText] = useState("");
  const [history, setHistory] = useState([]); // undo history
  const [redoStack, setRedoStack] = useState([]); // redo history

  // Modal բացել
  const openEditModal = (t) => {
    setEditId(t.id);
    setEditText(t.text);
    setHistory([t.text]); // սկսնակ history
    setRedoStack([]);
  };

  // Save փոփոխություն
  const saveEdit = () => {
    editTask(editId, editText);
    setEditId(null);
    setEditText("");
    setHistory([]);
    setRedoStack([]);
  };

  // Cancel modal
  const cancelEdit = () => {
    setEditId(null);
    setEditText("");
    setHistory([]);
    setRedoStack([]);
  };

  // Undo
  const handleUndo = () => {
    if (history.length <= 1) return;
    const newHistory = [...history];
    const last = newHistory.pop();
    setRedoStack([last, ...redoStack]);
    setEditText(newHistory[newHistory.length - 1]);
    setHistory(newHistory);
  };

  // Redo
  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const [next, ...rest] = redoStack;
    setEditText(next);
    setHistory([...history, next]);
    setRedoStack(rest);
  };

  // Input change: պահպանել history
  const handleEditChange = (e) => {
    setEditText(e.target.value);
    setHistory([...history, e.target.value]);
  };

  return (
    <>
      <ul
        className={`task-list ${
          filteredTasks.length < 0 ? "centered-list" : ""
        }`}
        ref={listRef}
      >
        {filteredTasks.length === 0 ? (
          <p className="empty">No tasks found</p>
        ) : (
          filteredTasks.map((t) => (
            <li key={t.id} className="task-item">
              <div onClick={(e) => openEditModal(t, e)} className="edit-button">
                <TbDotsVertical />
              </div>

              <span className="task-text">{t.text}</span>

              {current === "in-progress" && (
                <div className="task-actions">
                  <MdCancel
                    className="task-icon cancel-icon"
                    onClick={() => deleteTask(t.id)}
                  />
                  <IoMdCheckmarkCircle
                    className="task-icon done-icon"
                    onClick={() => completeTask(t.id)}
                  />
                </div>
              )}

              {editId === t.id && (
                <div className="edit-modal-overlay">
                  <div className="edit-modal">
                    <div className="modal-header">
                      <h3>
                        <MdEdit style={{ marginRight: "8px" }} />
                        Edit Task
                      </h3>
                      <MdCancel className="close-icon" onClick={cancelEdit} />
                    </div>

                    <input
                      type="text"
                      value={editText}
                      onChange={handleEditChange}
                      placeholder="Type new task..."
                    />

                    <div className="edit-buttons">
                      <button onClick={saveEdit} className="saveEdit">
                        Save
                      </button>
                      <button onClick={cancelEdit} className="cancelEdit">
                        Cancel
                      </button>
                      <button
                        onClick={handleUndo}
                        disabled={history.length <= 1}
                        className="undoEdit"
                      >
                        <ImUndo style={{ marginRight: "8px" }} /> Undo
                      </button>
                      <button
                        onClick={handleRedo}
                        disabled={redoStack.length === 0}
                        className="redoEdit"
                      >
                        <ImRedo style={{ marginRight: "8px" }} /> Redo
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </li>
          ))
        )}
      </ul>
    </>
  );
};

export default TaskBox;
