import React from "react";

function TodoItem({ task, toggleTask, deleteTask }) {
  return (
    <li className="flex justify-between items-center bg-gray-100 p-2 rounded-lg shadow hover:bg-gray-200 transition">
      <span
        onClick={() => toggleTask(task.id)}
        className={`cursor-pointer flex-1 ${task.done ? "line-through text-gray-500" : ""}`}
        title={`Created at: ${new Date(task.created_at).toLocaleString()}`}
      >
        {task.task}
      </span>
      <button
        onClick={() => deleteTask(task.id)}
        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
      >
        ❌
      </button>
    </li>
  );
}

export default TodoItem;
