const mongoose = require("mongoose");
const cron = require("node-cron");
const path = require("path");
const fs = require("fs");
const Image = require("./models/Images");

const app = require("./app");
const Images = require("./models/Images");

const { MONGODB_URI, PORT = 3001 } = process.env;

mongoose
  .connect(MONGODB_URI)
  .then(data => console.log(`MongoDB connected: ${data.connection.host}`))
  .then(() => app.listen(PORT))
  .then(() => console.log(`Server running on port ${PORT}`))
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });

const removeFileCron = async () => {
  const images = await Images.find({
    createdAt: { $lt: new Date(Date.now() - 30 * 60 * 1000) },
  });
  images.forEach(async obj => {
    // Delete from fs
    const filepath = path.join(
      __dirname,
      "public",
      "tmp",
      obj.uuid + path.extname(obj.originalName)
    );

    if (fs.existsSync(filepath)) {
      fs.unlink(filepath, err => {
        if (err) console.log("Error deleting file");
      });
    }

    // Delete from db
    const image = await Image.findOneAndDelete({ uuid: obj.uuid });
    if (!image?._id) throw new Error("Error deleting the image");

    console.log(`Deleted ${obj.uuid}`);
  });
};

cron.schedule("*/30 * * * *", () => removeFileCron());
