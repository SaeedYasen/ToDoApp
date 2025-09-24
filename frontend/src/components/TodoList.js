import React from "react";
import TodoItem from "./TodoItem";

function TodoList({tasks, toggleDone, deleteTask}) {
    return (
        <ul>
            {tasks.map((task, index) => (
                <TodoItem
                    key={index}
                    index={index}
                    task={task}
                    toggleDone={toggleDone}
                    deleteTask={deleteTask}
                />
            ))}
        </ul>
    );
}

export default TodoList;
