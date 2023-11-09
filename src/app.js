const express = require("express");
const app = express();
const Restaurant = require("../models/index");
const db = require("../db/connection");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.post("/restaurants", async (req, res) => {
  console.log(req.body);

  const newRest = await Restaurant.create(req.body);
  //res.send(newRest);
  const newDatabase = await Restaurant.findAll();
  res.json(newDatabase);

  console.log("Post works!");
});

app.put("/restaurants/:id", async (req, res) => {
  const theId = req.params.id;
  const result = await Restaurant.update(req.body, { where: { id: theId } });
  res.json(result);
});

app.delete("/restaurants/:id", async (req, res) => {
  const theId = req.params.id;
  const result = await Restaurant.destroy({ where: { id: theId } });

  if (result === 1) {
    res.send("Successfully deleted the record!");
  } else {
    res.send("No such record found");
  }
});

module.exports = app;
