import axios from 'axios';
import startServer from '../../startServer';

describe('auth', () => {
  const baseUrl = 'http://localhost:3000';
  let server;

  beforeAll(async () => {
    server = await startServer();
  });

  afterAll(() => server.close());

  test('login - should require username and password', async () => {
    const err1 = await axios
      .post(`${baseUrl}/api/auth/login`, {})
      .catch(e => e);

    expect(err1.response.status).toBe(400);
    expect(err1.response.data.error).toMatchSnapshot();

    const err2 = await axios
      .post(`${baseUrl}/api/auth/login`, { password: '123' })
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
        password: '123',
      })
      .catch(e => e);

    expect(err.response.status).toBe(404);
    expect(err.response.data.error).toMatchSnapshot();
  });

  test('login - should check password', async () => {
    const wrongPassword = '123456';
    const err = await axios
      .post(`${baseUrl}/api/auth/login`, { username: 'john', password: wrongPassword })
      .catch(e => e);

    expect(err.response.status).toBe(400);
    expect(err.response.data.error).toMatchSnapshot();
  });

  test('login - should return user with token on success', async () => {
    const userInput = { username: 'john', password: '123123' };

    const userOutput = await axios
      .post(`${baseUrl}/api/auth/login`, userInput)
      .then(res => res.data);

    expect(userOutput.user.username).toBe(userInput.username);
    expect(userOutput.user.password).not.toBeDefined();
    expect(userOutput.token).toBeDefined();
  });
});
