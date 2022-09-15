const path = require("path");
const ejs = require("ejs");
const sharp = require("sharp");
const fs = require("fs/promises");

const postIndex = async (req, res) => {
  const quality = 80;

  console.log(req.file);
  // console.log(req.body.uuid);
  const { filename: src, size, originalname, path } = req.file;
  // const { name: originalNameWithoutExt, ext: originalExt } =
  //   path.parse(originalname);

  const img = sharp(path);
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
  });

  res.json({
    link,
    jpegBase64: "data:image/jpeg;base64," + jpegData.toString("base64"),
    jpegInfo,
  });

  // res.render(
  //   "showComparison.ejs",
  //   { src, size, originalNameWithoutExt, originalExt },
  //   (err, html) => {
  //     res.json({
  //       html,
  //       src,
  //       originalNameWithoutExt,
  //       originalExt,
  //     });
  //   }
  // );
};

module.exports = postIndex;
