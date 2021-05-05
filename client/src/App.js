import React from "react";
import TodosComponent from "./components/TodosComponent";
import "./App.css";
function App() {
  return (
    <div>
      <h2 id="title-header" class="ui center aligned header">
        Todo app made for Falcon.io recruitment team
      </h2>
      <TodosComponent></TodosComponent>
    </div>
  );
}
export default App;
