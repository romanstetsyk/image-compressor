const fs = require("fs");
const path = require("path");
const Image = require("../../models/Image");

const deleteOldFiles = async (req, res) => {
  try {
    if (
      req.get("Authorization").split(" ")[1] !==
      process.env.DELETE_OLD_FILES_KEY
    ) {
      throw new Error("Not authorized");
    }

    const images = await Image.find({
      // files created earlier than 20 minutes ago
      // the shortest interval the task can run in Github Actions is every 5 min
      createdAt: { $lt: new Date(Date.now() - 20 * 60 * 1000) },
    });
    images.forEach(async img => {
      // Delete from fs
      const filepath = path.join(
        __dirname,
        "../",
        "../",
        "public",
        "tmp",
        img.uuid + path.extname(img.originalName)
      );

      if (fs.existsSync(filepath)) {
        fs.unlink(filepath, err => {
          if (err) console.log("Error deleting file");
        });
      }

      // Delete from db
      const image = await Image.findOneAndDelete({ uuid: img.uuid });
      if (!image?._id) throw new Error("Error deleting the image");

      console.log(`Deleted ${img.uuid}`);
    });

    res.json("Success");
  } catch (error) {
    res.status(500).json("Error");
  }
};

module.exports = deleteOldFiles;
