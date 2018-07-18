const path = require('path');
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const lodashId = require('lodash-id');

const adapter = new FileSync(path.resolve(__dirname, './db-data.json'));
const db = lowdb(adapter);
db._.mixin(lodashId);

module.exports = db;
