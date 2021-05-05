import React from "react";
import "./CardComponent.css";
function CardComponent({ todoList }) {
  return (
    <div className="ui segments">
      {todoList.map((elm) => {
        return (
          <div className="ui fluid card" key={elm.id}>
            <div className="content">
              <i className="right floated circular red trash alternate outline icon"></i>
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
    </div>
  );
}

export default CardComponent;
