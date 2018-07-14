const path = require('path');
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
//
const api = require('./routes/api');
const auth = require('./routes/auth');

const app = express();

// middlewares

app.use(cors());
app.use(compression());
app.use(bodyParser.json());

app.use(express.static(
  path.resolve(__dirname, '../../dist'),
));

// routes

app.use('/api', api);
app.use('/api/auth', auth);

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist/index.html'));
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Medium-clone server is running on port ${port}`);
});

/* eslint function-paren-newline: off */
