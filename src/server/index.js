const path = require('path');

const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');

const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');


const adapter = new FileSync(path.resolve(__dirname, 'data/db.json'));
const db = lowdb(adapter);

const app = express();

// middlewares

app.use(cors());
app.use(compression());
app.use(bodyParser.json());

app.use(express.static(
  path.resolve(__dirname, '../../dist'),
));

// routes

app.get('/api/posts/:id', (req, res) => {
  const post = db
    .get('posts')
    .find({ id: Number(req.params.id) })
    .value();

  res.json(post);
});

app.get('/api/posts', (req, res) => {
  const posts = db.get('posts').value();
  res.json(posts);
});

app.patch('/api/posts/:id', (req, res) => {
  const postChanges = req.body;

  const post = db
    .get('posts')
    .find({ id: Number(req.params.id) })
    .assign(postChanges)
    .write();

  res.json(post);
});

app.get('/api/blogs/:id', (req, res) => {
  const blog = db
    .get('blogs')
    .find({ id: Number(req.params.id) })
    .value();

  res.json(blog);
});

app.get('/api/users/:id', (req, res) => {
  const user = db
    .get('users')
    .find({ id: Number(req.params.id) })
    .value();
  res.json(user);
});

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist/index.html'));
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Medium-clone server is running on port ${port}`);
});

/* eslint function-paren-newline: off */
