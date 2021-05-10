import React from "react";
import TodosComponent from "../TodosComponent";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";

test("Component loads and display available todos", async () => {
  render(<TodosComponent />);
  const availableTodos = await screen.findAllByTitle(/title$/i);
  expect(availableTodos).toHaveLength(2);
});

test("Add Icon click opens todo create form", async () => {
  render(<TodosComponent />);
  const promise = Promise.resolve();
  fireEvent.click(screen.getByLabelText(/add/));
  await waitFor(() =>
    expect(screen.findByPlaceholderText(/Title/)).toBeTruthy()
  );
  await act(() => promise);
});

test("Add Icon 'enter key' opens todo create form", async () => {
  render(<TodosComponent />);
  const promise = Promise.resolve();
  const addicon = screen.getByLabelText(/add/);
  addicon.focus();
  fireEvent.keyDown(addicon, {
    key: "Enter",
    code: 13,
    charCode: 13,
    keyCode: 13,
  });
  await waitFor(() => {
    act(() => expect(screen.getByPlaceholderText(/Title/)).toBeTruthy());
    expect(screen.getByPlaceholderText(/Title/)).toBeTruthy();
  });
  await act(() => promise);
});
