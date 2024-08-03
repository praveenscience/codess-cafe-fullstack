// Import Express JS to use in our app.
const express = require("express");
// We need to create an instance of this Express JS.
const server = express();
// Define a port for our backend.
const port = 5000;

// Create a default GET
server.get("/", (req, res) => {
  res.json("Hello Codess Cafe!");
});

// Make the server listen to this port.
server.listen(port, () => {
  console.log(`Server Started on Port ${port}.`);
});
