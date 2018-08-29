const path = require('path');
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const lodashId = require('lodash-id');

const dbFile = process.env.NODE_ENV === 'test'
  ? 'test-db-data.json'
  : 'db-data.json';

const adapter = new FileSync(path.resolve(__dirname, dbFile));
const db = lowdb(adapter);
db._.mixin(lodashId);

module.exports = db;
