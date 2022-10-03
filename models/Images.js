const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema(
  {
    originalName: {
      type: String,
      required: true,
    },
    uuid: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("Image", ImageSchema);
