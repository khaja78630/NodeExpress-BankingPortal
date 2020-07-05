const fs = require("fs");
const path = require("path");

var express = require("express");
var app = express();
app.use(express.static(__dirname + "/public"));
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

//Code start
const accountData = fs.readFileSync('src/json/accounts.json','UTF8');
const accounts= JSON.parse(accountData);
//Code end

//Code start
const userData = fs.readFileSync('src/json/users.json','UTF8');
const users= JSON.parse(userData);
//Code end


app.get("/", function (req, res) {
  res.render("index", { title: "Account Summary", accounts : accounts});
});

app.get('/savings',function(req,res){
  res.render("account", { account : accounts.savings });
});


//code starts
app.get('/checking',function(req,res){
  res.render("account", { account : accounts.checking });
});

app.get('/credit',function(req,res){
  res.render("account", { account : accounts.credit });
});

//code end


//Code start
app.get('/profile',function(req,res){
  res.render("profile", { user : users[0] });
});
//Code end



app.listen(3000, function () {
  console.log("Node server is running..");
});
