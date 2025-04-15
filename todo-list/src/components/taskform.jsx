// TaskForm.jsx
import React, { useState, useEffect } from "react";

function TaskForm({ onSubmit, task }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (task) {
      setName(task.name);
      setDescription(task.description);
    } else {
      setName("");
      setDescription("");
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description) {
      setError("Both fields are required");
      return;
    }
    const newTask = {
      ...task,
      name,
      description,
    };
    onSubmit(newTask);
    setName("");
    setDescription("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">
        {task ? "Edit Task" : "Add Task"}
      </h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <input
        type="text"
        placeholder="Task name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
      />
      <textarea
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        {task ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
}

export default TaskForm;
