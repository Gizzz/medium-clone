const express = require('express');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
//
const db = require('../db');
const config = require('../config');

const router = express.Router();

router.post('/login', (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send('Username and password should be provided.');
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
    res.status(400).send('User not found.');
  }

  const token = jwt.sign({
    id: user.id,
  }, config.jwtSecret, { expiresIn: '30d' });

  res.json({ token });
});

router.get('/check', (req, res) => {
  if (!req.headers.authorization) {
    res.status(400).send('Token is not provided.');
  }

  const token = req.headers.authorization.slice('Bearer '.length);

  try {
    const payload = jwt.verify(token, config.jwtSecret);
    res.json({ message: 'Auth check succeeded.', payload });
  } catch (e) {
    console.log(e);
    res.status(400).send('Token verification failed.');
  }
});

router.get('/check-with-middleware', expressJwt({ secret: config.jwtSecret, credentialsRequired: false }), (req, res) => {
  if (!req.user || !req.user.id) {
    res.status(400).send('Token is not provided.');
    return;
  }

  res.send('Auth check succeeded.');
});

module.exports = router;
