import React from "react";

import ToDosList from "./ToDosList";
import Header from "./Header";
import InputToDo from "./InputToDo";

import { v4 as uuidv4 } from "uuid";

class ToDoContainer extends React.Component {
  state = {
    todos: [],
  };

  onChange = (id) => {
    this.setState((prevState) => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      }),
    }));
  };

  delToDo = (id) => {
    this.setState({
      todos: [
        ...this.state.todos.filter((todo) => {
          return todo.id !== id;
        }),
      ],
    });
  };

  addToDoItem = (title) => {
    const newToDo = {
      id: uuidv4(),
      title: title,
      completed: false,
    };
    this.setState({
      todos: [...this.state.todos, newToDo],
    });
  };

  setUpdate = (updatedTitle, id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.title = updatedTitle;
        }
        return todo;
      }),
    });
  };

  componentDidMount() {
    const temp = localStorage.getItem("todos");
    const loadedToDos = JSON.parse(temp);
    if (loadedToDos) {
      this.setState({
        todos: loadedToDos,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos !== this.state.todos) {
      const temp = JSON.stringify(this.state.todos);
      localStorage.setItem("todos", temp);
    }
  }

  render() {
    return (
      <div className="container">
        <div className="inner">
          <Header />
          <InputToDo addToDoProps={this.addToDoItem} />
          <ToDosList
            todos={this.state.todos}
            onChangeProps={this.onChange}
            deleteToDoProps={this.delToDo}
            setUpdate={this.setUpdate}
          />
        </div>
      </div>
    );
  }
}

export default ToDoContainer;
