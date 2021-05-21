import React, { useState, useEffect } from "react";
import EditableCardComponent from "./EditableCardComponent";
import CardComponent from "./CardComponent";
import api from "../Api/api";
import ios from "../Api/socket";

const TodoListContext = React.createContext([{}, () => []]);

function TodosComponent() {
  const [todoList, setTodoList] = useState([]);
  const [addNewTodo, setAddNewTodo] = useState(false);

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      getTodos();
    }
    return () => {
      unmounted = true;
    };
  }, [todoList]);

  const displayCardByStatus = (completeStatus) => {
    return (
      <CardComponent
        filteredTodoList={todoList.filter(
          (complete) => complete.completed === completeStatus
        )}
      ></CardComponent>
    );
  };

  const getTodos = async () => {
    if (ios.socket.isConnected()) {
      ios.socket.get("/tasks", (body) => {
        if (body.length > 0) {
          setTodoList(body);
        }
      });
    }
    ios.socket.on("connect", () => {
      ios.socket.get("/tasks", (body) => {
        setTodoList(body);
      });
    });
  };

  const handleAddiconEvents = (e) => {
    if (e.type === "click" || (e.type === "keydown" && e.key === "Enter")) {
      setAddNewTodo(!addNewTodo);
    }
  };
  return (
    <TodoListContext.Provider value={[todoList, setTodoList]}>
      <div className="ui container">
        <div className="ui three column grid">
          <div className="column">
            <div className="ui header">
              <i
                title="Add new todo entry"
                aria-label="add"
                tabIndex="0"
                className="right floated large blue plus circle icon"
                onClick={handleAddiconEvents}
                onKeyDown={handleAddiconEvents}
              ></i>
              <div className="content">
                ToDos
                <div className="sub header">
                  Click here to create a new entry
                </div>
              </div>
            </div>
            {addNewTodo ? (
              <EditableCardComponent
                closeEditing={setAddNewTodo}
                onUpdating={false}
              />
            ) : (
              ""
            )}
            {displayCardByStatus(false)}
          </div>
          <div className="column">
            <div className="ui vertical divider">
              <i className="teal exchange icon"></i>
            </div>
          </div>
          <div className="column">
            <h2 className="content">Completed</h2>
            {displayCardByStatus(true)}
          </div>
        </div>
      </div>
    </TodoListContext.Provider>
  );
}

export { TodoListContext, TodosComponent };
