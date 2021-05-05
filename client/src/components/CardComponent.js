import React, { useState } from "react";
import api from "../Api/api";
import "./CardComponent.css";
/**
 * TODO
 * Move EditableElement to a separate file to improve readability
 * Fix focus lost on editable component
 * add styling to identify what card is under edit
 */
function CardComponent({ todoList, setTodoAdded }) {
  const [edit, setEdit] = useState("");
  const [ediatbleDescription, setEdiatbleDescription] = useState("");
  const [editableTitle, setEditableTitle] = useState("");

  const deleteElement = async (elm) => {
    const result = await api.deleteTodo(elm.id);
    if (result.status === 200) {
      setTodoAdded(true);
    }
  };

  const updateElement = async (id) => {
    const result = await api.updateTodo(id, {
      title: editableTitle,
      description: ediatbleDescription,
    });
    if (result.status === 200) {
      setTodoAdded(true);
      setEdit("");
    }
  };

  const editElement = (elm) => {
    setEdit(elm.id);
    setEdiatbleDescription(elm.description);
    setEditableTitle(elm.title);
  };

  const EditableElement = ({ elm }) => {
    return (
      <div className="ui fluid card" key={elm.id}>
        <div className="content">
          <div className="header">
            <div class="ui transparent input">
              <input
                type="text"
                name="editable-title"
                value={editableTitle}
                onChange={(e) => setEditableTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="description">
            <div class="ui transparent input">
              <input
                type="text"
                name="editable-description"
                value={ediatbleDescription}
                onChange={(e) => setEdiatbleDescription(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="extra content">
          <div className="ui two buttons">
            <div
              className={`ui basic green button ${
                editableTitle ? "" : "disabled"
              }`}
              onClick={() => updateElement(elm.id)}
            >
              Edit
            </div>
            <div className="ui basic red button" onClick={() => setEdit("")}>
              Cancel
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <React.Fragment>
      {todoList.map((elm) => {
        return (
          <div className="ui fluid card" key={elm.id}>
            {edit === elm.id ? (
              <EditableElement elm={elm} />
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
                <i className="right floated circular teal flag checkered icon"></i>
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
