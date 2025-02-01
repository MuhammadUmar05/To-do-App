import React, { useState, useEffect } from "react";
import { useTodo } from "../context/index";

function InputForm() {
  const [todo, setTodo] = useState("");
  const { addTodo } = useTodo();
  const add = (e) => {
    e.preventDefault();
    if (!todo) return;
    addTodo({ id: Date.now(), todo, completed: false });
    setTodo("");
  };

  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("current-mode") === "dark";
  });
  useEffect(() => {
    const HTML = document.querySelector("HTML");
    if (isDark) {
      localStorage.setItem("current-mode", "dark");
      HTML.classList.add(localStorage.getItem("current-mode"));
    } else {
      HTML.classList.remove(localStorage.getItem("current-mode"));
      localStorage.setItem("current-mode", "light");
    }
  }, [isDark]);

  return (
    <form onSubmit={add} className="flex sm:flex-row flex-col sm:gap-3 gap-2">
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="New Task"
        className="px-4 py-2 w-full rounded-lg font-medium border-primary dark:border-light/85 border-2 bg-transparent text-dark dark:text-light outline-none focus:border-dark dark:focus:border-primary dark:placeholder:text-light/70 placeholder:text-dark text-lg"
      />
      <div className="flex sm:w-fit gap-2 items-stretch content-stretch">
        <button
          type="submit"
          className="sm:w-fit w-full bg-primary text-light font-semibold tracking-wide sm:px-7 px-4 py-3 rounded-lg hover:bg-primary/80 transition 300ms ease-in-out"
        >
          Add
        </button>
        <button
          onClick={() => setIsDark((prev) => !prev)}
          className="bg-primary text-light font-semibold px-5 rounded-lg hover:bg-primary/80 transition 300ms ease-in-out"
        >
          {isDark ? (
            <i className="fa-solid fa-moon text-xl"></i>
          ) : (
            <i className="fa-solid fa-sun text-xl"></i>
          )}
        </button>
      </div>
    </form>
  );
}

export default InputForm;
