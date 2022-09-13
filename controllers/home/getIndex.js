const getIndex = async (req, res) => {
  console.log("getIndex run");
  res.render("index.ejs");
};

module.exports = getIndex;
