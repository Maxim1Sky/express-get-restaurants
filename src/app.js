const express = require("express");
const app = express();
const Restaurant = require("../models/index");
const db = require("../db/connection");

app.use(express.json());
app.use(express.urlencoded());

//TODO: Create your GET Request Route Below:

app.get("/restaurants", async (req, res) => {
  const allRest = await Restaurant.findAll();
  res.json(allRest);
});

app.get("/restaurants/:id", async (req, res) => {
  const theId = req.params.id;
  const theRecord = await Restaurant.findByPk(theId);
  res.json(theRecord);
});

module.exports = app;
