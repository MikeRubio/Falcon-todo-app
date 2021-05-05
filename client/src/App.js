import React, { useState, useEffect } from "react";
import ToolBoxComponent from "./components/ToolBoxComponent";
import CardComponent from "./components/CardComponent";
import api from "./Api/api";

function App() {
  const [todoList, setTodoList] = useState([]);
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
      <div className="ui content" style={{ margin: "1rem" }}>
        <ToolBoxComponent setTodoAdded={setTodoAdded} />
      </div>
      <div className="ui three column grid">
        <div className="column">
          <h1>To DO</h1>
          <CardComponent
            todoList={todoList.filter(
              (complete) => complete.completed == false
            )}
            setTodoAdded={setTodoAdded}
          ></CardComponent>
        </div>
        <div className="column">
          <div className="ui vertical divider">Hire me</div>
        </div>
        <div className="column">
          <h1>Completed</h1>
          <CardComponent
            todoList={todoList.filter((complete) => complete.completed == true)}
            setTodoAdded={setTodoAdded}
          ></CardComponent>
        </div>
      </div>
    </div>
  );
}
export default App;
