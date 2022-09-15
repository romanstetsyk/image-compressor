const path = require("path");
const ejs = require("ejs");
const sharp = require("sharp");
const fs = require("fs/promises");

const postIndex = async (req, res) => {
  const quality = 1;

  console.log(req.file);
  console.log(req.body);

  const { filename, size, originalname, path: filepath } = req.file;
  const { name: originalNameWithoutExt, ext: originalExt } =
    path.parse(originalname);

  const img = sharp(filepath);
  const jpeg = img
    .clone()
    .jpeg({
      quality: quality,
      progressive: true,
    })
    .withMetadata();

  const { data: jpegData, info: jpegInfo } = await jpeg.toBuffer({
    resolveWithObject: true,
  });

  const link = await ejs.renderFile("views/_link.ejs", {
    originalname,
    data64: "data:image/jpeg;base64," + jpegData.toString("base64"),
    originalSize: size,
    newSize: jpegInfo.size,
    src: path.join("tmp", filename),
    quality,
  });

  res.json({
    quality,
    filename,
    originalExt,
    link,
    jpegBase64: "data:image/jpeg;base64," + jpegData.toString("base64"),
    jpegInfo,
  });
};

module.exports = postIndex;
