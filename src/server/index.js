const path = require('path');
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
//
const routes = require('./routes');

const app = express();

// middlewares

app.use(cors());
app.use(compression());
app.use(bodyParser.json());

app.use(express.static(
  path.resolve(__dirname, '../../dist'),
));

// routes

app.use('/', routes);

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist/index.html'));
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Medium-clone server is running on port ${port}`);
});

/* eslint function-paren-newline: off */
