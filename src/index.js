import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";
// component file
import ToDoContainer from "./functionBased/components/ToDoContainer";

// stylesheet
import "./functionBased/App.css";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ToDoContainer />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
