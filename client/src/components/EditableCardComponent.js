import React, { useState } from "react";

function EditableCardComponent({
  action,
  onUpdating,
  title,
  description,
  id,
  closeEditing,
}) {
  const [ediatbleDescription, setEdiatbleDescription] = useState(description);
  const [editableTitle, setEditableTitle] = useState(title);

  return (
    <div className="ui fluid card" id="editable-card" key={id}>
      <div className="content">
        <div className="header">
          <div className="ui transparent input">
            <input
              type="text"
              name="editable-title"
              value={editableTitle}
              placeholder="Title"
              onChange={(e) => setEditableTitle(e.target.value)}
            />
          </div>
        </div>
        <div className="description">
          <div className="ui transparent input">
            <input
              type="text"
              name="editable-description"
              value={ediatbleDescription}
              placeholder="Description"
              onChange={(e) => setEdiatbleDescription(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="extra content">
        <div className="ui two mini buttons">
          <button
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
