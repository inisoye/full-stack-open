const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');
const api = supertest(app);

const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();

  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();
});

// Increase timeout from 5s to 30s to prevent tests from failing due to poor connection
jest.setTimeout(30000);

describe('when there are some initially saved blog posts', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs');

    const titles = response.body.map((r) => r.title);

    expect(titles).toContain('What shall we do now?');
  });

  test('unique identifier is id', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body[0].id).toBeDefined();
  });
});

describe('when viewing a single blog post', () => {
  test('single blog post can be viewed with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb();

    const blogToView = blogsAtStart[0];

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView));

    expect(resultBlog.body).toEqual(processedBlogToView);
  });

  test('fails with statuscode 404 if blog post does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId();

    await api.get(`/api/blogs/${validNonexistingId}`).expect(404);
  });

  test('fails with statuscode 400 id is invalid', async () => {
    const invalidId = '763737786736763';

    await api.get(`/api/blogs/${invalidId}`).expect(400);
  });
});

describe('when adding a new blog post', () => {
  test('a valid blog post can be added ', async () => {
    const newBlog = {
      title: 'This is a sample',
      author: 'Lagadiz Lagadat',
      url: 'bloomz.com',
      likes: 4,
      id: '602682734872842112',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((n) => n.title);
    expect(titles).toContain('This is a sample');
  });

  test('missing likes property defaults to zero', async () => {
    const newBlogWithoutLikes = {
      title: 'This has no likes',
      author: 'Lagadiz Lagadat',
      url: 'bloomz.com',
      id: '561782734871678198',
    };

    await api
      .post('/api/blogs')
      .send(newBlogWithoutLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    const lastAddedBlog = blogsAtEnd[blogsAtEnd.length - 1];
    expect(lastAddedBlog.likes).toEqual(0);
  });

  test('a blog with no title or url is not added', async () => {
    const newBlogWithoutUrlAndTitle = {
      author: 'Lagadeez Lagadaet',
      id: '1231827348971678123',
    };

    await api.post('/api/blogs').send(newBlogWithoutUrlAndTitle).expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

describe('when deleting a blog post', () => {
  test('a blog post can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogPostToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogPostToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const ids = blogsAtEnd.map((blogPost) => blogPost.id);

    expect(ids).not.toContain(blogPostToDelete.id);
  });
});

describe('when updating likes of a blog post', () => {
  test('updates can be successfully conducted', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogPostToUpdate = blogsAtStart[0];

    await api
      .put(`/api/blogs/${blogPostToUpdate.id}`)
      .send({ likes: 9 })
      .expect(200);

    const blogsAtEnd = await helper.blogsInDb();

    const updatedBlog = blogsAtEnd[0];

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

    expect(updatedBlog.likes).toBe(9);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
