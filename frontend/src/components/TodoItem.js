import React from "react";

function TodoItem({task, index, toggleDone, deleteTask}) {
    return (
        <li style={{textDecoration: task.done ? "line-through" : "none"}}>
            {task.text}
            <button onClick={() => toggleDone(index)}>✔️</button>
            <button onClick={() => deleteTask(index)}>🗑️</button>
        </li>
    );
}

export default TodoItem;
