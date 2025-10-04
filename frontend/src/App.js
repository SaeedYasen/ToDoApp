import React, { useState, useEffect } from "react";
import TodoList from "./components/TodoList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/tasks")
      .then((res) => res.json())
      .then(setTasks);
  }, []);

  const addTask = async () => {
    if (!newTask.trim()) return;
    const res = await fetch("http://127.0.0.1:5000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: newTask }),
    });
    const data = await res.json();
    setTasks([...tasks, data]);
    setNewTask("");
  };

  const toggleTask = async (id) => {
    const res = await fetch(`http://127.0.0.1:5000/tasks/${id}`, { method: "PUT" });
    const data = await res.json();
    setTasks(tasks.map((t) => (t.id === id ? data : t)));
  };

  const deleteTask = async (id) => {
    await fetch(`http://127.0.0.1:5000/tasks/${id}`, { method: "DELETE" });
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-indigo-700 mb-4">
          ✅ My ToDo App
        </h1>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 border p-2 rounded-lg"
          />
          <button
            onClick={addTask}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            Add
          </button>
        </div>
        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center">No tasks yet. Add your first task!</p>
        ) : (
          <TodoList tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} />
        )}
      </div>
    </div>
  );
}

export default App;
