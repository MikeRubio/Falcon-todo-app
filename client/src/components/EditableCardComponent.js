import React, { useState, useRef, useEffect } from "react";

function EditableCardComponent({
  action,
  onUpdating,
  title,
  description,
  id,
  closeEditing,
}) {
  const [ediatbleDescription, setEdiatbleDescription] = useState(
    description || ""
  );
  const [editableTitle, setEditableTitle] = useState(title || "");

  const inputTitleRef = useRef();

  useEffect(() => {
    inputTitleRef.current.focus();
  });

  return (
    <div className="ui fluid card" id="editable-card" key={id}>
      <div className="content">
        <div className="header">
          <div className="ui transparent fluid input">
            <input
              aria-label="title"
              id="editable-title"
              type="text"
              name="editable-title"
              placeholder="Title"
              value={editableTitle}
              ref={inputTitleRef}
              onChange={(e) => setEditableTitle(e.target.value)}
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
        <div className="ui two mini buttons">
          <button
            type="submit"
            className={`ui positive button ${editableTitle ? "" : "disabled"}`}
            onClick={() =>
              onUpdating
                ? (action(id, editableTitle, ediatbleDescription),
                  closeEditing(false))
                : action(editableTitle, ediatbleDescription)
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
