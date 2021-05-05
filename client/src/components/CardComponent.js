import React from "react";
import api from "../Api/api";
import "./CardComponent.css";

function CardComponent({ todoList, setTodoAdded }) {
  const deleteElement = async (elm) => {
    const result = await api.deleteTodo(elm.id);
    if (result.status === 200) {
      setTodoAdded(true);
    }
  };

  return (
    <React.Fragment>
      {todoList.map((elm) => {
        return (
          <div className="ui fluid card" key={elm.id}>
            <div className="content">
              <i
                className="right floated circular red trash alternate outline icon"
                onClick={() => deleteElement(elm)}
              ></i>
              <i className="right floated circular blue edit outline icon Change"></i>
              <i className="right floated circular teal flag checkered icon"></i>
              <div className="header">{elm.title}</div>
              <div className="description">
                <p>{elm.description}</p>
              </div>
            </div>
            <div className="extra content"></div>
          </div>
        );
      })}
    </React.Fragment>
  );
}

export default CardComponent;
