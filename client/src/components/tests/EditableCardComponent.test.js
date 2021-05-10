import React from "react";
import EditableCardComponent from "../EditableCardComponent";
import userEvent from "@testing-library/user-event";

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test("Should be able to create todo", async () => {
  render(<EditableCardComponent onUpdating={false} />);
  const titleElm = screen.queryByPlaceholderText(/Title/i);
  const descElm = screen.queryByPlaceholderText(/Description/i);

  userEvent.type(titleElm, "Some New Test Tile");
  expect(titleElm.value).toBe("Some New Test Tile");

  userEvent.type(descElm, "Some New Test Desc");
  expect(descElm.value).toBe("Some New Test Desc");

  expect(screen.getByText(/Create/)).toBeInTheDocument();
});

test("Should be able to edit existing todo", async () => {
  render(
    <EditableCardComponent
      onUpdating={true}
      id="01"
      title="existing title"
      description="existing description"
    />
  );
  const titleElm = screen.queryByPlaceholderText(/Title/i);
  const descElm = screen.queryByPlaceholderText(/Description/i);

  expect(titleElm.value).toBe("existing title");
  userEvent.type(titleElm, " with new part");
  expect(titleElm.value).toBe("existing title with new part");

  expect(descElm.value).toBe("existing description");
  descElm.value = "";
  userEvent.type(descElm, "New Test Desc");
  expect(descElm.value).toBe("New Test Desc");

  expect(screen.getByText(/Edit/)).toBeInTheDocument();
});
