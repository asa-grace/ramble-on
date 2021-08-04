// Requiring npm packages
const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const helpers = require("./utils/helpers");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

//secret variable is stored in the .env file which has been required above
const sess = {
  secret: process.env.secret,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

// Set Handlebars
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Built in Express.js middleware function that can take all the contents of a folder and serve them as static assets
app.use(express.static(path.join(__dirname, "public")));

// turn on routes
app.use(require("./controllers/"));

// turn on connection to db and server
sequelize.sync({ force: false, useNewUrlParser: true }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
