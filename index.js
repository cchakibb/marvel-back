const express = require("express");
const formidableMiddleware = require("express-formidable");
const server = express();
server.use(formidableMiddleware());

server.get("/", (req, res) => {
  res.json({ message: "Hi" });
});

server.all("*", function(req, res) {
  res.json({ message: "all routes" });
});

server.listen(3100, () => {
  console.log("Server has started");
});
