const express = require("express");

const app = express();

require("dotenv").config();
const POR = process.env.PORT || 4000;

// middleware
app.use(express.json());

// import routes from TODO api
const blogRoutes = require("./routes/blog");
// mount todo ASPI routes
app.use("/api/v1", blogRoutes);

app.listen(3000, () => {
  console.log(`server stared at ${3000}`);
});

// db connect
const dbConnect = require("./config/database");
dbConnect();

//default routes
app.get("/", (req, res) => {
  res.send(`<h1>This is Homepagev bay</h1>`);
});
