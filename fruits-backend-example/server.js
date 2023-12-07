const express = require("express");
const app = express();
const fruits = require("./models/fruits.js");
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
  res.send("this is my fruits and Vegetables root route");
});

app.get("/fruits/", (req, res) => {
  res.render("Index", { fruits: fruits });
});

app.get("/fruits/new", (req, res) => {
  res.render("New");
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
  res.render("Show", {
    fruit: fruits[req.params.indexOfFruitsArray],
  });
});

app.listen(3000, () => {
  console.log("listening");
});
