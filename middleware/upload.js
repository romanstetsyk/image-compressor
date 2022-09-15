const multer = require("multer");
const path = require("path");
const { nanoid } = require("nanoid");

const tmpDir = path.join(__dirname, "../", "public", "tmp");

const multerConfig = multer.diskStorage({
  destination: tmpDir,
  filename: (req, file, cb) => {
    const { uuid } = req.body;
    // File extension (e.g. ".jpg")
    let ext = path.extname(file.originalname);
    cb(null, uuid + ext);
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
