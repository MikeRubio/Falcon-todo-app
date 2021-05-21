import React, { useState, useRef, useEffect, useContext } from "react";
import { TodoListContext } from "./TodosComponent";
import api from "../Api/api";

function EditableCardComponent({
  action,
  onUpdating,
  title,
  description,
  id,
  closeEditing,
  priority,
}) {
  const [ediatbleDescription, setEdiatbleDescription] = useState(
    description || ""
  );
  const [editableTitle, setEditableTitle] = useState(title || "");
  const [todoList, setTodoList] = useContext(TodoListContext);
  const [inputError, setInputError] = useState(false);
  const [editablePriority, setEditablePriority] = useState(priority ?? 0);

  const inputTitleRef = useRef();

  useEffect(() => {
    inputTitleRef.current.focus();
  }, []);

  const createTodo = async (title, description, priority) => {
    const result = await api.createTodo({
      title,
      description,
      priority,
    });
    if (result.status === 200) {
      setTodoList([...todoList, result.data]);
      closeEditing(false);
    }
  };

  return (
    <div className="ui fluid card" id="editable-card" key={id}>
      <div className="content">
        <div className="header">
          {inputError ? (
            <div className="field" placeholder="Last Name">
              <div className="ui pointing below red basic label">
                Title is required
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="ui transparent fluid input">
            <input
              aria-label="title"
              id="editable-title"
              type="text"
              placeholder="Title"
              value={editableTitle}
              ref={inputTitleRef}
              onChange={(e) => setEditableTitle(e.target.value)}
              onBlur={() => {
                setInputError(editableTitle ? false : true);
              }}
            />
            <label htmlFor="editable-title" className="ui label tiny">
              Title
            </label>
          </div>
        </div>
        <div className="description">
          <div className="ui transparent fluid input">
            <input
              aria-label="description"
              id="editable-description"
              type="text"
              name="editable-description"
              placeholder="Description"
              value={ediatbleDescription}
              onChange={(e) => setEdiatbleDescription(e.target.value)}
            />
            <label htmlFor="editable-description" className="ui label tiny">
              Description
            </label>
          </div>
        </div>
      </div>
      <div className="extra content">
        <select
          className="ui selection dropdown"
          value={editablePriority}
          onChange={(ev) => setEditablePriority(ev.target.value)}
        >
          <option value="0">low</option>
          <option value="1">medium</option>
          <option value="2">high</option>
        </select>
      </div>
      <div className="extra content">
        <div className="ui two mini buttons">
          <button
            type="submit"
            aria-label="submit-btn"
            className={`ui positive button ${editableTitle ? "" : "disabled"}`}
            onClick={() =>
              onUpdating
                ? (action(
                    id,
                    editableTitle,
                    ediatbleDescription,
                    editablePriority
                  ),
                  closeEditing(false))
                : createTodo(
                    editableTitle,
                    ediatbleDescription,
                    editablePriority
                  )
            }
          >
            {onUpdating ? "Edit" : "Create"}
          </button>
          <div className="or"></div>
          <button
            className="ui button tiny"
            onClick={() => closeEditing(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditableCardComponent;
