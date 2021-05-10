import React from "react";
import { render, screen } from "@testing-library/react";
import TodosComponent from "./TodosComponent";

test("Component loads and display available todos", async () => {
  render(<TodosComponent />);
  const availableTodos = await screen.findAllByTitle(/title$/i);
  expect(availableTodos).toHaveLength(2);
});
