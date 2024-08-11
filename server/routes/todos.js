// Import Express JS to use in our app.
const express = require("express");
// Create the ToDos route.
const todos = express.Router();
// Simple Sample Database
const ToDos = [
  {
    User: "Praveen",
    Item: "Coding",
    CreatedAt: Date.now(),
    UpdatedAt: Date.now(),
    Private: false
  },
  {
    User: "Tabaswini",
    Item: "Running",
    CreatedAt: Date.now(),
    UpdatedAt: Date.now(),
    Private: true
  },
  {
    User: "Akansha",
    Item: "Reading",
    CreatedAt: Date.now(),
    UpdatedAt: Date.now(),
    Private: false
  },
  {
    User: "Praveen",
    Item: "Cooking",
    CreatedAt: Date.now(),
    UpdatedAt: Date.now(),
    Private: true
  },
  {
    User: "Tabaswini",
    Item: "Journalling",
    CreatedAt: Date.now(),
    UpdatedAt: Date.now(),
    Private: false
  }
];
// Get Everything.
todos.get("/", (req, res) => {
  res.json(
    ToDos.filter(todo => !todo.Private || todo.User === req.session.User)
  );
});
// Get Something Specific.
todos.get("/:id", (req, res) => {
  if (typeof ToDos[req.params.id] === "undefined") {
    res.status(404).json("Not Found");
  } else {
    const ToDo = ToDos[req.params.id];
    if (
      (ToDo.Private === true && ToDo.User === req.session.User) ||
      !ToDo.Private
    ) {
      res.json(ToDos[req.params.id]);
    } else {
      res.status(401).json("(private ToDo)");
    }
  }
});
// Create a new Record
todos.post("/", (req, res) => {
  const NoItem = typeof req.body.Item === "undefined";
  const NotLoggedIn = !req.session.User;
  if (NotLoggedIn) {
    res.status(406).json("Please Login.");
  } else {
    const User = req.session.User;
    if (NoItem) {
      res.status(406).json("Please send Item.");
    } else {
      const Item = req.body.Item;
      ToDos.push({
        User,
        Item,
        CreatedAt: Date.now(),
        UpdatedAt: Date.now(),
        Private: !!req.body.Private
      });
      res.status(201).json(ToDos.length - 1);
    }
  }
});
// Editing a Record.
todos.put("/:id", (req, res) => {
  if (typeof ToDos[req.params.id] === "undefined") {
    res.status(404).json("Not Found");
  } else {
    const ToDo = ToDos[req.params.id];
    if (ToDo.User !== req.session.User) {
      res.status(403).json("Please login and edit only your ToDos!");
    } else {
      if (typeof req.body.Item === "undefined") {
        res.status(400).json("You have to specify new value using Item.");
      } else {
        ToDos[req.params.id].Item = req.body.Item;
        ToDos[req.params.id].UpdatedAt = Date.now();
        res.status(202).json(ToDos[req.params.id]);
      }
    }
  }
});
// Deleting a Record.
todos.delete("/:id", (req, res) => {
  if (typeof ToDos[req.params.id] === "undefined") {
    res.status(404).json("Not Found");
  } else {
    const ToDo = ToDos[req.params.id];
    if (ToDo.User !== req.session.User) {
      res.status(403).json("Please login and delete only your ToDos!");
    } else {
      ToDos[req.params.id] = undefined;
      console.log(`Deleted Record #${req.params.id}.`);
      res.status(204).end();
    }
  }
});

// Send the route back for importing in another file.
module.exports = todos;
