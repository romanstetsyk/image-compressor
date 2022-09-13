const express = require("express");
const router = express.Router();
const homeCrtl = require("../controllers/home");
const upload = require("../middleware/upload");

router.get("/", homeCrtl.getIndex);
router.post("/", upload.single("myfile"), homeCrtl.postIndex);
router.post("/optimize", homeCrtl.optimize);

module.exports = router;
