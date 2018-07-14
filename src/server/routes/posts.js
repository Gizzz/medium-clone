const express = require('express');
//
const db = require('../db');

const router = express.Router();

router.get('/:id', (req, res) => {
  const post = db
    .get('posts')
    .find({ id: Number(req.params.id) })
    .value();

  res.json(post);
});

router.get('/', (req, res) => {
  const posts = db.get('posts').value();
  res.json(posts);
});

router.patch('/:id', (req, res) => {
  const postChanges = req.body;

  const post = db
    .get('posts')
    .find({ id: Number(req.params.id) })
    .assign(postChanges)
    .write();

  res.json(post);
});

module.exports = router;
