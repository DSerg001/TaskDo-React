// import { useState, useRef } from "react";
// import { MdCancel, MdEdit } from "react-icons/md";
// import { IoMdCheckmarkCircle } from "react-icons/io";
// import { TbDotsVertical } from "react-icons/tb";
// import { ImUndo, ImRedo } from "react-icons/im";
// import "./TaskBox.css";

// const TaskBox = ({
//   current,
//   filteredTasks,
//   deleteTask,
//   completeTask,
//   editTask,
// }) => {
//   const [editId, setEditId] = useState(null);
//   const [editText, setEditText] = useState("");
//   const [history, setHistory] = useState([]);
//   const [redoStack, setRedoStack] = useState([]);
//   const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
//   const listRef = useRef(null);

//   const openEditModal = (task, event) => {
//     const rect = event.currentTarget.getBoundingClientRect();
//     setModalPosition({
//       top: rect.bottom + window.scrollY,
//       left: rect.left + window.scrollX,
//     });
//     setEditId(task.id);
//     setEditText(task.text);
//     setHistory([task.text]);
//     setRedoStack([]);
//   };

//   const saveEdit = () => {
//     if (editText.trim() === "") return;
//     editTask(editId, editText);
//     setEditId(null);
//     setEditText("");
//     setHistory([]);
//     setRedoStack([]);
//   };

//   const cancelEdit = () => {
//     setEditId(null);
//     setEditText("");
//     setHistory([]);
//     setRedoStack([]);
//   };

//   const handleUndo = () => {
//     if (history.length <= 1) return;
//     const updated = [...history];
//     const last = updated.pop();
//     setRedoStack([last, ...redoStack]);
//     setHistory(updated);
//     setEditText(updated[updated.length - 1]);
//   };

//   const handleRedo = () => {
//     if (redoStack.length === 0) return;
//     const [next, ...rest] = redoStack;
//     setHistory([...history, next]);
//     setEditText(next);
//     setRedoStack(rest);
//   };

//   const handleEditChange = (e) => {
//     const value = e.target.value;
//     setEditText(value);
//     setHistory([...history, value]);
//   };

//   return (
//     <>
//       <ul
//         className={`task-list ${
//           filteredTasks.length <= 2 ? "centered-list" : ""
//         }`}
//         ref={listRef}
//       >
//         {filteredTasks.length === 0 ? (
//           <p className="empty">No tasks found</p>
//         ) : (
//           filteredTasks.map((t) => (
//             <li key={t.id} className="task-item">
//               <div onClick={(e) => openEditModal(t, e)} className="edit-button">
//                 <TbDotsVertical />
//               </div>

//               <span className="task-text">{t.text}</span>

//               {current === "in-progress" && (
//                 <div className="task-actions">
//                   <MdCancel
//                     className="task-icon cancel-icon"
//                     onClick={() => deleteTask(t.id)}
//                   />
//                   <IoMdCheckmarkCircle
//                     className="task-icon done-icon"
//                     onClick={() => completeTask(t.id)}
//                   />
//                 </div>
//               )}

//               {editId === t.id && (
//                 <div className="edit-modal-overlay" onClick={cancelEdit}>
//                   <div
//                     className="edit-modal"
//                     style={{
//                       top: modalPosition.top,
//                       left: modalPosition.left,
//                       position: "absolute",
//                     }}
//                     onClick={(e) => e.stopPropagation()}
//                   >
//                     <input
//                       type="text"
//                       value={editText}
//                       onChange={handleEditChange}
//                       placeholder="Edit task..."
//                     />
//                     <div className="edit-buttons">
//                       <button
//                         onClick={handleUndo}
//                         disabled={history.length <= 1}
//                       >
//                         <ImUndo /> Undo
//                       </button>
//                       <button
//                         onClick={handleRedo}
//                         disabled={redoStack.length === 0}
//                       >
//                         <ImRedo /> Redo
//                       </button>
//                       <button
//                         onClick={saveEdit}
//                         style={{ backgroundColor: "green" }}
//                       >
//                         Save
//                       </button>
//                       <button
//                         onClick={cancelEdit}
//                         style={{ backgroundColor: "red" }}
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </li>
//           ))
//         )}
//       </ul>
//     </>
//   );
// };

// export default TaskBox;

// import { useState } from "react";
// import { MdCancel, MdEdit } from "react-icons/md";
// import { IoMdCheckmarkCircle } from "react-icons/io";
// import { TbDotsVertical } from "react-icons/tb";
// import { ImUndo, ImRedo } from "react-icons/im";
// import "./TaskBox.css";

// const TaskBox = ({
//   current,
//   filteredTasks,
//   deleteTask,
//   completeTask,
//   listRef,
//   editTask,
// }) => {
//   const [editId, setEditId] = useState(null);
//   const [editText, setEditText] = useState("");
//   const [history, setHistory] = useState([]);
//   const [redoStack, setRedoStack] = useState([]);

