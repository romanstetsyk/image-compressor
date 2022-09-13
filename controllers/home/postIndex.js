const postIndex = async (req, res) => {
  console.log(req.file);
  const { filename: src, size, originalname } = req.file;
  // const id = src.split(".").slice(0, -1).join(".");
  const originalNameWithoutExt = originalname.split(".").slice(0, -1).join(".");
  const originalExt = "." + originalname.split(".").slice(-1).at(-1);

  res.render(
    "showComparison.ejs",
    { src, size, originalNameWithoutExt, originalExt },
    (err, html) => {
      res.json({
        html,
        src,
        originalNameWithoutExt,
        originalExt,
      });
    }
  );
};

module.exports = postIndex;
