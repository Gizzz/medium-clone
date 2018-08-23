const path = require('path');
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
//
const routes = require('./routes');

function startServer(port) {
  const app = express();

  // middlewares

  app.use(cors());
  app.use(compression());
  app.use(bodyParser.json());

  app.use(express.static(
    path.resolve(__dirname, '../../dist'),
  ));

  // routes

  app.use('/api', routes);

  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../dist/index.html'));
  });

  app.use((err, req, res, _next) => {
    console.error(`${err.stack}\n`);
    res.status(500).json({ error: 'Internal server error.' });
  });

  const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';
  const defaultPort = 3000;
  const actualPort = port || process.env.PORT || defaultPort;

  return new Promise(resolve => {
    const server = app.listen(actualPort, () => {
      console.log(`Medium-clone server is running on port ${actualPort} (mode: ${mode})`);
      resolve(server);
    });
  });
}

module.exports = startServer;

/* eslint function-paren-newline: off */
