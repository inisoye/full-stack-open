const config = require('./utils/config');
const express = require('express');
const app = express();
require('express-async-errors');
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const blogsRouter = require('./controllers/blogs');

const mongoURI = config.MONGO_URI;

logger.info('connecting to', mongoURI);

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/blogs', blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
