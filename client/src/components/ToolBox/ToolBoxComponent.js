import React, { useState, useEffect } from "react";

function ToolBoxComponent({ setTodoList, todoList }) {
  const [title, setTtitle] = useState("");
  const [desc, setDesc] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setSubmitting(title.length > 0);
  }, [title]);

  const onSubmitHandler = (ev) => {
    ev.preventDefault();
    setTodoList([
      ...todoList,
      {
        title,
        desc,
      },
    ]);
    setTtitle("");
    setDesc("");
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
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
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
