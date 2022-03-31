const express = require('express');
const morgan = require("morgan");
const app = express();
const PORT = 5000;
const mainRouter = express.Router();

app.use(morgan("common"));
app.use(express.json());

mainRouter.all("*", (req, res) => {
  res.status(404).send("404 NOT FOUND");
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})