//   // Open modal
//   const openEditModal = (task) => {
//     setEditId(task.id);
//     setEditText(task.text);
//     setHistory([task.text]);
//     setRedoStack([]);
//   };

//   // Save changes
//   const saveEdit = () => {
//     if (editText.trim() === "") return;
//     editTask(editId, editText);
//     setEditId(null);
//     setEditText("");
//     setHistory([]);
//     setRedoStack([]);
//   };

//   // Cancel modal
//   const cancelEdit = () => {
//     setEditId(null);
//     setEditText("");
//     setHistory([]);
//     setRedoStack([]);
//   };

//   // Undo
//   const handleUndo = () => {
//     if (history.length <= 1) return;
//     const updated = [...history];
//     const last = updated.pop();
//     setRedoStack([last, ...redoStack]);
//     setHistory(updated);
//     setEditText(updated[updated.length - 1]);
//   };

//   // Redo
//   const handleRedo = () => {
//     if (redoStack.length === 0) return;
//     const [next, ...rest] = redoStack;
//     setHistory([...history, next]);
//     setEditText(next);
//     setRedoStack(rest);
//   };

//   // Store new value in history
//   const handleEditChange = (e) => {
//     const value = e.target.value;
//     setEditText(value);
//     setHistory([...history, value]);
//   };

//   return (
//     <>
//       <ul className="task-list" ref={listRef}>
//         {filteredTasks.length === 0 ? (
//           <p className="empty">No tasks found</p>
//         ) : (
//           filteredTasks.map((t) => (
//             <li key={t.id} className="task-item">
//               <div className="edit-button" onClick={() => openEditModal(t)}>
//                 <TbDotsVertical />
//               </div>

//               <span className="task-text">{t.text}</span>

//               {current === "in-progress" && (
//                 <div className="task-actions">
//                   <MdCancel
//                     className="task-icon cancel-icon"
//                     onClick={() => deleteTask(t.id)}
//                   />
//                   <IoMdCheckmarkCircle
//                     className="task-icon done-icon"
//                     onClick={() => completeTask(t.id)}
//                   />
//                 </div>
//               )}

//               {/* Edit Modal */}
//               {editId === t.id && (
//                 <div className="edit-modal-overlay">
//                   <div className="edit-modal">
//                     <h3>
//                       <MdEdit style={{ marginRight: "6px" }} /> Edit Task
//                     </h3>

//                     <input
//                       type="text"
//                       value={editText}
//                       onChange={handleEditChange}
//                       maxLength={300}
//                       placeholder="Type new text..."
//                     />

//                     <div className="edit-buttons">
//                       <button
//                         onClick={handleUndo}
//                         disabled={history.length <= 1}
//                       >
//                         <ImUndo /> Undo
//                       </button>

//                       <button
//                         onClick={handleRedo}
//                         disabled={redoStack.length === 0}
//                       >
//                         <ImRedo /> Redo
//                       </button>

//                       <button
//                         onClick={saveEdit}
//                         style={{ background: "green" }}
//                       >
//                         Save
//                       </button>

//                       <button
//                         onClick={cancelEdit}
//                         style={{ background: "red" }}
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </li>
//           ))
//         )}
//       </ul>
//     </>
//   );
// };

// export default TaskBox;

import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { MdCancel, MdEdit } from "react-icons/md";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { TbDotsVertical } from "react-icons/tb";
import { ImUndo, ImRedo } from "react-icons/im";
import "./TaskBox.css";

const TaskBox = ({
  current,
  task,
  setTask,
  handleAddTask,
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
      {/* Add Task input ONLY for "in-progress" */}
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

      {/* Task List */}
      <ul className="task-list" ref={listRef}>
        {filteredTasks.length === 0 ? (
          <p className="empty">No tasks found</p>
        ) : (
          filteredTasks.map((t) => (
            <li key={t.id} className="task-item">
              <div className="edit-button" onClick={() => openEditModal(t)}>
                <TbDotsVertical />
              </div>
              <span className="task-text">{t.text || "(No text)"}</span>

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

              {/* Edit Modal */}
              {editId === t.id && (
                <div className="edit-modal-overlay">
                  <div className="edit-modal">
                    <h3>
                      <MdEdit style={{ marginRight: "8px" }} />
                      Edit Task
                    </h3>

                    <input
                      type="text"
                      value={editText}
                      onChange={handleEditChange}
                      placeholder="Type new task..."
                    />

                    <div className="edit-buttons">
                      <button
                        onClick={saveEdit}
                        style={{ backgroundColor: "green" }}
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        style={{ backgroundColor: "red" }}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleUndo}
                        disabled={history.length <= 1}
                      >
                        <ImUndo style={{ marginRight: "8px" }} /> Undo
                      </button>
                      <button
                        onClick={handleRedo}
                        disabled={redoStack.length === 0}
                      >
                        <ImRedo style={{ marginRight: "8px" }} />
                        Redo
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

