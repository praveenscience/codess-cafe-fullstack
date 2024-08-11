// Import Express JS to use in our app.
const express = require("express");
// Importing Morgan for Dev Logs.
const morgan = require("morgan");
// Import Sessions Support.
const session = require("express-session");
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

// Show the dev logs.
server.use(morgan("dev"));
// Session Config
const sessionConfig = {
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: true,
  cookie: {}
};
if (server.get("env") === "production") {
  server.set("trust proxy", 1); // trust first proxy
  sessionConfig.cookie.secure = true; // serve secure cookies
}
// Enable sessions!
server.use(session(sessionConfig));
// Read the POST Data
server.use(express.json());
// Bring in the ToDos.
server.use("/todos", todos);

// Make the server listen to this port.
server.listen(port, () => {
  console.log(`Server Started on Port ${port}.`);
});
