const fs = require("fs");
const path = require("path");

var express = require("express");

const { accounts, users } = require("./data.js");

var app = express();
app.use(express.static(__dirname + "/public"));
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.render("index", { title: "Account Summary", accounts: accounts });
});

//Code start
app.get("/profile", function (req, res) {
  res.render("profile", { user: users[0] });
});
//Code end

const accountRoutes = require("./routes/accounts.js");
const servicesRoutes = require("./routes/services.js");

app.use("/account", accountRoutes);
app.use("/services", servicesRoutes);

app.listen(3000, function () {
  console.log("Node server is running..");
});
