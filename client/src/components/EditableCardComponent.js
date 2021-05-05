import React, { useState } from "react";
import api from "../Api/api";

function EditableCardComponent({ elm, setEditing, setTodoAdded }) {
  const [ediatbleDescription, setEdiatbleDescription] = useState(
    elm.description
  );
  const [editableTitle, setEditableTitle] = useState(elm.title);

  const updateElement = async (id) => {
    const result = await api.updateTodo(id, {
      title: editableTitle,
      description: ediatbleDescription,
    });
    if (result.status === 200) {
      setTodoAdded(true);
      setEditing("");
    }
  };

  return (
    <div className="ui fluid card" id="editable-card" key={elm.id}>
      <div className="content">
        <div className="header">
          <div className="ui transparent input">
            <input
              type="text"
              name="editable-title"
              value={editableTitle}
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
          <div className="ui basic red button" onClick={() => setEditing("")}>
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditableCardComponent;
