import request from 'supertest';
import { app } from '../src/app.js';
import { connect } from './db-config.js';
import { UserModel } from '../src/models/users.model.js';
import { posts, userData } from './testdata.js';
import { PostModel } from '../src/models/posts.models.js';

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
   * Get all post
   */
  it('Should get all the published post by an authenticated user', async () => {
    const { _id } = await UserModel.create(userData);

    const data = posts.map((post) => {
      return { ...post, author: 'john doe', userid: _id };
    });

    await PostModel.create(data);

    const auth = await request(app)
      .post('/auth/signin')
      .set('content-type', 'application/json')
      .send({
        username: 'john@doe.com',
        password: 'john#123',
      });

    const res = await request(app)
      .get(`/api/v1/post/all`)
      .set('content-type', 'application/json')
      .set('authorization', 'Bearer ' + auth.body.token);

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(3);
    expect(res.body[0]).toHaveProperty('_id');
    expect(res.body[0]).toHaveProperty('title');
    expect(res.body[0]).toHaveProperty('description');
    expect(res.body[0]).toHaveProperty('author');
    expect(res.body[0]).toHaveProperty('tags');
  });

  it('Should get all the published post by an unauthenticated user', async () => {
    const { _id } = await UserModel.create(userData);

    const data = posts.map((post) => {
      return { ...post, author: 'john doe', userid: _id };
    });

    await PostModel.create(data);

    const res = await request(app)
      .get(`/api/v1/post/all`)
      .set('content-type', 'application/json');

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(3);
    expect(res.body[0]).toHaveProperty('_id');
    expect(res.body[0]).toHaveProperty('title');
    expect(res.body[0]).toHaveProperty('description');
    expect(res.body[0]).toHaveProperty('author');
    expect(res.body[0]).toHaveProperty('tags');
  });

  /**
   * Get post by ID
   */

  it('Should get a published post by id  for an authenticated user', async () => {
    const { _id } = await UserModel.create(userData);

    const data = posts.map((post) => {
      return { ...post, author: 'john doe', userid: _id };
    });

    const dbRes = await PostModel.create(data);

    const auth = await request(app)
      .post('/auth/signin')
      .set('content-type', 'application/json')
      .send({
        username: 'john@doe.com',
        password: 'john#123',
      });

    const res = await request(app)
      .get(`/api/v1/post/${dbRes[0]._id}`)
      .set('content-type', 'application/json')
      .set('authorization', 'Bearer ' + auth.body.token);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('title');
    expect(res.body).toHaveProperty('description');
    expect(res.body).toHaveProperty('author');
    expect(res.body).toHaveProperty('tags');
  });

  it('Should get a published post by id for an unauthenticated user', async () => {
    const { _id } = await UserModel.create(userData);

    const data = posts.map((post) => {
      return { ...post, author: 'john doe', userid: _id };
    });

    const dbRes = await PostModel.create(data);

    const res = await request(app)
      .get(`/api/v1/post/${dbRes[0]._id}`)
      .set('content-type', 'application/json');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('title');
    expect(res.body).toHaveProperty('description');
    expect(res.body).toHaveProperty('author');
    expect(res.body).toHaveProperty('tags');
  });

  it("Shouldn't get a published post by wrong id for an authenticated user", async () => {
    const { _id } = await UserModel.create(userData);

    const data = posts.map((post) => {
      return { ...post, author: 'john doe', userid: _id };
    });

    await PostModel.create(data);

    const auth = await request(app)
      .post('/auth/signin')
      .set('content-type', 'application/json')
      .send({
        username: 'john@doe.com',
        password: 'john#123',
      });

    const res = await request(app)
      .get(`/api/v1/post/64d7df5982a57bd0c7142c9d`)
      .set('content-type', 'application/json')
      .set('authorization', 'Bearer ' + auth.body.token);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toBe('Post not found');
  });

  it("Shouldn't get a published post by wrong id for an unauthenticated user", async () => {
    const { _id } = await UserModel.create(userData);

    const data = posts.map((post) => {
      return { ...post, author: 'john doe', userid: _id };
    });

    await PostModel.create(data);

    const res = await request(app)
      .get(`/api/v1/post/64d7df5982a57bd0c7142c9d`)
      .set('content-type', 'application/json');

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toBe('Post not found');
  });

  /**
   * Get post by users
   */
  it('Should get all post of an authenticated user', async () => {
    const { _id } = await UserModel.create(userData);

    const data = posts.map((post) => {
      return { ...post, author: 'john doe', userid: _id };
    });

    await PostModel.create(data);

    const auth = await request(app)
      .post('/auth/signin')
      .set('content-type', 'application/json')
      .send({
        username: 'john@doe.com',
        password: 'john#123',
      });

    const res = await request(app)
      .get(`/api/v1/post/user`)
      .set('content-type', 'application/json')
      .set('authorization', 'Bearer ' + auth.body.token);

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(6);
    expect(res.body[0]).toHaveProperty('_id');
    expect(res.body[0]).toHaveProperty('title');
    expect(res.body[0]).toHaveProperty('description');
    expect(res.body[0]).toHaveProperty('author');
    expect(res.body[0]).toHaveProperty('tags');
    expect(res.body[0]).toHaveProperty('body');
    expect(res.body[0]).toHaveProperty('userid');
    expect(res.body[0]).toHaveProperty('updatedAt');
    expect(res.body[0]).toHaveProperty('createdAt');
  });

  it("Shouldn't get all post for user by an unauthenticated user", async () => {
    const { _id } = await UserModel.create(userData);

    const data = posts.map((post) => {
      return { ...post, author: 'john doe', userid: _id };
    });

    await PostModel.create(data);

    const res = await request(app)
      .get(`/api/v1/post/user`)
      .set('content-type', 'application/json');

    expect(res.status).toBe(401);
    expect(res.text).toBe('Unauthorized');
  });

  /**
   * Create new user
   */
  it('Should be authenticated to create a post ', async () => {
    await UserModel.create(userData);

    const auth = await request(app)
      .post('/auth/signin')
      .set('content-type', 'application/json')
      .send({
        username: 'john@doe.com',
        password: 'john#123',
      });

    const res = await request(app)
      .post(`/api/v1/post/create`)
      .set('content-type', 'application/json')
      .set('authorization', 'Bearer ' + auth.body.token)
      .send(posts[0]);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('postid');
    expect(res.body.message).toBe('Post created successfully');
  });

  it("Shouldn't be unauthenticated to create a post ", async () => {
    await UserModel.create(userData);

    const res = await request(app)
      .post(`/api/v1/post/create`)
      .set('content-type', 'application/json')
      .send(posts[0]);

    expect(res.status).toBe(401);
    expect(res.text).toBe('Unauthorized');
  });

  it("Shouldn't create a post with missing required field - misssing title", async () => {
    await UserModel.create(userData);

    const auth = await request(app)
      .post('/auth/signin')
      .set('content-type', 'application/json')
      .send({
        username: 'john@doe.com',
        password: 'john#123',
      });

    const res = await request(app)
      .post(`/api/v1/post/create`)
      .set('content-type', 'application/json')
      .set('authorization', 'Bearer ' + auth.body.token)
      .send({
        description: 'This is a draft post for testing purposes.',
        author: 'John Doe',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        tags: ['test', 'draft'],
      });

    expect(res.status).toBe(406);
    expect(res.text).toBe('"title" is required');
  });

  it("Shouldn't create a post with missing required field - missing description", async () => {
    await UserModel.create(userData);

    const auth = await request(app)
      .post('/auth/signin')
      .set('content-type', 'application/json')
      .send({
        username: 'john@doe.com',
        password: 'john#123',
      });

    const res = await request(app)
      .post(`/api/v1/post/create`)
      .set('content-type', 'application/json')
      .set('authorization', 'Bearer ' + auth.body.token)
      .send({
        title: 'Sample Draft Post',
        author: 'John Doe',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        tags: ['test', 'draft'],
      });

    expect(res.status).toBe(406);
    expect(res.text).toBe('"description" is required');
  });

  it("Shouldn't create a post with missing required field - misssing body", async () => {
    await UserModel.create(userData);

    const auth = await request(app)
      .post('/auth/signin')
      .set('content-type', 'application/json')
      .send({
        username: 'john@doe.com',
        password: 'john#123',
      });

    const res = await request(app)
      .post(`/api/v1/post/create`)
      .set('content-type', 'application/json')
      .set('authorization', 'Bearer ' + auth.body.token)
      .send({
        title: 'Sample Draft Post',
        description: 'This is a draft post for testing purposes.',
        author: 'John Doe',
        tags: ['test', 'draft'],
      });

    expect(res.status).toBe(406);
    expect(res.text).toBe('"body" is required');
  });

  it("Shouldn't create a post with missing required field - misssing tags", async () => {
    await UserModel.create(userData);

    const auth = await request(app)
      .post('/auth/signin')
      .set('content-type', 'application/json')
      .send({
        username: 'john@doe.com',
        password: 'john#123',
      });

    const res = await request(app)
      .post(`/api/v1/post/create`)
      .set('content-type', 'application/json')
      .set('authorization', 'Bearer ' + auth.body.token)
      .send({
        title: 'Sample Draft Post',
        description: 'This is a draft post for testing purposes.',
        author: 'John Doe',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      });

    expect(res.status).toBe(406);
    expect(res.text).toBe('"tags" is required');
  });

  /**
   * Publish and Unpublish Posst
   */

  it('Should publish post of an authenicated user ', async () => {
    const { _id } = await UserModel.create(userData);

    const data = posts.map((post) => {
      return { ...post, author: 'john doe', userid: _id };
    });

    const dbRes = await PostModel.create(data);

    const auth = await request(app)
      .post('/auth/signin')
      .set('content-type', 'application/json')
      .send({
        username: 'john@doe.com',
        password: 'john#123',
      });

    const res = await request(app)
      .put(`/api/v1/post/publish/${dbRes[0]._id}`)
      .set('content-type', 'application/json')
      .set('authorization', 'Bearer ' + auth.body.token);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('title');
    expect(res.body).toHaveProperty('description');
    expect(res.body).toHaveProperty('author');
    expect(res.body).toHaveProperty('tags');
    expect(res.body).toHaveProperty('state');
    expect(res.body.state).toBe('published');
    expect(res.body).toHaveProperty('userid');
    expect(res.body).toHaveProperty('updatedAt');
    expect(res.body).toHaveProperty('createdAt');
  });

  it('Should unpublish post of an authenicated user ', async () => {
    const { _id } = await UserModel.create(userData);

    const data = posts.map((post) => {
      return { ...post, author: 'john doe', userid: _id };
    });

    const dbRes = await PostModel.create(data);

    const auth = await request(app)
      .post('/auth/signin')
      .set('content-type', 'application/json')
      .send({
        username: 'john@doe.com',
        password: 'john#123',
      });

    const res = await request(app)
      .put(`/api/v1/post/unpublish/${dbRes[1]._id}`)
      .set('content-type', 'application/json')
      .set('authorization', 'Bearer ' + auth.body.token);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('title');
    expect(res.body).toHaveProperty('description');
    expect(res.body).toHaveProperty('author');
    expect(res.body).toHaveProperty('tags');
    expect(res.body).toHaveProperty('state');
    expect(res.body.state).toBe('draft');
    expect(res.body).toHaveProperty('userid');
    expect(res.body).toHaveProperty('updatedAt');
    expect(res.body).toHaveProperty('createdAt');
  });

  it("Shouldn't publish post of an unauthenicated user ", async () => {
    const { _id } = await UserModel.create(userData);

    const data = posts.map((post) => {
      return { ...post, author: 'john doe', userid: _id };
    });

    const dbRes = await PostModel.create(data);

    const res = await request(app)
      .put(`/api/v1/post/publish/${dbRes[0]._id}`)
      .set('content-type', 'application/json');

    expect(res.status).toBe(401);
    expect(res.text).toBe('Unauthorized');
  });

  it('Should unpublish post of an authenicated user ', async () => {
    const { _id } = await UserModel.create(userData);

    const data = posts.map((post) => {
      return { ...post, author: 'john doe', userid: _id };
    });

    const dbRes = await PostModel.create(data);

    const res = await request(app)
      .put(`/api/v1/post/unpublish/${dbRes[1]._id}`)
      .set('content-type', 'application/json');

    expect(res.status).toBe(401);
    expect(res.text).toBe('Unauthorized');
  });

  /**
   * update post
   */

  it('Should update post of an authenicated user ', async () => {
    const { _id } = await UserModel.create(userData);

    const data = posts.map((post) => {
      return { ...post, author: 'john doe', userid: _id };
    });

    const dbRes = await PostModel.create(data);

    const auth = await request(app)
      .post('/auth/signin')
      .set('content-type', 'application/json')
      .send({
        username: 'john@doe.com',
        password: 'john#123',
      });

    const res = await request(app)
      .patch(`/api/v1/post/update/${dbRes[0]._id}`)
      .set('content-type', 'application/json')
      .set('authorization', 'Bearer ' + auth.body.token)
      .send({
        description:
          'Become your best with this fullstact development road map',
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('Post updated successfully');
  });

  it("Shouldn't update post of an unauthenicated user ", async () => {
    const { _id } = await UserModel.create(userData);

    const data = posts.map((post) => {
      return { ...post, author: 'john doe', userid: _id };
    });

    const dbRes = await PostModel.create(data);

    const res = await request(app)
      .patch(`/api/v1/post/update/${dbRes[0]._id}`)
      .set('content-type', 'application/json')
      .send({
        description:
          'Become your best with this fullstact development road map',
      });

    expect(res.status).toBe(401);
    expect(res.text).toBe('Unauthorized');
  });

  /**
   * Delete post
   */
  it('Should delete post of an authenicated user ', async () => {
    const { _id } = await UserModel.create(userData);

    const data = posts.map((post) => {
      return { ...post, author: 'john doe', userid: _id };
    });

    const dbRes = await PostModel.create(data);

    const auth = await request(app)
      .post('/auth/signin')
      .set('content-type', 'application/json')
      .send({
        username: 'john@doe.com',
        password: 'john#123',
      });

    const res = await request(app)
      .delete(`/api/v1/post/${dbRes[0]._id}`)
      .set('content-type', 'application/json')
      .set('authorization', 'Bearer ' + auth.body.token)
      .send({
        description:
          'Become your best with this fullstact development road map',
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('Post deleted successfully');
  });

  it("Shouldn't delete post of an unauthenicated user ", async () => {
    const { _id } = await UserModel.create(userData);

    const data = posts.map((post) => {
      return { ...post, author: 'john doe', userid: _id };
    });

    const dbRes = await PostModel.create(data);

    const res = await request(app)
      .delete(`/api/v1/post/${dbRes[0]._id}`)
      .set('content-type', 'application/json')
      .send({
        description:
          'Become your best with this fullstact development road map',
      });

    expect(res.status).toBe(401);
    expect(res.text).toBe('Unauthorized');
  });
});
