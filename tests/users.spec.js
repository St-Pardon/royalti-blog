import request from 'supertest';
import { app } from '../src/app.js';
import { connect } from './db-config.js';
import { UserModel } from '../src/models/users.model.js';
import { userData } from './testdata.js';

describe('Modification and Deletion and Getting of users', () => {
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
   * Getting User profile
   */

  it('Should get user by id', async () => {
    const { _id } = await UserModel.create(userData);

    const res = await request(app)
      .get(`/api/v1/user/${_id.toString()}`)
      .set('content-type', 'application/json');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('userType');
    expect(res.body).toHaveProperty('createdAt');
    expect(res.body).toHaveProperty('updatedAt');
    expect(res.body).toHaveProperty('username', 'johndoe');
    expect(res.body).toHaveProperty('firstName', 'john');
    expect(res.body).toHaveProperty('lastName', 'doe');
    expect(res.body).toHaveProperty('email', 'john@doe.com');
  });

  it("Shouldn't get user by id with wrong id", async () => {
    await UserModel.create(userData);

    const res = await request(app)
      .get(`/api/v1/user/64d8c7799ee87e7ef265062c`)
      .set('content-type', 'application/json');

    expect(res.status).toBe(404);
    expect(res.text).toBe('User not found');
  });

  /**
   * Update user information
   */

  it('Should update user information for authenticated user', async () => {
    await UserModel.create(userData);

    const auth = await request(app)
      .post('/auth/signin')
      .set('content-type', 'application/json')
      .send({
        username: 'john@doe.com',
        password: 'john#123',
      });

    const res = await request(app)
      .put(`/api/v1/user`)
      .set('content-type', 'application/json')
      .set('authorization', 'Bearer ' + auth.body.token)
      .send({ firstName: 'joe' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('userType');
    expect(res.body).toHaveProperty('createdAt');
    expect(res.body).toHaveProperty('updatedAt');
    expect(res.body).toHaveProperty('username', 'johndoe');
    expect(res.body).toHaveProperty('firstName', 'joe');
    expect(res.body).toHaveProperty('lastName', 'doe');
    expect(res.body).toHaveProperty('email', 'john@doe.com');
  });

  it("Shouldn't update user information for unauthenticated user", async () => {
    await UserModel.create(userData);

    const res = await request(app)
      .put(`/api/v1/user`)
      .set('content-type', 'application/json')
      .send({ firstName: 'joe' });

    expect(res.status).toBe(401);
    expect(res.text).toBe('Unauthorized');
  });

  /**
   * Delete user id
   */
  it('Should delete user information for authenticated user', async () => {
    await UserModel.create(userData);

    const auth = await request(app)
      .post('/auth/signin')
      .set('content-type', 'application/json')
      .send({
        username: 'john@doe.com',
        password: 'john#123',
      });

    const res = await request(app)
      .delete(`/api/v1/user`)
      .set('content-type', 'application/json')
      .set('authorization', 'Bearer ' + auth.body.token);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('User deleted successfully');
  });

  it("Shouldn't delete user information for unauthenticated user", async () => {
    await UserModel.create(userData);

    const res = await request(app)
      .delete(`/api/v1/user`)
      .set('content-type', 'application/json');

    expect(res.status).toBe(401);
    expect(res.text).toBe('Unauthorized');
  });
});
