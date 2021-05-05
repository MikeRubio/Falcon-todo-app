import React, { useState, useEffect } from "react";
import ToolBoxComponent from "./components/ToolBoxComponent";
import CardComponent from "./components/CardComponent";
import api from "./Api/api";

function App() {
  const [todoList, setTodoList] = useState([{}]);
  const [todoAdded, setTodoAdded] = useState(false);

  const getTodos = async () => {
    let response = await api.getTodo();
    setTodoList(response.data);
    setTodoAdded(false);
  };

  useEffect(() => {
    getTodos();
  }, [todoAdded]);

  return (
    <div className="ui container">
      <ToolBoxComponent setTodoAdded={setTodoAdded} />
      <CardComponent todoList={todoList}></CardComponent>
    </div>
  );
}
export default App;
