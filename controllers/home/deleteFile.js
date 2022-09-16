const fs = require("fs");
const path = require("path");

const deleteFile = async (req, res) => {
  const { filename } = req.body;
  const filepath = path.join(
    __dirname,
    "../",
    "../",
    "public",
    "tmp",
    filename
  );
  if (fs.existsSync(filepath)) {
    fs.unlink(filepath, err => {
      if (err) console.log("Error deleting file");
    });
  }
  res.json(filename);
};

module.exports = deleteFile;
