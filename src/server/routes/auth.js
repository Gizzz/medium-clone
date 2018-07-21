const express = require('express');
const jwt = require('jsonwebtoken');
//
const db = require('../db');
const config = require('../config');
const authorize = require('../middlewares/authorize');

const router = express.Router();

router.post('/login', (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({ error: 'Username and password should be provided.' });
    return;
  }

  const user = db
    .get('users')
    .find({
      username: req.body.username,
      password: req.body.password,
    })
    .value();

  if (!user) {
    res.status(404).json({ error: 'User not found. Check username and password.' });
    return;
  }

  const token = jwt.sign({
    id: user.id,
  }, config.jwtSecret, { expiresIn: '30d' });

  res.json({ token });
});

router.post('/logout', authorize, (req, res) => {
  // due to authorize middleware, assume that token exists and correct
  const token = req.headers.authorization.slice('Bearer '.length);

  const existingToken = db
    .get('revokedTokens')
    .find({ token })
    .value();

  if (!existingToken) {
    db
      .get('revokedTokens')
      .insert({
        id: db._.createId(),
        token,
      })
      .write();
  }

  res.json({ message: 'Token is revoked.' });

  // TODO: create job (monthly) for cleaning up expired revoked tokens from db
});

module.exports = router;
