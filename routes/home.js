const express = require("express");
const router = express.Router();
const homeCrtl = require("../controllers/home");
const upload = require("../middleware/upload");

router.get("/", homeCrtl.getIndex);
router.post("/", upload.single("myfile"), homeCrtl.postIndex);
router.post("/jpeg", homeCrtl.jpeg);
router.post("/webp", homeCrtl.webp);
router.delete("/deleteFile", homeCrtl.deleteFile);

module.exports = router;
