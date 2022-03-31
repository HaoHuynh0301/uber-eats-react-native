require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const authRoute = require("./routes/auth.route");
const app = express();
const PORT = 5000;
const mainRouter = express.Router();

app.use(morgan("common"));
app.use(express.json());

app.use("/api/v1/auth", authRoute);

mainRouter.all("*", (req, res) => {
  res.status(404).send("404 NOT FOUND");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT} ...`);
});
