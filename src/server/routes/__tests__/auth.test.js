import axios from 'axios';

import startServer from '../../startServer';
import config from '../../config';
import db from '../../db';
import { userToJson } from '../../utils';
import { initDb, createUserInDb, generateRegistrationData } from '../testUtils';

describe('auth', () => {
  const baseUrl = `http://localhost:${config.defaultPort}`;
  let server;

  beforeAll(async () => {
    server = await startServer();
  });

  afterAll(() => server.close());

  beforeEach(() => {
    initDb();
  });

  test('login - should require username and password', async () => {
    const err1 = await axios
      .post(`${baseUrl}/api/auth/login`, {})
      .catch(e => e);

    expect(err1.response.status).toBe(400);
    expect(err1.response.data.error).toMatchSnapshot();

    const err2 = await axios
      .post(`${baseUrl}/api/auth/login`, { password: '123123' })
      .catch(e => e);

    expect(err2.response.status).toBe(400);
    expect(err2.response.data.error).toMatchSnapshot();

    const err3 = await axios
      .post(`${baseUrl}/api/auth/login`, { username: 'test' })
      .catch(e => e);

    expect(err3.response.status).toBe(400);
    expect(err3.response.data.error).toMatchSnapshot();
  });

  test('login - should return 404 if username does not exist', async () => {
    const err = await axios
      .post(`${baseUrl}/api/auth/login`, {
        username: '__this_name_should_not_exist__',
        password: '123123',
      })
      .catch(e => e);

    expect(err.response.status).toBe(404);
    expect(err.response.data.error).toMatchSnapshot();
  });

  test('login - should check password hash', async () => {
    // create test user to check password against
    //
    const registrationData = generateRegistrationData();
    await createUserInDb({
      username: registrationData.username,
      password: registrationData.password,
    });

    const wrongPassword = registrationData.password.repeat(2);
    const err = await axios
      .post(`${baseUrl}/api/auth/login`, {
        username: registrationData.username,
        password: wrongPassword,
      })
      .catch(e => e);

    expect(err.response.status).toBe(400);
    expect(err.response.data.error).toMatchSnapshot();
  });

  test('login - should return user with token on success', async () => {
    const registrationData = generateRegistrationData();
    const userFromDb = await createUserInDb({
      username: registrationData.username,
      password: registrationData.password,
    });

    const loginResponse = await axios
      .post(`${baseUrl}/api/auth/login`, {
        username: registrationData.username,
        password: registrationData.password,
      })
      .then(res => res.data);

    expect(loginResponse.user).toEqual(userToJson(userFromDb));
    expect(loginResponse.user.passwordHash).not.toBeDefined();
    expect(loginResponse.token).toBeDefined();
    expect(typeof loginResponse.token).toBe('string');
  });

  test('register - should fail on request with empty payload', async () => {
    // no payload object
    const err1 = await axios
      .post(`${baseUrl}/api/auth/register`)
      .catch(e => e);

    expect(err1.response.status).toBe(400);
    expect(err1.response.data.error).toMatchSnapshot();

    // empty payload object
    const err2 = await axios
      .post(`${baseUrl}/api/auth/register`, {})
      .catch(e => e);

    expect(err2.response.status).toBe(400);
    expect(err2.response.data.error).toMatchSnapshot();
  });

  test('register - should require all fields', async () => {
    const err1 = await axios
      .post(`${baseUrl}/api/auth/register`, { username: 'test' })
      .catch(e => e);

    expect(err1.response.status).toBe(400);
    expect(err1.response.data.error).toMatchSnapshot();

    const err2 = await axios
      .post(`${baseUrl}/api/auth/register`, { username: 'test', password: '123123' })
      .catch(e => e);

    expect(err2.response.status).toBe(400);
    expect(err2.response.data.error).toMatchSnapshot();

    const err3 = await axios
      .post(`${baseUrl}/api/auth/register`, { username: 'test', confirmPassword: '123123' })
      .catch(e => e);

    expect(err3.response.status).toBe(400);
    expect(err3.response.data.error).toMatchSnapshot();
  });

  test('register - should reject if username is too short', async () => {
    const err = await axios
      .post(`${baseUrl}/api/auth/register`, { username: 'ts', password: '123123', confirmPassword: '123123' })
      .catch(e => e);

    expect(err.response.status).toBe(400);
    expect(err.response.data.error).toMatchSnapshot();
  });

  test('register - should reject if password is too short', async () => {
    const err = await axios
      .post(`${baseUrl}/api/auth/register`, { username: 'test', password: '12345', confirmPassword: '12345' })
      .catch(e => e);

    expect(err.response.status).toBe(400);
    expect(err.response.data.error).toMatchSnapshot();
  });

  test('register - should reject if password and confirmation do not match', async () => {
    const err = await axios
      .post(`${baseUrl}/api/auth/register`, { username: 'test', password: '123123', confirmPassword: '456456' })
      .catch(e => e);

    expect(err.response.status).toBe(400);
    expect(err.response.data.error).toMatchSnapshot();
  });

  test('register - should reject if username is already taken', async () => {
    // create test user to check username against
    //
    const registrationData = generateRegistrationData();
    await createUserInDb({
      username: registrationData.username,
      password: registrationData.password,
    });

    const err = await axios
      .post(`${baseUrl}/api/auth/register`, registrationData)
      .catch(e => e);

    expect(err.response.status).toBe(400);
    expect(err.response.data.error).toMatchSnapshot();
  });

  test('register - should create and return user with token on success', async () => {
    const registrationData = generateRegistrationData();
    const registrationResponse = await axios
      .post(`${baseUrl}/api/auth/register`, registrationData)
      .then(res => res.data);

    const userFromDb = db
      .get('users')
      .getById(registrationResponse.user.id)
      .value();

    expect(registrationResponse.user).toEqual(userToJson(userFromDb));
    expect(registrationResponse.user.passwordHash).not.toBeDefined();
    expect(registrationResponse.token).toBeDefined();
    expect(typeof registrationResponse.token).toBe('string');
  });
});
