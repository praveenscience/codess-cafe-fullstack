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
  res.json(ToDos.filter(todo => !todo.Private));
});
// Get Something Specific.
todos.get("/:id", (req, res) => {
  if (typeof ToDos[req.params.id] === "undefined") {
    res.status(404).json("Not Found");
  } else {
    res.json(ToDos[req.params.id]);
  }
});
// Create a new Record
todos.post("/todos", (req, res) => {
  if (typeof req.body.Item === "undefined") {
    res.status(406).json("Please send Item.");
  } else {
    ToDos.push(req.body.Item);
    res.status(201).json(ToDos.length - 1);
  }
});
// Editing a Record.
todos.put("/:id", (req, res) => {
  if (typeof ToDos[req.params.id] === "undefined") {
    res.status(404).json("Not Found");
  } else {
    if (typeof req.body.Item === "undefined") {
      res.status(400).json("You have to specify new value using Item.");
    } else {
      ToDos[req.params.id] = req.body.Item;
      console.log(`Updated Record #${req.params.id} to ${req.body.Item}.`);
      res.status(202).json(ToDos[req.params.id]);
    }
  }
});
// Deleting a Record.
todos.delete("/:id", (req, res) => {
  if (typeof ToDos[req.params.id] === "undefined") {
    res.status(404).json("Not Found");
  } else {
    ToDos[req.params.id] = undefined;
    console.log(`Deleted Record #${req.params.id}.`);
    res.status(204).end();
  }
});

// Send the route back for importing in another file.
module.exports = todos;
