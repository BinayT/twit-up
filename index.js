import { ApolloServer, PubSub } from 'apollo-server';
import mongoose from 'mongoose';

import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers/index.js';
import { MONGO_URI } from './config.js';

const pubsub = new PubSub();

const port = process.env.PORT || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected');
    server.listen({ port });
  })
  .then(() => console.log('Server Running on Port 5000'))
  .catch((err) => {
    console.err(err);
  });
