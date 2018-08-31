import faker from 'faker';
import bcrypt from 'bcrypt';

import db from '../../db';
import dbData from '../../db/db-data.json';

const initDb = () => {
  const dbDataCopy = JSON.parse(JSON.stringify(dbData));

  db
    .setState(dbDataCopy)
    .write();
};

const createUserInDb = async (userCredentials = {}, overrides = {}) => {
  // todo: this is copypasted from auth/createNewUser, think about removing duplication

  const username = userCredentials.username || faker.internet.userName();
  const password = userCredentials.password || faker.internet.password(6);

  const saltRounds = 1;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const maxUserId = db
    .get('users')
    .value()
    .map(user => user.id)
    .reduce((acc, cur) => (cur > acc ? cur : acc));

  const newUser = db
    .get('users')
    .insert({
      id: maxUserId + 1,
      username,
      passwordHash,
      avatarUrl: 'https://cdn-images-1.medium.com/fit/c/120/120/0*cmAOkoH29zoIVIBT',
      bio: '',
      ...overrides,
    })
    .write();

  return newUser;
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

export {
  initDb,
  createUserInDb,
  generateRegistrationData,
};

/* eslint import/no-extraneous-dependencies: off */
