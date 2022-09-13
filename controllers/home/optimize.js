const sharp = require("sharp");
const path = require("path");
const fs = require("fs/promises");

const optimize = async (req, res) => {
  const { quality, dataId } = req.body;
  console.log(quality, dataId);

  const pathh = path.join(__dirname, "../../", "tmp", dataId);
  console.log(pathh);

  const img = sharp(pathh);
  const jpeg = img.jpeg({
    quality: Number(quality),
    progressive: true,
  });
  const { data, info } = await jpeg.toBuffer({ resolveWithObject: true });
  console.log(info);
  res.json({
    imgBase64: "data:image/jpeg;base64," + data.toString("base64"),
    imgInfo: info,
  });
  // res.json("data:image/jpeg;base64," + data.toString("base64"));
};

module.exports = optimize;
