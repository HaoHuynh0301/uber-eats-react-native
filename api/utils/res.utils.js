const { RES_MSG } = require("../constants/resMsg.constants");

const resMsg = (code, props) => ({
  ...props,
  code: code,
  msg: RES_MSG.find((_msg) => _msg.code === code).msg,
});

const fieldChecked = (username, password) => {
  if (!username || typeof username != "string") {
    return 4004;
  }
  if (!password || typeof password != "string") {
    return 4005;
  }
  if (password.length <= 6) {
    return 4006;
  }
  return;
};

module.exports = { resMsg, fieldChecked };
