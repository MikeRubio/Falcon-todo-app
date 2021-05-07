import React, { useState } from "react";

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
              value={editableTitle}
              placeholder="Title"
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
              value={ediatbleDescription}
              placeholder="Description"
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
            className={`ui positive button active ${
              editableTitle ? "" : "disabled"
            }`}
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
