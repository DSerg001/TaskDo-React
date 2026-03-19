import { create } from "zustand";

const TASKS_STORAGE_KEY = "taskdo_tasks";

// Load tasks from localStorage
const loadTasks = () => {
  try {
    const saved = localStorage.getItem(TASKS_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

// Save tasks to localStorage
const saveTasks = (tasks) => {
  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
};

export const useTaskStore = create((set) => ({
  tasks: loadTasks(),
  searchQuery: "",

  // ➕ Add Task
  addTask: (text) =>
    set((state) => {
      const newTasks = [
        ...state.tasks,
        {
          id: Date.now(),
          text: text.trim() || "(No text)",
          status: "in-progress",
        },
      ];
      saveTasks(newTasks);
      return { tasks: newTasks };
    }),

  // ✏️ Edit Task
  editTask: (id, newText) =>
    set((state) => {
      const updated = state.tasks.map((t) =>
        t.id === id ? { ...t, text: newText.trim() || "(No text)" } : t,
      );
      saveTasks(updated);
      return { tasks: updated };
    }),

  // ❌ Move to Deleted
  deleteTask: (id) =>
    set((state) => {
      const updated = state.tasks.map((t) =>
        t.id === id ? { ...t, status: "deleted" } : t,
      );
      saveTasks(updated);
      return { tasks: updated };
    }),

  // ✔️ Complete Task
  completeTask: (id) =>
    set((state) => {
      const updated = state.tasks.map((t) =>
        t.id === id ? { ...t, status: "done" } : t,
      );
      saveTasks(updated);
      return { tasks: updated };
    }),

  // 🔁 Restore from Deleted/Done
  restoreTask: (id) =>
    set((state) => {
      const updated = state.tasks.map((t) =>
        t.id === id ? { ...t, status: "in-progress" } : t,
      );
      saveTasks(updated);
      return { tasks: updated };
    }),

  // ✔️ Alias for complete (kept for structure)
  moveToDone: (id) =>
    set((state) => {
      const updated = state.tasks.map((t) =>
        t.id === id ? { ...t, status: "done" } : t,
      );
      saveTasks(updated);
      return { tasks: updated };
    }),

  // 🔥 Permanent remove from Done
  removeFromDone: (id) =>
    set((state) => {
      const updated = state.tasks.filter((t) => t.id !== id);
      saveTasks(updated);
      return { tasks: updated };
    }),

  // 🗑️ Permanent delete (for Deleted screen)
  permanentDelete: (id) =>
    set((state) => {
      const updated = state.tasks.filter((t) => t.id !== id);
      saveTasks(updated);
      return { tasks: updated };
    }),

  // 🔍 Search
  setSearchQuery: (query) => set({ searchQuery: query || "" }),
}));
