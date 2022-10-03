const fs = require("fs");
const path = require("path");
const Image = require("../../models/Images");

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

  const image = await Image.findOneAndDelete({ uuid });
  if (!image._id) throw new Error("Error deleting the image");

  res.json(filename);
};

module.exports = deleteFile;
