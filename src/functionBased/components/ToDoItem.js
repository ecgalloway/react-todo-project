import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import styles from "./ToDoItem.module.css";

const ToDoItem = (props) => {
  const [editing, setEditing] = useState(false);

  const onEdit = () => {
    setEditing(true);
  };

  const handleUpdatedDone = (event) => {
    if (event.key === "Enter") {
      setEditing(false);
    }
  };

  const completedStyle = {
    fontStyle: "italic",
    color: "#595959",
    opacity: 0.4,
    textDecoration: "line-through",
  };

  const { completed, id, title } = props.todo;

  let viewMode = {};
  let editMode = {};

  if (editing) {
    viewMode.display = "none";
  } else {
    editMode.display = "none";
  }

  useEffect(() => {
    return () => {
      console.log("cleaning up...");
    };
  }, []);

  return (
    <li className={styles.item}>
      <div onDoubleClick={onEdit} style={viewMode}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={completed}
          onChange={() => props.onChangeProps(id)}
        />
        <button onClick={() => props.deleteToDoProps(id)}>
          <FaTrash style={{ color: "orangered", fontSize: "16px" }} />
        </button>
        <span style={completed ? completedStyle : null}>{title}</span>
      </div>
      <input
        type="text"
        style={editMode}
        className={styles.textInput}
        value={title}
        onChange={(e) => {
          props.setUpdate(e.target.value, id);
        }}
        onKeyDown={handleUpdatedDone}
      />
    </li>
  );
};

export default ToDoItem;
