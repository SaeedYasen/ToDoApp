import React, { useEffect, useState } from "react";
import TodoList from "./components/TodoList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/tasks")
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  const addTask = () => {
    if(input.trim() === "") return;
    fetch("http://127.0.0.1:5000/tasks", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({text: input})
    }).then(() => {
      setTasks([...tasks, {text: input, done:false}]);
      setInput("");
    });
  };

  const toggleDone = (index) => {
    const newTasks = [...tasks];
    newTasks[index].done = !newTasks[index].done;
    fetch(`http://127.0.0.1:5000/tasks/${index}`, {
      method: "PUT",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({done: newTasks[index].done})
    });
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    fetch(`http://127.0.0.1:5000/tasks/${index}`, {method:"DELETE"});
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="container">
      <h1>To-Do App</h1>
      <input value={input} onChange={(e)=>setInput(e.target.value)} placeholder="enter task"/>
      <button onClick={addTask}>add task</button>
      <TodoList tasks={tasks} toggleDone={toggleDone} deleteTask={deleteTask} />
    </div>
  );
}

export default App;
