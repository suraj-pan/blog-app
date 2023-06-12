const mongoose = require("mongoose");

require("dotenv").config();

const dbConnect = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("db connection succesfull"))
    .catch((eer) => {
      console.log("db ma error a gaya");
      console.log(eer.message);
      process.exit(1);
    });
};

module.exports = dbConnect;
