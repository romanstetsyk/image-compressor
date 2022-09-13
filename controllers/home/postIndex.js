const postIndex = async (req, res) => {
  console.log(req.file);
  const { filename: src, size } = req.file;
  // const id = src.split(".").slice(0, -1).join(".");
  res.render("showComparison.ejs", { src, size }, (err, html) => {
    res.json({ html, src });
  });
};

module.exports = postIndex;
