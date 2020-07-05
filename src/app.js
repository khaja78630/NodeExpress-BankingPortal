const fs = require("fs");
const path = require("path");

var express = require("express");
var app = express();
app.use(express.static(__dirname + "/public"));
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("index", { title: "Hey", message: "Hello there!" });
});

app.listen(3000, function () {
  console.log("Node server is running..");
});
