import { ApolloServer } from 'apollo-server';
import gql from 'graphql-tag';
import mongoose from 'mongoose';

import Post from './models/Post.js';
import { MONGO_URI } from './config.js';

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }
  type Query {
    getPosts: [Post]
  }
`;

const resolvers = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find();
        return posts;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected');
    server.listen({ port: 5000 });
  })
  .then(() => console.log('Server Running on Port 5000'));
