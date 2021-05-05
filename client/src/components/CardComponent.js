import React, { useState } from "react";
import api from "../Api/api";
import EditableCardComponent from "./EditableCardComponent";
import "./CardComponent.css";
/**
 * TODO
 * add styling to identify what card is under edit
 */
function CardComponent({
  todoList,
  setTodoAdded,
  // setTodoCompleted,
  // todoCompleted,
}) {
  const [editing, setEditing] = useState("");

  const deleteElement = async (elm) => {
    const result = await api.deleteTodo(elm.id);
    if (result.status === 200) {
      setTodoAdded(true);
    }
  };

  const changeStateElement = async (elm) => {
    const result = await api.updateTodo(elm.id, {
      completed: !elm.completed,
    });
    if (result.status === 200) {
      setTodoAdded(true);
    }
  };

  const editElement = (elm) => {
    setEditing(elm.id);
  };

  return (
    <React.Fragment>
      {todoList.map((elm) => {
        return (
          <div className="ui fluid card" key={elm.id}>
            {editing === elm.id ? (
              <EditableCardComponent
                elm={elm}
                setEditing={setEditing}
                setTodoAdded={setTodoAdded}
              />
            ) : (
              <div className="content">
                <i
                  className="right floated circular red trash alternate outline icon"
                  onClick={() => deleteElement(elm)}
                ></i>
                <i
                  className="right floated circular blue edit outline icon Change"
                  onClick={() => editElement(elm)}
                ></i>
                <i
                  className="right floated circular teal flag checkered icon"
                  onClick={() => changeStateElement(elm)}
                ></i>
                <div className="header">{elm.title}</div>
                <div className="description">
                  <p>{elm.description}</p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </React.Fragment>
  );
}

export default CardComponent;
