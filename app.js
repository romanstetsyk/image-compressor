const express = require("express");
const logger = require("morgan");
// import routers
const homeRouter = require("./routes/home");

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Create app instanse
const app = express();

// Logger
app.use(logger("dev"));

//Using EJS for views
app.set("view engine", "ejs");

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Static Folder
app.use(express.static("public"));

// Routes
app.use("/", homeRouter);

// 404 handler
app.use((_, res) => {
  res.status(404).json({ message: "Not found" });
});

// Error handler
app.use((err, _, res, __) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
