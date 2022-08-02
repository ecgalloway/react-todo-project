import React, { useState, useEffect } from "react";
import { Route, Routes, Switch } from "react-router-dom";

import Header from "./Header";
import InputToDo from "./InputToDo";
import ToDosList from "./ToDosList";
import About from "../pages/About";
import NotMatch from "../pages/NotMatch";
import Navbar from "./Navbar";

import { v4 as uuidv4 } from "uuid";

const ToDoContainer = () => {
  const [todos, setTodos] = useState(getInitialToDos());

  const onChange = (id) => {
    setTodos((prevState) =>
      prevState.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      })
    );
  };

  const delToDo = (id) => {
    setTodos([
      ...todos.filter((todo) => {
        return todo.id !== id;
      }),
    ]);
  };

  const addToDoItem = (title) => {
    const newToDo = {
      id: uuidv4(),
      title: title,
      completed: false,
    };
    setTodos([...todos, newToDo]);
  };

  const setUpdate = (updatedTitle, id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.title = updatedTitle;
        }
        return todo;
      })
    );
  };

  function getInitialToDos() {
    // getting stored items
    const temp = localStorage.getItem("todos");
    const savedToDos = JSON.parse(temp);
    return savedToDos || [];
  }

  useEffect(() => {
    // storing todos items
    const temp = JSON.stringify(todos);
    localStorage.setItem("todos", temp);
  }, [todos]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <div className="container">
              <div className="inner">
                <Header />
                <InputToDo addToDoProps={addToDoItem} />
                <ToDosList
                  todos={todos}
                  onChangeProps={onChange}
                  deleteToDoProps={delToDo}
                  setUpdate={setUpdate}
                />
              </div>
            </div>
          }
        />
        <Route path="/about/*" element={<About />} />
        <Route path="*" element={<NotMatch />} />
      </Routes>
    </>
  );
};

export default ToDoContainer;
