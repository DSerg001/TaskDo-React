import { create } from "zustand";

const TASKS_STORAGE_KEY = "taskdo_tasks";

const loadTasks = () => {
  try {
    const saved = localStorage.getItem(TASKS_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const useTaskStore = create((set) => ({
  tasks: loadTasks(),
  searchQuery: "", // always initialized

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
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(newTasks));
      return { tasks: newTasks };
    }),

  deleteTask: (id) =>
    set((state) => {
      const newTasks = state.tasks.map((t) =>
        t.id === id ? { ...t, status: "deleted" } : t
      );
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(newTasks));
      return { tasks: newTasks };
    }),

  completeTask: (id) =>
    set((state) => {
      const newTasks = state.tasks.map((t) =>
        t.id === id ? { ...t, status: "done" } : t
      );
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(newTasks));
      return { tasks: newTasks };
    }),

  restoreTask: (id) =>
    set((state) => {
      const newTasks = state.tasks.map((t) =>
        t.id === id ? { ...t, status: "in-progress" } : t
      );
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(newTasks));
      return { tasks: newTasks };
    }),

  moveToDone: (id) =>
    set((state) => {
      const newTasks = state.tasks.map((t) =>
        t.id === id ? { ...t, status: "done" } : t
      );
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(newTasks));
      return { tasks: newTasks };
    }),

  removeFromDone: (id) =>
    set((state) => {
      const newTasks = state.tasks.map((t) =>
        t.id === id ? { ...t, status: "in-progress" } : t
      );
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(newTasks));
      return { tasks: newTasks };
    }),

  permanentDelete: (id) =>
    set((state) => {
      const newTasks = state.tasks.filter((t) => t.id !== id);
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(newTasks));
      return { tasks: newTasks };
    }),

  setSearchQuery: (query) => set({ searchQuery: query || "" }),
}));
