const {
  ApolloServer,
  UserInputError,
  AuthenticationError,
  gql,
} = require('apollo-server');
const { v1: uuid } = require('uuid');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { PubSub } = require('graphql-subscriptions');
require('dotenv').config();

const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');

const pubsub = new PubSub();

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

// mongoose.set('debug', true);

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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]
    ): Book

    editAuthor(name: String!, setBornTo: Int!): Author

    createUser(username: String!, favoriteGenre: String!): User

    login(username: String!, password: String!): Token
  }

  type Subscription {
    bookAdded: Book!
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

    allAuthors: async (root) => {
      const authors = await Author.find({});
      const books = await Book.find({}).populate('author');

      return authors.map((author) => {
        const bookCount = books
          .map((b) => b.author)
          .filter((a) => a.name === author.name).length;

        return {
          name: author.name,
          born: author.born,
          bookCount,
          id: author._id,
        };
      });
    },

    me: (root, args, context) => context.currentUser,
  },

  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      const savedAuthor = await Author.findOne({ name: args.author });
      const authorIsSavedAlready = Boolean(savedAuthor);

      if (!currentUser) throw new AuthenticationError('not authenticated');

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

        pubsub.publish('BOOK_ADDED', { bookAdded: newBook });

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

        pubsub.publish('BOOK_ADDED', { bookAdded: newBook });

        return newBook;
      }
    },

    editAuthor: async (root, args, { currentUser }) => {
      const authorToEdit = await Author.findOne({ name: args.name });

      if (!currentUser) throw new AuthenticationError('not authenticated');

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

    createUser: async (root, args) => {
      const user = new User({ ...args });

      try {
        return user.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials');
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`);
  console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});
