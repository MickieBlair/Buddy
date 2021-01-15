require('dotenv').config();
const bodyParser = require("body-parser");
const express = require("express");
const ejs = require("ejs");
const logger = require('morgan')
const https = require('https');
const http = require('http');
const createError = require('http-errors');

const app = express();


app.use(express.static("public"));

app.set('view engine', 'ejs');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(logger('dev'));

const db = require("./models");

// db.sequelize.sync();
// // drop the table if it already exists
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

//Data Routes
require("./routes/role.routes")(app);
require("./routes/user.routes")(app);



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
