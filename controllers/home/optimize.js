const sharp = require("sharp");
const path = require("path");
const fs = require("fs/promises");

const optimize = async (req, res) => {
  const { quality, dataId } = req.body;
  console.log(quality, dataId);

  const pathh = path.join(__dirname, "../../", "public", "tmp", dataId);
  console.log(pathh);

  const img = sharp(pathh);
  const jpeg = img.clone().jpeg({
    quality: Number(quality),
    progressive: true,
  });
  const webp = img.clone().webp({
    quality: Number(quality),
  });
  const { data: jpegData, info: jpegInfo } = await jpeg.toBuffer({
    resolveWithObject: true,
  });
  const { data: webpData, info: webpInfo } = await webp.toBuffer({
    resolveWithObject: true,
  });
  res.json({
    jpegBase64: "data:image/jpeg;base64," + jpegData.toString("base64"),
    webpBase64: "data:image/webp;base64," + webpData.toString("base64"),
    jpegInfo,
    webpInfo,
  });
};

module.exports = optimize;
