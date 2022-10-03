const fs = require("fs");
const path = require("path");

const deleteFile = async (req, res) => {
  const { filename, uuid } = req.body;
  const filepath = path.join(
    __dirname,
    "../",
    "../",
    "public",
    "tmp",
    uuid + path.extname(filename)
  );
  if (fs.existsSync(filepath)) {
    fs.unlink(filepath, err => {
      if (err) console.log("Error deleting file");
    });
  }
  res.json(filename);
};

module.exports = deleteFile;
