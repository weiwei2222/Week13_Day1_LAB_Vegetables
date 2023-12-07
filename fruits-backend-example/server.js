const express = require("express");
const app = express();
const fruits = require("./models/fruits.js");
const vegetables = require("./models/vegetables.js");
const jsxViewEngine = require("jsx-view-engine");

app.set("view engine", "jsx");
app.set("views", "./views");
app.engine("jsx", jsxViewEngine());

// ================ Middleware ================
//
app.use((req, res, next) => {
  console.log("Middleware: I run for all routes");
  next();
});

//near the top, around other app.use() calls
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send(
    `this is my <a href='/fruits/'>fruits</a> and <a href='/vegetables/'>Vegetables</a> root route.`
  );
});

app.get("/fruits/", (req, res) => {
  res.render("fruits/Index", { fruits: fruits });
});

app.get("/fruits/new", (req, res) => {
  res.render("fruits/New");
});

app.post("/fruits", (req, res) => {
  if (req.body.readyToEat === "on") {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }
  fruits.push(req.body);
  res.redirect("/fruits");
});

app.get("/fruits/:indexOfFruitsArray", (req, res) => {
  res.render("fruits/Show", {
    fruit: fruits[req.params.indexOfFruitsArray],
  });
});

// --------------vegetables -----------
app.get("/vegetables/", (req, res) => {
  res.render("vegetables/Index", { vegetables: vegetables });
});

app.get("/vegetables/new", (req, res) => {
  res.render("vegetables/New");
});

app.post("/vegetables", (req, res) => {
  if (req.body.readyToEat === "on") {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }
  vegetables.push(req.body);
  res.redirect("/vegetables");
});

app.get("/vegetables/:indexOfVegetablesArray", (req, res) => {
  res.render("vegetables/Show", {
    vegetable: vegetables[req.params.indexOfVegetablesArray],
  });
});

// -------------------------
app.listen(3000, () => {
  console.log("listening");
});
