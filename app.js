require('dotenv').config();
const bodyParser = require("body-parser");
const express = require("express");
const ejs = require("ejs");
const https = require('https');
const http = require('http');

const app = express();


app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));


// Base
app.get("/", function(req, res) {
  res.render("home");
});

// Login in
app.get("/login", function(req, res) {
  res.render("login");
});

//Register
app.get("/register", function(req, res) {
  res.render("register");
});

//Main Room
app.get("/main", function(req, res) {
  res.render("main");
});

//Breakout Room
app.get("/breakout", function(req, res) {
  res.render("breakout");
});

//admin
app.get("/admin", function(req, res) {
  res.render("admin");
});

const port = process.env.PORT || 3000
app.listen(port, function() {
  console.log(`Client started on port ${port}`);
});
