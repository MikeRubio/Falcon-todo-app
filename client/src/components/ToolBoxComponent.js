import React, { useState, useEffect } from "react";
import api from "../Api/api";
function ToolBoxComponent({ setTodoAdded }) {
  const [title, setTtitle] = useState("");
  const [description, setdescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setSubmitting(title.length > 0);
  }, [title]);

  const createTodo = async () => {
    if (title) {
      const result = await api.createTodo({
        title,
        description,
      });
      if (result.status === 200) {
        setTtitle("");
        setdescription("");
        setTodoAdded(true);
      }
    }
  };

  const onSubmitHandler = (ev) => {
    ev.preventDefault();
    createTodo();
  };

  return (
    <form className="ui form" onSubmit={onSubmitHandler}>
      <div className="two fields">
        <div className="field">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTtitle(e.target.value)}
          ></input>
        </div>
        <div className="field">
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
          ></input>
        </div>
      </div>
      <button
        className={`ui button mini ${submitting ? "" : "disabled"}`}
        type="submit"
      >
        Add
      </button>
    </form>
  );
}

export default ToolBoxComponent;
