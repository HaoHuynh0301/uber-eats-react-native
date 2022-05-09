require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const authRoute = require("./routes/auth.route");
const { connectMongoose } = require("./utils/mongoDb.utils");
const app = express();
const mainRouter = express.Router();

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

app.use(morgan("common"));
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/api/v1/auth", authRoute);
connectMongoose(MONGODB_URL);

mainRouter.all("*", (req, res) => {
  
  res.status(404).send("404 NOT FOUND");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT} ...`);
});
