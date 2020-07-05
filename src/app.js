const fs = require("fs");
const path = require("path");

var express = require("express");
var app = express();
app.use(express.static(__dirname + "/public"));
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

//Code start
const accountData = fs.readFileSync("src/json/accounts.json", "UTF8");
const accounts = JSON.parse(accountData);
//Code end

//Code start
const userData = fs.readFileSync("src/json/users.json", "UTF8");
const users = JSON.parse(userData);
//Code end

app.get("/", function (req, res) {
  res.render("index", { title: "Account Summary", accounts: accounts });
});

app.get("/savings", function (req, res) {
  res.render("account", { account: accounts.savings });
});

//code starts
app.get("/checking", function (req, res) {
  res.render("account", { account: accounts.checking });
});

app.get("/credit", function (req, res) {
  res.render("account", { account: accounts.credit });
});

//code end

//Code start
app.get("/profile", function (req, res) {
  res.render("profile", { user: users[0] });
});
//Code end

app.get("/transfer", (req, res) => res.render("transfer"));

app.post("/transfer", (req, res) => {
  accounts[req.body.from].balance -= req.body.amount;
  accounts[req.body.to].balance += parseInt(req.body.amount, 10);
  let accountsJSON = JSON.stringify(accounts, null, 4);
  fs.writeFileSync(
    path.join(__dirname, "json", "accounts.json"),
    accountsJSON,
    "utf8"
  );
  res.render("transfer", { message: "Transfer Completed" });
});

app.get("/payment", (req, res) =>
  res.render("payment", { account: accounts.credit })
);

app.post("/payment", (req, res) => {
  accounts.credit.balance -= req.body.amount;
  accounts.credit.available += parseInt(req.body.amount);
  let accountsJSON = JSON.stringify(accounts, null, 4);
  fs.writeFileSync(
    path.join(__dirname, "json", "accounts.json"),
    accountsJSON,
    "utf8"
  );
  res.render("payment", {
    message: "Payment Successful",
    account: accounts.credit,
  });
});

app.listen(3000, function () {
  console.log("Node server is running..");
});
