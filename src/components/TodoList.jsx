import React, { useState } from "react";
import { useTodo } from "../context";

function TodoList({ todo }) {
  const { deleteTodo, isCompleted, updateTodo } = useTodo();
  const [isEditable, setIsEditable] = useState(false);
  const [newText, setNewText] = useState(todo.todo);

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: newText });
    setIsEditable(false);
  };

  const toggleCheck = () => {
    isCompleted(todo.id);
    console.log(todo.completed)
  };
  return (
    <div className="flex sm:gap-3 gap-1 border-b-2 py-2 sm:px-4 px-3 items-center dark:border-light border-primary ">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={toggleCheck}
        className="accent-primary sm:scale-[2] scale-[1.75] cursor-pointer"
      />
      <input
        type="text"
        readOnly={!isEditable}
        className={`border-none outline-none mb-1 sm:px-3 pl-2 pr-1 py-1 w-full bg-transparent text-xl font-medium ${
          todo.completed ? "line-through" : ""
        } `}
        value={newText}
        onChange={(e) => setNewText(e.target.value)}
      />
      <button
        title="edit todo"
        onClick={() => {
          if (todo.completed) return;
          if (isEditable) editTodo();
          else {
            setIsEditable((prev) => !prev);
          }
        }}
        className="cursor-pointer rounded-full text-lg hover:bg-white/[0.05] transition ease-in-out flex items-center"
      >
        <i class="fa-solid fa-pen-to-square p-2 rounded-full"></i>
      </button>
      <button
        title="delete todo"
        onClick={() => {
          deleteTodo(todo.id);
        }}
        className="cursor-pointer rounded-full text-lg hover:bg-white/[0.05] transition ease-in-out flex items-center"
      >
        <i class="fa-solid fa-trash p-2 rounded-full"></i>
      </button>
    </div>
  );
}

export default TodoList;
