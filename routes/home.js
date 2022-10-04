const express = require("express");
const router = express.Router();
const homeCtrl = require("../controllers/home");
const upload = require("../middleware/upload");

router.get("/", homeCtrl.getIndex);
router.post("/", upload.single("myfile"), homeCtrl.postIndex);
router.post("/jpeg", homeCtrl.jpeg);
router.post("/webp", homeCtrl.webp);
router.delete("/deleteFile", homeCtrl.deleteFile);
router.delete("/deleteOldFiles", homeCtrl.deleteOldFiles);

module.exports = router;
