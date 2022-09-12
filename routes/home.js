const express = require("express");
const router = express.Router();
const homeCrtl = require("../controllers/home");

router.get("/", homeCrtl.getIndex);

module.exports = router;
