const commentsRouter = require('express').Router();
const Blog = require('../models/blog');
const Comment = require('../models/comment');

commentsRouter.get('/:id/comments', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('comments');
  response.json(blog.comments);
});

commentsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body;
  const id = request.params.id;

  const blog = await Blog.findById(id);

  const comment = new Comment({
    content: body.content,
  });

  const savedComment = await comment.save();
  blog.comments = blog.comments.concat(savedComment.id);
  await blog.save();

  response.status(201).json(savedComment);
});

module.exports = commentsRouter;
