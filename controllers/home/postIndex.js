const postIndex = async (req, res) => {
  console.log(req.file);
  res.render("index.ejs");
};

module.exports = postIndex;
