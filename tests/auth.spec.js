import request from 'supertest';
import { app } from '../src/app.js';
import { connect } from './db-config.js';
import { UserModel } from '../src/models/users.model.js';
import { userData } from './testdata.js';

describe('Creation and User Authentication Test', () => {
  let connectDB;

  beforeAll(async () => {
    console.log('Starting the server...');
    connectDB = await connect();
  });

  afterEach(async () => {
    await connectDB.cleanup();
  });

  afterAll(async () => {
    await connectDB.disconnect();
  });

  /**
   * Sign up and user creation
   */
  it('Should signup a user with complete required informantion', async () => {
    const res = await request(app)
      .post('/auth/signup')
      .set('content-type', 'application/json')
      .send({
        username: 'johndoe',
        firstName: 'John',
        lastName: 'doe',
        email: 'john@doe.com',
        password: 'john#123',
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('msg');
    expect(res.body.msg).toBe('signup successful');
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('_id');
    expect(res.body.user).toHaveProperty('username', 'johndoe');
    expect(res.body.user).toHaveProperty('firstName', 'john');
    expect(res.body.user).toHaveProperty('lastName', 'doe');
    expect(res.body.user).toHaveProperty('email', 'john@doe.com');
  });

  it("Shouldn't signup a user with incomplete informantion - missing first name", async () => {
    const res = await request(app)
      .post('/auth/signup')
      .set('content-type', 'application/json')
      .send({
        username: 'johndoe',
        lastName: 'doe',
        email: 'john@doe.com',
        password: 'john#123',
      });

    expect(res.status).toBe(406);
    expect(res.text).toBe('"firstName" is required');
  });

  it("Shouldn't signup a user with incomplete informantion - missing last name", async () => {
    const res = await request(app)
      .post('/auth/signup')
      .set('content-type', 'application/json')
      .send({
        username: 'johndoe',
        firstName: 'john',
        email: 'john@doe.com',
        password: 'john#123',
      });

    expect(res.status).toBe(406);
    expect(res.text).toBe('"lastName" is required');
  });

  it("Shouldn't signup a user with incomplete informantion - missing email", async () => {
    const res = await request(app)
      .post('/auth/signup')
      .set('content-type', 'application/json')
      .send({
        username: 'johndoe',
        firstName: 'john',
        lastName: 'doe',
        password: 'john#123',
      });

    expect(res.status).toBe(406);
    expect(res.text).toBe('Email is required');
  });

  it("Shouldn't signup a user with incomplete informantion - missing username", async () => {
    const res = await request(app)
      .post('/auth/signup')
      .set('content-type', 'application/json')
      .send({
        firstName: 'john',
        lastName: 'doe',
        email: 'john@doe.com',
        password: 'john#123',
      });

    expect(res.status).toBe(406);
    expect(res.text).toBe('"username" is required');
  });

  it("Shouldn't signup a user with incomplete informantion - invalid email", async () => {
    const res = await request(app)
      .post('/auth/signup')
      .set('content-type', 'application/json')
      .send({
        username: 'johndoe',
        firstName: 'john',
        lastName: 'doe',
        email: 'johndoe',
        password: 'john#123',
      });

    expect(res.status).toBe(406);
    expect(res.text).toBe('Invalid email format');
  });

  it("Shouldn't signup a user with invalid password - number or special character", async () => {
    const res = await request(app)
      .post('/auth/signup')
      .set('content-type', 'application/json')
      .send({
        username: 'johndoe',
        firstName: 'john',
        lastName: 'doe',
        email: 'john@doe.com',
        password: 'johndoee',
      });

    expect(res.status).toBe(406);
    expect(res.text).toBe(
      'Password must contain at least one special character or number'
    );
  });

  it("Shouldn't signup a user with invalid password - length", async () => {
    const res = await request(app)
      .post('/auth/signup')
      .set('content-type', 'application/json')
      .send({
        username: 'johndoe',
        firstName: 'john',
        lastName: 'doe',
        email: 'john@doe.com',
        password: 'johndo',
      });

    expect(res.status).toBe(406);
    expect(res.text).toBe('Password must be at least 8 characters long');
  });

  /**
   * Sign in or authenticate user
   */

  it('Should signin a user with username and password', async () => {
    await UserModel.create(userData);

    const res = await request(app)
      .post('/auth/signin')
      .set('content-type', 'application/json')
      .send({
        username: 'johndoe',
        password: 'john#123',
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('Signin successful');
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('body');
    expect(res.body.body).toHaveProperty('_id');
    expect(res.body.body).toHaveProperty('email', 'john@doe.com');
  });

  it('Should signin a user with email as username and password', async () => {
    await UserModel.create(userData);

    const res = await request(app)
      .post('/auth/signin')
      .set('content-type', 'application/json')
      .send({
        username: 'john@doe.com',
        password: 'john#123',
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('Signin successful');
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('body');
    expect(res.body.body).toHaveProperty('_id');
    expect(res.body.body).toHaveProperty('email', 'john@doe.com');
  });

  it("Shouldn't signin a user with wrong email as username and password", async () => {
    await UserModel.create(userData);

    const res = await request(app)
      .post('/auth/signin')
      .set('content-type', 'application/json')
      .send({
        username: 'john2@doe.com',
        password: 'john#123',
      });

    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toBe('Username or password is incorrect');
  });

  it("Shouldn't signin a user with wrong username and password", async () => {
    await UserModel.create(userData);

    const res = await request(app)
      .post('/auth/signin')
      .set('content-type', 'application/json')
      .send({
        username: 'johndoe2',
        password: 'john#123',
      });

    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toBe('Username or password is incorrect');
  });

  it("Shouldn't signin a user with  username and wrong password", async () => {
    await UserModel.create(userData);

    const res = await request(app)
      .post('/auth/signin')
      .set('content-type', 'application/json')
      .send({
        username: 'johndoe',
        password: 'john123',
      });

    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toBe('Username or password is incorrect');
  });
});
