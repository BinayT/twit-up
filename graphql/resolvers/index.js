import PostResolvers from './posts.js';
import UserResolvers from './users.js';

let query = {
  Query: {
    ...PostResolvers.Query,
  },
  Mutation: {
    ...UserResolvers.Mutation,
  },
};

export default query;
