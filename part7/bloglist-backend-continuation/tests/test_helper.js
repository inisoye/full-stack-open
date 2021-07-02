const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
  {
    title: 'What shall we do now?',
    author: 'Fimibayo Beunaon',
    url: 'anything.com',
    likes: 14,
    id: '6024ce4a2994ce2218bc1b2d',
  },
  {
    title: 'Will this one work?',
    author: 'Shagbanala Loriro',
    url: 'firaz.com',
    likes: 3,
    id: '6026fbd25b71ed23f7245329',
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'willremovethissoon',
    author: 'remove person',
    url: 'removed.link',
    likes: 0,
  });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
};
