require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const app = express();
const Fruit = require("./models/fruit");
const Vegetable = require("./models/vegetable");
const jsxViewEngine = require("jsx-view-engine");

app.set("view engine", "jsx");
app.set("views", "./views");
app.engine("jsx", jsxViewEngine());

const mongoURI = process.env.MONGO_URI;
const db = mongoose.connetction;

mongoose.connect(mongoURI);
mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});

// ================ Middleware ================
//
app.use((req, res, next) => {
  console.log("Middleware: I run for all routes");
  next();
});

//near the top, around other app.use() calls
app.use(express.urlencoded({ extended: false }));

app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.send(
    `this is my <a href='/fruits/'>fruits</a> and <a href='/vegetables/'>Vegetables</a> root route.`
  );
});

app.get("/fruits/", async (req, res) => {
  try {
    const foundFruits = await Fruit.find({});
    res.status(200).render("fruits/Index", { fruits: foundFruits });
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("/fruits/new", (req, res) => {
  res.render("fruits/New");
});

// delete fruit
app.delete("/fruits/:id", async (req, res) => {
  try {
    const deletedFruit = await Fruit.findByIdAndDelete(req.params.id);
    res.status(200).redirect("/fruits");
  } catch (err) {
    res.status(400).send(err);
  }
});

// update
app.put("/fruits/:id", async (req, res) => {
  if (req.body.readyToEat === "on") {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }

  try {
    const updatedFruit = await Fruit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).redirect(`/fruits/${req.params.id}`);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.post("/fruits", async (req, res) => {
  if (req.body.readyToEat === "on") {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }

  try {
    const createdFruit = await Fruit.create(req.body);
    res.status(200).redirect("/fruits");
  } catch (err) {
    res.status(400).send(err);
  }
});

// edit fruit
app.get("/fruits/:id/edit", async (req, res) => {
  try {
    const foundFruit = await Fruit.findById(req.params.id);
    res.status(200).render("fruits/Edit", { fruit: foundFruit });
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("/fruits/:id", async (req, res) => {
  try {
    const foundFruit = await Fruit.findById(req.params.id);
    res.render("fruits/Show", {
      fruit: foundFruit,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

// --------------vegetables -----------
app.get("/vegetables/", async (req, res) => {
  try {
    const foundVegetables = await Vegetable.find({});
    res.render("vegetables/Index", { vegetables: foundVegetables });
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("/vegetables/new", (req, res) => {
  res.render("vegetables/New");
});

// update
app.put("/vegetables/:id", async (req, res) => {
  if (req.body.readyToEat === "on") {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }

  try {
    const updatedVegetable = await Fruit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).redirect(`/vegetables/${req.params.id}`);
  } catch (err) {
    res.status(400).send(err);
  }
});

// delete vegetable
app.delete("/vegetables/:id", async (req, res) => {
  try {
    const deletedVegetable = await Vegetable.findByIdAndDelete(req.params.id);
    res.status(200).redirect("/vegetables");
  } catch (err) {
    res.status(400).send(err);
  }
});

app.post("/vegetables", async (req, res) => {
  if (req.body.readyToEat === "on") {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }

  try {
    const createdVegetable = await Vegetable.create(req.body);
    res.status(200).redirect("/vegetables");
  } catch (err) {
    res.status(400).send(err);
  }
});

// edit vegetable
app.get("/vegetables/:id/edit", async (req, res) => {
  try {
    const foundVegetable = await Vegetable.findById(req.params.id);
    res.status(200).render("vegetables/Edit", { vegetable: foundVegetable });
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("/vegetables/:id", async (req, res) => {
  try {
    const foundVegetable = await Vegetable.findById(req.params.id);
    res.render("vegetables/Show", {
      vegetable: foundVegetable,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

// -------------------------
app.listen(3000, () => {
  console.log("listening");
});
