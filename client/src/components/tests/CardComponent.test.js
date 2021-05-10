import "@testing-library/jest-dom/extend-expect";
import React from "react";
import CardComponent from "../CardComponent";
import { render, screen } from "@testing-library/react";

const filteredTodoList = [
  {
    id: "01",
    title: "Some Test Tile",
    description: "Some Test Desc",
    priority: "0",
    completed: false,
    project: null,
  },
  {
    id: "02",
    title: "Other Test Tile",
    description: "Other Test Desc",
    priority: "0",
    completed: true,
    project: null,
  },
];

test("should be able to interact with action btn", () => {
  render(<CardComponent filteredTodoList={filteredTodoList} />);
  const completeIcon = screen.queryAllByTitle(/Complete/);
  expect(completeIcon.length).toEqual(1);

  const UndoIcon = screen.queryAllByTitle(/Complete/);
  expect(UndoIcon.length).toEqual(1);

  const deleteIcon = screen.queryAllByTitle(/Delete/);
  expect(deleteIcon.length).toEqual(2);

  const editIcon = screen.queryAllByTitle(/Edit/);
  expect(editIcon.length).toEqual(2);
});
