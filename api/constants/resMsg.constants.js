const RES_MSG = [
  {
    code: 4001, //Login
    msg: "Username and password are required!",
  },
  {
    code: 4002, //Login
    msg: "User is not existed!",
  },
  {
    code: 4003, //Login
    msg: "Password is invalid!",
  },
  {
    code: 4004, //Register
    msg: "Username is invalid!",
  },
  {
    code: 4005, //Register
    msg: "Password is invalid!",
  },
  {
    code: 4006, //Register
    msg: "Password is too short!",
  },
  {
    code: 400,
    msg: "There are some error with our server, please try later!",
  },
  {
    code: 4007,
    msg: "Token is invalid!",
  },
  {
    code: 2001, //Login
    msg: "Login successfully!",
  },
  {
    code: 2002, //Login
    msg: "Token is verified!",
  },
  {
    code: 201, //Register,
    msg: "Register successfully!",
  },
];

module.exports = { RES_MSG };
