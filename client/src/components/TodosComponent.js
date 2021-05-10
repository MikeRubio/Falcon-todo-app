import React, { useState, useEffect } from "react";
import EditableCardComponent from "./EditableCardComponent";
import CardComponent from "./CardComponent";
import api from "../Api/api";
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
  }, []);

  const displayCardByStatus = (completeStatus) => {
    return (
      <CardComponent
        filteredTodoList={todoList.filter(
          (complete) => complete.completed === completeStatus
        )}
        updateTodo={updateTodo}
        changeStateElement={changeStateElement}
        deleteTodo={deleteTodo}
      ></CardComponent>
    );
  };

  // Actions
  const getTodos = async () => {
    let response = await api.getTodo();
    setTodoList(response.data);
  };
  const createTodo = async (title, description) => {
    const result = await api.createTodo({
      title,
      description,
    });
    if (result.status === 200) {
      setAddNewTodo(!addNewTodo);
      setTodoList([...todoList, result.data]);
    }
  };
  const updateTodo = async (id, title, description) => {
    const result = await api.updateTodo(id, {
      title,
      description,
    });
    if (result.status === 200) {
      setTodoList(updateTodos(result));
    }
  };
  const changeStateElement = async (id, completed) => {
    const result = await api.updateTodo(id, {
      completed,
    });
    if (result.status === 200) {
      setTodoList(updateTodos(result));
    }
  };
  const deleteTodo = async (id) => {
    const result = await api.deleteTodo(id);
    if (result.status === 200) {
      const updated = todoList.filter((obj) => obj.id !== result.data.id);
      setTodoList(updated);
    }
  };
  const updateTodos = (update) => {
    return todoList.map(
      (obj) => [update.data].find((o) => o.id === obj.id) || obj
    );
  };

  const handleAddiconEvents = (e) => {
    if (e.type === "click" || (e.type === "keydown" && e.key === "Enter")) {
      setAddNewTodo(!addNewTodo);
    }
  };
  return (
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
              <div className="sub header">Click here to create a new entry</div>
            </div>
          </div>
          {addNewTodo ? (
            <EditableCardComponent
              action={createTodo}
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
  );
}

export default TodosComponent;
