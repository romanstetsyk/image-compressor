const mongoose = require("mongoose");

const app = require("./app");

const { MONGODB_URI, PORT = 3000 } = process.env;

mongoose
  .connect(MONGODB_URI)
  .then(data => console.log(`MongoDB connected: ${data.connection.host}`))
  .then(() => app.listen(PORT))
  .then(() => console.log(`Server running on port ${PORT}`))
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
