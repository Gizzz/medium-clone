const jwt = require('jsonwebtoken');
//
const config = require('../config');
const db = require('../db');

const authorize = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(400).json({ error: 'Auth token is not provided.' });
    return;
  }

  const token = req.headers.authorization.slice('Bearer '.length);

  const revokedToken = db
    .get('revokedTokens')
    .find({ token })
    .value();

  if (revokedToken) {
    res.status(400).json({ error: 'Auth token is revoked.' });
    return;
  }

  try {
    const payload = jwt.verify(token, config.jwtSecret);
    res.user = { ...payload };
    next();
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: 'Auth token verification failed.' });
  }
};

module.exports = authorize;
