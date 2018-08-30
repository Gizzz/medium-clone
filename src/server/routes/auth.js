const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');
//
const db = require('../db');
const config = require('../config');
const authorize = require('../middlewares/authorize');
//
const { userToJson } = require('../utils');

const router = express.Router();

router.post('/register', async (req, res) => {
  const reqBody = { ...req.body };
  _.forOwn(reqBody, (value) => {
    if (typeof value !== 'string') { throw new Error('Unexpected data type.'); }
  });
  reqBody.username = reqBody.username ? reqBody.username.trim() : reqBody.username;

  const validationResult = validateRegistrationData(reqBody);
  if (!validationResult.isValid) {
    res.status(400).json({ error: validationResult.error });
    return;
  }

  const newUser = await createNewUser(reqBody.username, reqBody.password);

  const token = jwt.sign({
    id: newUser.id,
  }, config.jwtSecret, { expiresIn: '30d' });

  res.json({
    user: userToJson(newUser),
    token,
  });
});

router.post('/login', async (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({ error: 'Username and password should be provided.' });
    return;
  }

  const user = db
    .get('users')
    .find({ username: req.body.username })
    .value();

  if (!user) {
    res.status(404).json({ error: 'User not found. Check the username.' });
    return;
  }

  const isPasswordCorrect = await bcrypt.compare(req.body.password, user.passwordHash);
  if (!isPasswordCorrect) {
    res.status(400).json({ error: 'Password is wrong.' });
    return;
  }

  const token = jwt.sign({
    id: user.id,
  }, config.jwtSecret, { expiresIn: '30d' });

  res.json({
    user: userToJson(user),
    token,
  });
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

// ===========================================================================
// helpers

function validateRegistrationData(data) {
  if (!data.username || !data.password || !data.confirmPassword) {
    return { isValid: false, error: 'All fields are required.' };
  }

  if (data.username.length < 3) {
    return { isValid: false, error: 'Username should be at least 3 symbols long.' };
  }

  if (data.password.length < 6) {
    return { isValid: false, error: 'Password should be at least 6 symbols long.' };
  }

  if (data.password !== data.confirmPassword) {
    return { isValid: false, error: 'Password and confirmation do not match.' };
  }

  const existingUser = db
    .get('users')
    .find({ username: data.username })
    .value();

  if (existingUser) {
    return { isValid: false, error: 'This username is already taken.' };
  }

  return { isValid: true, error: null };
}

async function createNewUser(username, password) {
  const maxUserId = db
    .get('users')
    .value()
    .map(user => user.id)
    .reduce((acc, cur) => (cur > acc ? cur : acc));

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const newUser = db
    .get('users')
    .insert({
      id: maxUserId + 1,
      username,
      passwordHash,
      avatarUrl: 'https://cdn-images-1.medium.com/fit/c/120/120/0*cmAOkoH29zoIVIBT',
      bio: '',
    })
    .write();

  return newUser;
}

module.exports = router;
