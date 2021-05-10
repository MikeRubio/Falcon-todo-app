import React from "react";
import { TodosComponent } from "./components/TodosComponent";
import "./App.css";
function App() {
  return (
    <div>
      <h1 id="title-header" className="ui center aligned header">
        Todo app made for Falcon.io recruitment team
      </h1>
      <TodosComponent />
    </div>
  );
}
export default App;
