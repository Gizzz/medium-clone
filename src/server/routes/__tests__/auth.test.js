import axios from 'axios';

import startServer from '../../startServer';
import config from '../../config';
import db from '../../db';
import { userToJson } from '../../utils';
import { initDb, generateRegistrationData } from '../testUtils/db';

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

  test('login - should check password', async () => {
    const registrationData = generateRegistrationData();
    const testUser = await axios
      .post(`${baseUrl}/api/auth/register`, registrationData)
      .then(res => res.data.user);

    expect(testUser.username).toBe(registrationData.username);

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
    const testUser = await axios
      .post(`${baseUrl}/api/auth/register`, registrationData)
      .then(res => res.data.user);

    const loginResponse = await axios
      .post(`${baseUrl}/api/auth/login`, {
        username: registrationData.username,
        password: registrationData.password,
      })
      .then(res => res.data);

    expect(loginResponse.user).toEqual(testUser);
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
    const registrationData = generateRegistrationData();
    const testUser = await axios
      .post(`${baseUrl}/api/auth/register`, registrationData)
      .then(res => res.data.user);

    const err = await axios
      .post(`${baseUrl}/api/auth/register`, {
        username: testUser.username,
        password: registrationData.password,
        confirmPassword: registrationData.password,
      })
      .catch(e => e);

    expect(err.response.status).toBe(400);
    expect(err.response.data.error).toMatchSnapshot();
  });

  test('register - should create and return user with token on success', async () => {
    const registrationData = generateRegistrationData();
    const registerResponse = await axios
      .post(`${baseUrl}/api/auth/register`, registrationData)
      .then(res => res.data);

    const userFromDb = db
      .get('users')
      .getById(registerResponse.user.id)
      .value();

    expect(registerResponse.user).toEqual(userToJson(userFromDb));
    expect(registerResponse.user.passwordHash).not.toBeDefined();
    expect(registerResponse.token).toBeDefined();
    expect(typeof registerResponse.token).toBe('string');
  });
});
