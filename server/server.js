// Import Express JS to use in our app.
const express = require("express");
// Importing Morgan for who knows what?
const morgan = require("morgan");
// We need to create an instance of this Express JS.
const server = express();
// Define a port for our backend.
const port = 5000;
// Import the ToDos route.
const todos = require("./routes/todos");

// Create a default GET
server.get("/", (req, res) => {
  res.json("Hello Codess Cafe!");
});

// Sample ToDo App
server.use(morgan("dev"));
// Read the POST Data
server.use(express.json());
// Bring in the ToDos.
server.use("/todos", todos);

// Make the server listen to this port.
server.listen(port, () => {
  console.log(`Server Started on Port ${port}.`);
});
