import { useState, useEffect } from "react";
import "./App.css";
import darkdetective from "./assets/dark-detective.png";
import lightdetective from "./assets/light-detective.png";
import { TodoProvider } from "./context";
import InputForm from "./components/InputForm";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  // function to add todo
  const addTodo = (todo) => {
    setTodos((prev) => [{ ...todo }, ...prev]);
  };

  // function to update todo
  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((individualTodo) =>
        individualTodo.id === id ? todo : individualTodo
      )
    );
  };

  // function to delete todo
  const deleteTodo = (id) => {
    setTodos((prev) =>
      prev.filter((individualTodo) => individualTodo.id !== id)
    );
  };

  // function to check whether the selected task is completed or not
  const isCompleted = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider value={{ addTodo, deleteTodo, updateTodo, isCompleted }}>
      <header className="w-full py-6">
        <nav>
          <h1 className="font-bold text-center text-2xl">TODO LIST</h1>
        </nav>
      </header>

      <section className="lg:max-w-[65%] w-full sm:p-6 px-2 py-4 m-auto flex flex-col gap-6">
        <h1 className="text-xl font-semibold px-2">Add a Task</h1>
        <InputForm />
        {todos.length == 0 ? (
          <div className="py-5 self-center flex flex-col gap-8 items-center">
            <img
              src={darkdetective}
              className="dark:block hidden sm:w-[350px] max-h-[315px]"
            />
            <img
              src={lightdetective}
              className="dark:hidden block sm:w-[350px] max-h-[315px]"
            />
            <p className="text-center sm:text-4xl text-2xl font-medium">
              Nothing to do Today
            </p>
          </div>
        ) : (
          <div className="">
            {todos.map((todo) => (
              <div className="flex flex-col gap-3" key={todo.id}>
                <TodoList todo={todo} />
              </div>
            ))}
          </div>
        )}
      </section>
    </TodoProvider>
  );
}

export default App;
