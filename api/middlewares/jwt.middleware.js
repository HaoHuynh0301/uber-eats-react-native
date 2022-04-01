require("dotenv").config();
const jwt = require("jsonwebtoken");
const { resMsg } = require("../utils/res.utils");
const ACCESS_TOKEN = process.env.ACCESS_TOKEN_SERCET;

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (token) {
    try {
      const decoded = jwt.verify(token, ACCESS_TOKEN);
      req.username = decoded.username;
    } catch (error) {
      return res.status(401).send(resMsg(4007, {}));
    }
    return next();
  } else {
    return res.status(400).send(resMsg(400, {}));
  }
};

module.exports = verifyToken;
