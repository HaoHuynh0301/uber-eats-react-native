var USERS = [
  {
    _id: 1,
    username: "admin",
    password: "admin",
    role: "admin",
  },
];

const appendUser = (user) => {
  USERS = [...USERS, {...user}]
}

module.exports = { USERS, appendUser };
