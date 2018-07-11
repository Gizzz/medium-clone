const path = require('path');
const express = require('express');
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

module.exports = router;
