import faker from 'faker';

import db from '../../db';
import dbData from '../../db/db-data.json';

const initDb = () => {
  db
    .setState(dbData)
    .write();
};

const generateRegistrationData = (overrides = {}) => {
  const password = faker.internet.password(6);

  return {
    username: faker.internet.userName(),
    password,
    confirmPassword: password,
    ...overrides,
  };
};

export { initDb, generateRegistrationData };

/* eslint import/no-extraneous-dependencies: off */
