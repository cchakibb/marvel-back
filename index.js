require("dotenv").config();
const express = require("express");
const server = express();
const formidableMiddleware = require("express-formidable");
server.use(formidableMiddleware());

const axios = require("axios");
const cors = require("cors");
server.use(cors());

const uid2 = require("uid2");
const md5 = require("md5");

const publicKey = process.env.PUBLIC_KEY;
const privateKey = process.env.PRIVE_KEY;
const ts = uid2(10);
const hash = md5(ts + privateKey + publicKey);
console.log("ts = ", ts);
console.log("hash = ", hash);

server.get("/", async (req, res) => {
  const response = await axios.get(
    `https://gateway.marvel.com:443/v1/public/characters?limit=100&ts=${ts}&apikey=${publicKey}&hash=${hash}`
  );
  console.log(response.data);

  res.json(response.data);
});

server.get("/characters", async (req, res) => {
  const response = await axios.get(
    `https://gateway.marvel.com:443/v1/public/characters?limit=100&ts=${ts}&apikey=${publicKey}&hash=${hash}`
  );
  console.log(response.data);

  res.json(response.data);
});

server.get("/comics", async (req, res) => {
  const response = await axios.get(
    `https://gateway.marvel.com:443/v1/public/comics?orderBy=title&limit=100&ts=${ts}&apikey=${publicKey}&hash=${hash}`
  );
  console.log(response.data);
  res.json(response.data);
});

server.get("/comic/:id", async (req, res) => {
  const id = req.params.id;
  const response = await axios.get(
    `https://gateway.marvel.com:443/v1/public/characters/${id}/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}`
  );
  console.log(response.data);
  res.json(response.data);
});

server.all("*", function(req, res) {
  res.json({ message: "all routes" });
});

server.listen(process.env.PORT, () => {
  console.log("Server has started");
});
