const sharp = require("sharp");
const path = require("path");
const fs = require("fs/promises");

const jpeg = async (req, res) => {
  const { quality, filename } = req.body;
  console.log(quality, filename);

  const pathh = path.join(__dirname, "../../", "public", "tmp", filename);
  console.log(pathh);

  const img = sharp(pathh);
  const jpeg = img
    .clone()
    .jpeg({
      quality: Number(quality),
      progressive: true,
    })
    .withMetadata();

  // const webp = img
  //   .clone()
  //   .webp({
  //     quality: Number(quality),
  //   })
  //   .withMetadata();
  const { data: jpegData, info: jpegInfo } = await jpeg.toBuffer({
    resolveWithObject: true,
  });
  // const { data: webpData, info: webpInfo } = await webp.toBuffer({
  //   resolveWithObject: true,
  // });
  res.json({
    quality,
    jpegBase64: "data:image/jpeg;base64," + jpegData.toString("base64"),
    // webpBase64: "data:image/webp;base64," + webpData.toString("base64"),
    jpegInfo,
    // webpInfo,
  });
};

module.exports = jpeg;
