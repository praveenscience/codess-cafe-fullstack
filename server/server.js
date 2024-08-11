// Import Express JS to use in our app.
const express = require("express");
// Importing Morgan for who knows what?
const morgan = require("morgan");
// We need to create an instance of this Express JS.
const server = express();
// Define a port for our backend.
const port = 5000;

// Create a default GET
server.get("/", (req, res) => {
  res.json("Hello Codess Cafe!");
});

// Sample ToDo App
server.use(morgan("dev"));
// Read the POST Data
server.use(express.json());
// Simple Sample Database
const ToDos = ["Running", "Coding", "Reading", "Cooking", "Journalling"];
// Get Everything.
server.get("/todos", (req, res) => {
  res.json(ToDos);
});
// Get Something Specific.
server.get("/todos/:id", (req, res) => {
  if (typeof ToDos[req.params.id] === "undefined") {
    res.status(404).json("Not Found");
  } else {
    res.json(ToDos[req.params.id]);
  }
});
// Create a new Record
server.post("/todos", (req, res) => {
  if (typeof req.body.Item === "undefined") {
    res.status(406).json("Please send Item.");
  } else {
    ToDos.push(req.body.Item);
    res.status(201).json(ToDos.length - 1);
  }
});
// Editing a Record.
server.put("/todos/:id", (req, res) => {
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
server.delete("/todos/:id", (req, res) => {
  if (typeof ToDos[req.params.id] === "undefined") {
    res.status(404).json("Not Found");
  } else {
    ToDos[req.params.id] = undefined;
    console.log(`Deleted Record #${req.params.id}.`);
    res.status(204).end();
  }
});

// Make the server listen to this port.
server.listen(port, () => {
  console.log(`Server Started on Port ${port}.`);
});
