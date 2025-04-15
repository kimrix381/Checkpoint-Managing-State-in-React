import React, { useEffect, useState } from "react";
import TaskForm from "./components/taskform.jsx";
import TaskList from "./components/tasklist.jsx";

function App() {
  // ✅ Load tasks from localStorage during initial state
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    try {
      return storedTasks ? JSON.parse(storedTasks) : [];
    } catch (e) {
      console.error("Error parsing tasks from localStorage:", e);
      return [];
    }
  });

  const [editTask, setEditTask] = useState(null);

  // ✅ Save to localStorage every time tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    const newTask = { ...task, id: Date.now(), completed: false };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const updateTask = (updatedTask) => {
    const updatedList = tasks.map((t) =>
      t.id === updatedTask.id ? updatedTask : t
    );
    setTasks(updatedList);
    setEditTask(null);
  };

  const deleteTask = (id) => {
    if (window.confirm("Delete this task?")) {
      setTasks(tasks.filter((t) => t.id !== id));
    }
  };

  const toggleComplete = (id) => {
    const updatedList = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedList);
  };

  const clearAllTasks = () => {
    if (window.confirm("Clear all tasks?")) {
      localStorage.removeItem("tasks");
      setTasks([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">To-Do List</h1>

      <TaskForm onSubmit={editTask ? updateTask : addTask} task={editTask} />

      <TaskList
        tasks={tasks}
        onEdit={setEditTask}
        onDelete={deleteTask}
        onToggleComplete={toggleComplete}
      />

      {/* ✅ Clear All Button */}
      <button
        onClick={clearAllTasks}
        className="mt-6 w-full px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-red-700 hover:shadow-lg active:scale-95"
      >
        Clear All Tasks
      </button>
    </div>
  );
}

export default App;
