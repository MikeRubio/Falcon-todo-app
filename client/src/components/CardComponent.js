import React, { useState } from "react";
import EditableCardComponent from "./EditableCardComponent";
import "./CardComponent.css";

function CardComponent({
  filteredTodoList,
  updateTodo,
  changeStateElement,
  deleteTodo,
}) {
  const [editing, setEditing] = useState("");

  const editElement = (id) => {
    setEditing(id);
  };

  return (
    <>
      {filteredTodoList.map(({ id, title, description, completed }) => {
        return (
          <div
            className={`ui fluid card  ${completed ? "green" : "blue"}`}
            key={id}
          >
            {editing === id ? (
              <EditableCardComponent
                id={id}
                title={title}
                description={description}
                closeEditing={setEditing}
                action={updateTodo}
                onUpdating={true}
              />
            ) : (
              <>
                <div className="content">
                  <i
                    tabIndex="0"
                    title="Delete"
                    className="right floated circular red trash alternate outline icon"
                    onClick={() => deleteTodo(id)}
                    onKeyPress={({ key }) => {
                      if (key === "Enter") deleteTodo(id);
                    }}
                  ></i>
                  <i
                    tabIndex="0"
                    title="Edit"
                    className="right floated circular blue edit outline icon Change"
                    onClick={() => editElement(id)}
                    onKeyPress={({ key }) => {
                      if (key === "Enter") editElement(id);
                    }}
                  ></i>
                  <i
                    tabIndex="0"
                    title={completed ? "Undo" : "Complete"}
                    className={`right floated circular ${
                      completed ? "red redo" : "teal check"
                    } icon`}
                    onClick={() => changeStateElement(id, !completed)}
                    onKeyPress={({ key }) => {
                      if (key === "Enter") changeStateElement(id, !completed);
                    }}
                  ></i>
                  <div className="header">{title}</div>
                  <div className="description">
                    <p>{description}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        );
      })}
    </>
  );
}

export default CardComponent;
