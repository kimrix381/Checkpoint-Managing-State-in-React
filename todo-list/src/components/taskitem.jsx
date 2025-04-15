// TaskItem.jsx
import React from "react";

function TaskItem({ task, onEdit, onDelete, onToggleComplete }) {
  return (
    <div
      className={`p-4 rounded shadow mb-3 flex justify-between items-start ${
        task.completed ? "bg-green-100 line-through text-gray-500" : "bg-white"
      }`}
    >
      <div>
        <h3 className="text-lg font-bold">{task.name}</h3>
        <p>{task.description}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onToggleComplete(task.id)}
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded text-sm"
        >
          {task.completed ? "Undo" : "Done"}
        </button>
        <button
          onClick={() => onEdit(task)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
