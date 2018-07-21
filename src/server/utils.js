const _ = require('lodash');

function userToJson(user) {
  const safeUser = _.omit(user, ['password']);
  return safeUser;
}

module.exports = { userToJson };
