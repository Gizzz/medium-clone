const path = require('path');
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const util = require('util');
//
const routes = require('./routes');
const config = require('./config');

/**
 * @description starts server and when started - returns server instance
 */
async function startServer(port) {
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

  const mode = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
  const { defaultPort } = config;
  const actualPort = port || process.env.PORT || defaultPort;

  if (process.env.NODE_ENV === 'test') {
    console.log('Setting up test-db...');
    await createTestDbFile();
  }

  const server = await createServer(app, actualPort, mode);
  return server;
}

// helpers

async function createServer(app, port, mode) {
  return new Promise(resolve => {
    const server = app.listen(port, () => {
      console.log(`Medium-clone server is running on port ${port} (mode: ${mode})`);
      resolve(server);
    });
  });
}

async function createTestDbFile() {
  const readFile = util.promisify(fs.readFile);
  const writeFile = util.promisify(fs.writeFile);

  const originalData = await readFile(path.resolve(__dirname, 'db/db-data.json'), 'utf8');
  await writeFile(path.resolve(__dirname, 'db/test-db-data.json'), originalData);
}

module.exports = startServer;

/* eslint function-paren-newline: off */
