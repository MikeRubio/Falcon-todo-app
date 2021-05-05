import React, { useState } from "react";
import EditableCardComponent from "./EditableCardComponent";
import "./CardComponent.css";

function CardComponent({
  todoList,
  setTodoAdded,
  updateTodo,
  changeStateElement,
  deleteElement,
}) {
  const [editing, setEditing] = useState("");

  const editElement = (id) => {
    setEditing(id);
  };

  return (
    <React.Fragment>
      {todoList.map((elm) => {
        return (
          <div className="ui fluid card" key={elm.id}>
            {editing === elm.id ? (
              <EditableCardComponent
                id={elm.id}
                title={elm.title}
                description={elm.description}
                closeEditing={setEditing}
                setTodoAdded={setTodoAdded}
                action={updateTodo}
                onUpdating={true}
              />
            ) : (
              <div className="content">
                <i
                  className="right floated circular red trash alternate outline icon"
                  onClick={() => deleteElement(elm.id)}
                ></i>
                <i
                  className="right floated circular blue edit outline icon Change"
                  onClick={() => editElement(elm.id)}
                ></i>
                <i
                  className={`right floated circular ${
                    elm.completed ? "red ban" : "teal check"
                  } icon`}
                  onClick={() => changeStateElement(elm.id, !elm.completed)}
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
