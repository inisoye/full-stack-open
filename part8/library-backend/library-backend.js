const { ApolloServer, gql } = require('apollo-server');
const { v1: uuid } = require('uuid');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const Author = require('./models/author');
const Book = require('./models/book');

const mongoURI = process.env.MONGO_URI;

console.log('connecting to', mongoURI);

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message);
  });

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]
    ): Book

    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),

    authorCount: () => Author.collection.countDocuments(),

    allBooks: async (root, args) => {
      const books = await Book.find({}).populate('author');

      const filterAuthor = (b) => b.author.name === args.author;
      const filterGenre = (b) => b.genres.includes(args.genre);

      if (!args.author && !args.genre) return books;
      if (args.author && !args.genre) return books.filter(filterAuthor);
      if (!args.author && args.genre) return books.filter(filterGenre);
      if (args.author && args.genre)
        return books.filter(filterAuthor).filter(filterGenre);
    },

    allAuthors: () => Author.find({}),
  },

  Author: {
    bookCount: async (root) => {
      const books = await Book.find({}).populate('author');
      // Get array of author names from books
      const listOfAuthors = books.map((book) => book.author);
      // Count number of times each (author) name occurs in above arrray
      return listOfAuthors.filter((a) => a.name === root.name).length;
    },
  },

  Mutation: {
    addBook: async (root, args) => {
      const savedAuthor = await Book.findOne({ name: args.author });
      const authorIsSavedAlready = Boolean(savedAuthor);

      if (!authorIsSavedAlready) {
        const newAuthor = new Author({ name: args.author });
        const newBook = new Book({ ...args, author: newAuthor });

        try {
          await newAuthor.save();
          await newBook.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }

        return newBook;
      }

      if (authorIsSavedAlready) {
        const newBook = new Book({ ...args, author: savedAuthor });

        try {
          await newBook.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }

        return newBook;
      }
    },

    editAuthor: async (root, args) => {
      const authorToEdit = await Author.findOne({ name: args.name });

      if (!authorToEdit) return null;

      // Edit author's birthyear
      authorToEdit.born = args.setBornTo;

      try {
        await authorToEdit.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      return authorToEdit;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
