import { useState } from "react";
import { MdEdit, MdCancel } from "react-icons/md";
import { IoCloseOutline, IoCheckmarkOutline } from "react-icons/io5";
import { TbDotsVertical } from "react-icons/tb";
import { ImUndo, ImRedo } from "react-icons/im";
import { useTaskStore } from "../../store/store";
import "./TaskBox.css";

const TaskBox = ({ current, filteredTasks, listRef }) => {
  const editTask = useTaskStore((state) => state.editTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const completeTask = useTaskStore((state) => state.completeTask);

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [redoStack, setRedoStack] = useState([]);

  // Modal բացել
  const openEditModal = (task) => {
    setEditId(task.id);
    setEditText(task.text);
    setRedoStack([]);
  };

  // Save փոփոխություն
  const saveEdit = () => {
    if (!editText.trim()) return;
    editTask(editId, editText);
    setEditId(null);
    setEditText("");
    setRedoStack([]);
  };

  // Cancel modal
  const cancelEdit = () => {
    setEditId(null);
    setEditText("");
    setRedoStack([]);
  };

  // Բառային Undo
  const handleUndo = () => {
    const words = editText.trim().split(" ");
    if (words.length <= 1) return; // Մնացածը չջնջել
    const removedWord = words.pop();
    setRedoStack([removedWord, ...redoStack]);
    setEditText(words.join(" "));
  };

  // Բառային Redo
  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const [word, ...rest] = redoStack;
    const newText = (editText + " " + word).trim();
    setEditText(newText);
    setRedoStack(rest);
  };

  const handleEditChange = (e) => {
    setEditText(e.target.value);
    setRedoStack([]); // նոր տեքստը մաքրում է redo stack-ը
  };

  const isSaveDisabled = !editText.trim();

  return (
    <ul className="task-list" ref={listRef}>
      {filteredTasks.length === 0 ? (
        <p className="empty">No tasks found</p>
      ) : (
        filteredTasks.map((t) => (
          <li key={t.id} className="task-item">
            <div onClick={() => openEditModal(t)} className="edit-button">
              <TbDotsVertical />
            </div>

            <span className="task-text">{t.text}</span>

            {current === "in-progress" && (
              <div className="task-actions">
                <IoCloseOutline
                  className="task-cancel-icon"
                  onClick={() => deleteTask(t.id)}
                  style={{ width: "37px", height: "37px" }}
                />
                <IoCheckmarkOutline
                  className="task-done-icon"
                  onClick={() => completeTask(t.id)}
                  style={{ width: "37px", height: "37px" }}
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
                    <button
                      onClick={saveEdit}
                      className="saveEdit"
                      disabled={isSaveDisabled}
                    >
                      Save
                    </button>
                    <button onClick={cancelEdit} className="cancelEdit">
                      Cancel
                    </button>
                    <button
                      onClick={handleUndo}
                      className="undoEdit"
                      disabled={editText.trim().split(" ").length <= 1}
                    >
                      <ImUndo style={{ marginRight: "8px" }} /> Undo
                    </button>
                    <button
                      onClick={handleRedo}
                      className="redoEdit"
                      disabled={redoStack.length === 0}
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
  );
};

export default TaskBox;
