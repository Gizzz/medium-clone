const path = require('path');
const express = require('express');
const jwt = require('jsonwebtoken');
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync(path.resolve(__dirname, '../data/db.json'));
const db = lowdb(adapter);

const router = express.Router();

router.get('/posts/:id', (req, res) => {
  const post = db
    .get('posts')
    .find({ id: Number(req.params.id) })
    .value();

  res.json(post);
});

router.get('/posts', (req, res) => {
  const posts = db.get('posts').value();
  res.json(posts);
});

router.patch('/posts/:id', (req, res) => {
  const postChanges = req.body;

  const post = db
    .get('posts')
    .find({ id: Number(req.params.id) })
    .assign(postChanges)
    .write();

  res.json(post);
});

router.get('/blogs/:id', (req, res) => {
  const blog = db
    .get('blogs')
    .find({ id: Number(req.params.id) })
    .value();

  res.json(blog);
});

router.get('/users/:id', (req, res) => {
  const user = db
    .get('users')
    .find({ id: Number(req.params.id) })
    .value();
  res.json(user);
});

// auth

router.post('/auth/login', (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send('Username and password should be provided.');
    return;
  }

  const user = db
    .get('users')
    .find({
      fullName: req.body.username,
      password: req.body.password,
    })
    .value();

  if (!user) {
    res.status(400).send('User not found.');
  }

  const token = jwt.sign({
    userId: user.id,
  }, 'secret', { expiresIn: '30d' });

  res.json({ token });
});

router.get('/auth/check', (req, res) => {
  if (!req.headers.authorization) {
    res.status(400).send('Token is not provided.');
  }

  const token = req.headers.authorization.slice('Bearer '.length);

  try {
    const payload = jwt.verify(token, 'secret');
    res.json({ message: 'Auth check succeeded.', payload });
  } catch (e) {
    console.log(e);
    res.status(400).send('Token verification failed.');
  }
});

module.exports = router;
