import React, { useState, useEffect } from "react";
import EditableCardComponent from "./EditableCardComponent";
import CardComponent from "./CardComponent";
import api from "../Api/api";

function TodosComponent() {
  const [todoList, setTodoList] = useState([]);
  const [todoAdded, setTodoAdded] = useState(false);
  const [addNewTodo, setAddNewTodo] = useState(false);

  // Actions
  const getTodos = async () => {
    let response = await api.getTodo();
    setTodoList(response.data);
    setTodoAdded(false);
  };
  const createTodo = async (title, description) => {
    const result = await api.createTodo({
      title,
      description,
    });
    if (result.status === 200) {
      setTodoAdded(true);
      setAddNewTodo(!addNewTodo);
    }
  };
  const updateTodo = async (id, title, description) => {
    const result = await api.updateTodo(id, {
      title,
      description,
    });
    if (result.status === 200) {
      setTodoAdded(true);
    }
  };
  const changeStateElement = async (id, completed) => {
    const result = await api.updateTodo(id, {
      completed,
    });
    if (result.status === 200) {
      setTodoAdded(true);
    }
  };
  const deleteElement = async (id) => {
    const result = await api.deleteTodo(id);
    if (result.status === 200) {
      setTodoAdded(true);
    }
  };

  const displayCardCollection = (completeStatus) => {
    return (
      <CardComponent
        todoList={todoList.filter(
          (complete) => complete.completed === completeStatus
        )}
        setTodoAdded={setTodoAdded}
        updateTodo={updateTodo}
        changeStateElement={changeStateElement}
        deleteElement={deleteElement}
      ></CardComponent>
    );
  };
  useEffect(() => {
    getTodos();
  }, [todoAdded]);

  return (
    <div className="ui container">
      <div className="ui three column grid">
        <div className="column">
          <h2 class="ui header">
            <i
              className="right floated large blue plus circle icon"
              onClick={() => setAddNewTodo(!addNewTodo)}
            ></i>
            <div class="content">
              ToDos
              <div class="sub header">Click here to create a new entry</div>
            </div>
          </h2>
          {addNewTodo ? (
            <EditableCardComponent
              action={createTodo}
              closeEditing={setAddNewTodo}
              setTodoAdded={setTodoAdded}
              onUpdating={false}
            />
          ) : (
            ""
          )}
          {displayCardCollection(false)}
        </div>
        <div className="column">
          <div className="ui vertical divider">
            <i className="teal exchange icon"></i>
          </div>
        </div>
        <div className="column">
          <h1>Completed</h1>
          {displayCardCollection(true)}
        </div>
      </div>
    </div>
  );
}

export default TodosComponent;
