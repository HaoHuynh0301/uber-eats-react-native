require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/jwt.middleware");
var { USERS } = require("../constants/user.constants");
const { resMsg, fieldChecked } = require("../utils/res.utils");

module.exports.loginRequest = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  if (!(username && password)) {
    return res.status(400).json(resMsg(4001, { login: false }));
  }

  const user = USERS.find((_user) => _user.username === username);
  if (!user) return res.status(400).json(resMsg(4002, { login: false }));
  if (await bcrypt.compare(password, user.password)) {
    try {
      const resContext = {
        id: user._id,
        username: user.username,
      };
      const token = jwt.sign(resContext, process.env.ACCESS_TOKEN_SERCET, {
        expiresIn: process.env.ACCESS_TOKEN_LIFE,
      });
      const data = {
        USERNAME: user.username,
        ACCESS_TOKEN: token,
      };
      return res.status(200).send(resMsg(2001, { login: true, data: data }));
    } catch (error) {
      return res.status(400).send(resMsg(400, { login: false }));
    }
  } else {
    return res.status(400).send(resMsg(4003, { login: false }));
  }
};

module.exports.registerRequest = async (req, res) => {
  const { username, password } = req.body;
  let code = fieldChecked(username, password);
  if (code === 4004 || code === 4005 || code === 4006)
    res.status(400).send(resMsg(code, { register: false }));
  const hashPassword = await bcrypt.hash(password, 10);
  try {
    USERS = [
      ...USERS,
      {
        _id: USERS.length,
        username: username,
        password: hashPassword,
        role: "normal",
      },
    ];
    res.status(201).send(resMsg(201, { username: username }));
  } catch (e) {
    res.status(400).send(resMsg(400, {}));
  }
};

module.exports.private =
  (verifyToken,
  (req, res, next) => {
    const username = req.username;
    res.status(200).send(resMsg(2002, { username: username }));
  });
