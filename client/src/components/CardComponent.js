import "./styles/CardComponent.css";
import React, { useState, useContext } from "react";
import EditableCardComponent from "./EditableCardComponent";
import api from "../Api/api";
import { TodoListContext } from "./TodosComponent";

function CardComponent({ filteredTodoList }) {
  const [editing, setEditing] = useState("");
  const [todoList, setTodoList] = useContext(TodoListContext);

  const editElement = (id) => {
    setEditing(id);
  };

  const deleteTodo = async (id) => {
    const result = await api.deleteTodo(id);
    if (result.status === 200) {
      const updated = todoList.filter((obj) => obj.id !== result.data.id);
      setTodoList(updated);
    }
  };

  const changeStateTodo = async (id, completed) => {
    const result = await api.updateTodo(id, {
      completed,
    });
    if (result.status === 200) {
      const updated = todoList.map(
        (obj) => [result.data].find((o) => o.id === obj.id) || obj
      );
      setTodoList(updated);
    }
  };

  const updateTodo = async (id, title, description) => {
    const result = await api.updateTodo(id, {
      title,
      description,
    });
    if (result.status === 200) {
      const updated = todoList.map(
        (obj) => [result.data].find((o) => o.id === obj.id) || obj
      );
      setTodoList(updated);
    }
  };

  const handleEvents = (e, id, action, completed) => {
    if (e.type === "click" || (e.type === "keydown" && e.key === "Enter")) {
      switch (action) {
        case "delete":
          deleteTodo(id);
          break;
        case "edit":
          editElement(id);
          break;
        case "change":
          changeStateTodo(id, !completed);
          break;
      }
    }
  };
  return (
    <>
      {filteredTodoList.map(({ id, title, description, completed }) => {
        return (
          <div
            className={`ui fluid card ${completed ? "green" : "blue"}`}
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
                    aria-label="Delete"
                    className="right floated circular red trash alternate outline icon"
                    onClick={(e) => handleEvents(e, id, "delete")}
                    onKeyDown={(e) => handleEvents(e, id, "delete")}
                  ></i>
                  <i
                    tabIndex="0"
                    title="Edit"
                    aria-label="Edit"
                    className="right floated circular blue edit outline icon Change"
                    onClick={(e) => handleEvents(e, id, "edit")}
                    onKeyDown={(e) => handleEvents(e, id, "edit")}
                  ></i>
                  <i
                    tabIndex="0"
                    title={completed ? "Undo" : "Complete"}
                    aria-label={completed ? "Undo" : "Complete"}
                    className={`right floated circular ${
                      completed ? "red redo" : "teal check"
                    } icon`}
                    onClick={(e) => handleEvents(e, id, "change", completed)}
                    onKeyDown={(e) => handleEvents(e, id, "change", completed)}
                  ></i>
                  <div className="header" title="title">
                    {title}
                  </div>
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
