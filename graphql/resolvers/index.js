import PostResolvers from './posts.js';
import UserResolvers from './users.js';

let query = {
  Query: {
    ...PostResolvers.Query,
  },
  Mutation: {
    ...UserResolvers.Mutation,
    ...PostResolvers.Mutation,
  },
};

export default query;
