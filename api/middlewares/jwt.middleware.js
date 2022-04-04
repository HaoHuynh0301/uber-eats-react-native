require("dotenv").config();
const jwt = require("jsonwebtoken");
const { resMsg } = require("../utils/res.utils");
const ACCESS_TOKEN = process.env.ACCESS_TOKEN_SERCET;
const TOKEN_LIFE = process.env.ACCESS_TOKEN_LIFE;

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (token) {
    try {
      const decoded = jwt.verify(token.slice(7, token.length), ACCESS_TOKEN, {
        "tokenLife": TOKEN_LIFE
      });
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
