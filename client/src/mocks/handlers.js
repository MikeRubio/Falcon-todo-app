import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:1337/tasks", (req, res, ctx) => {
    return res(
      ctx.json([
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
      ])
    );
  }),
  rest.post("http://localhost:1337/tasks", (req, res, ctx) => {
    return res(
      ctx.json({
        id: "03",
        title: "Some New Test Tile",
        description: "Some New Test Desc",
        priority: "0",
        completed: false,
        project: null,
      })
    );
  }),
  rest.delete("http://localhost:1337/tasks/01", (req, res, ctx) => {
    return res(
      ctx.json({
        id: "01",
        title: "Some Test Tile",
        description: "Some Test Desc",
        priority: "0",
        completed: false,
        project: null,
      })
    );
  }),
  rest.patch("http://localhost:1337/tasks/01", (req, res, ctx) => {
    return res(
      ctx.json({
        id: "01",
        title: "Some updated Test Tile",
        description: "Some Test Desc",
        priority: "0",
        completed: false,
        project: null,
      })
    );
  }),
];
