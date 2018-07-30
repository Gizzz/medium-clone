const _ = require('lodash');

function userToJson(user) {
  const safeUser = _.omit(user, ['passwordHash']);
  return safeUser;
}

module.exports = { userToJson };
