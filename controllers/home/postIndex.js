const path = require("path");
const ejs = require("ejs");
const sharp = require("sharp");
const Image = require("../../models/Image");

const postIndex = async (req, res) => {
  const quality = 80;

  const {
    filename,
    size,
    originalname: originalName,
    path: filepath,
  } = req.file;
  const { uuid } = req.body;
  const { name: originalNameWithoutExt, ext: originalExt } =
    path.parse(originalName);

  const newDbRecord = await Image.create({
    originalName,
    uuid,
  });

  if (!newDbRecord._id) throw new Error("Error adding image to db");

  const img = sharp(filepath);
  const jpeg = img
    .clone()
    .jpeg({
      quality: quality,
      progressive: true,
    })
    .withMetadata();

  const webp = img
    .clone()
    .webp({
      quality: quality,
    })
    .withMetadata();

  const { data: jpegData, info: jpegInfo } = await jpeg.toBuffer({
    resolveWithObject: true,
  });

  const { data: webpData, info: webpInfo } = await webp.toBuffer({
    resolveWithObject: true,
  });

  const link = await ejs.renderFile("views/_link.ejs", {
    originalname: originalNameWithoutExt,
    jpegBase64: "data:image/jpeg;base64," + jpegData.toString("base64"),
    webpBase64: "data:image/webp;base64," + webpData.toString("base64"),
    originalSize: size,
    newJpegSize: jpegInfo.size,
    newWebpSize: webpInfo.size,
    src: path.join("tmp", filename),
    quality,
  });

  res.json({
    quality,
    filename,
    originalExt,
    link,
    jpegBase64: "data:image/jpeg;base64," + jpegData.toString("base64"),
    webpBase64: "data:image/webp;base64," + webpData.toString("base64"),
    jpegInfo,
    webpInfo,
  });
};

module.exports = postIndex;
