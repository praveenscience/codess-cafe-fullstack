// Import Express JS to use in our app.
const express = require("express");
// Create the Auth route.
const auth = express.Router();

// Get who's logged in?
auth.get("/", (req, res) => {
  res.json({ Session: req.session, ID: req.sessionID });
});
auth.post("/", (req, res) => {
  if (!req.body.User) {
    res.status(400).json("User not set!");
  } else {
    req.session.User = req.body.User;
    res.json({ Session: req.session, ID: req.sessionID });
  }
});

// Send the route back for importing in another file.
module.exports = auth;
