import React, { useState, useEffect } from "react";
import ToolBoxComponent from "./components/ToolBox/ToolBoxComponent";
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
      <ol>
        {todoList.map((x) => {
          return (
            <li key={x.id}>
              title: {x.title}, description: {x.description}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
export default App;
