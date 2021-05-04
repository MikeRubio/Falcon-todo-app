import React, { useState } from "react";
import ToolBoxComponent from "./components/ToolBox/ToolBoxComponent";

function App() {
  const [todoList, setTodoList] = useState([{}]);
  return (
    <div className="ui container">
      <ToolBoxComponent setTodoList={setTodoList} todoList={todoList} />
    </div>
  );
}
export default App;
