const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const app = express();
const path = require("path");
// const passport = require("passport");
// const localStrategy = require("passport-local").Strategy;
// const bcrypt = require("bcrypt");
const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  passport: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  //need to create a database(rumbleon-login)
});

//this dirc will include style
const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));

// for handlebars
app.set("view engine", "hbs");

//conection
db.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("mySql is connected....");
  }
});

const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(3001, () => {
  console.log("server started on local port 3001");
});
