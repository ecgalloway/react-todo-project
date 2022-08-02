import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
// component file
import ToDoContainer from "./functionBased/components/ToDoContainer";

// stylesheet
import "./functionBased/App.css";

ReactDOM.render(
  <React.StrictMode>
    <Router basename={process.env.PUBLIC_URL}>
      <ToDoContainer />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
