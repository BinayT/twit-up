import PostResolvers from './posts.js';
import UserResolvers from './users.js';
import CommentResolvers from './comments.js';

let query = {
  Post: {
    likeCount(parent) {
      console.log(parent);
      return parent.likes.length;
    },
    commentCount(parent) {
      return parent.comments.length;
    },
  },
  Query: {
    ...PostResolvers.Query,
  },
  Mutation: {
    ...UserResolvers.Mutation,
    ...PostResolvers.Mutation,
    ...CommentResolvers.Mutation,
  },
  Subscription: {
    ...PostResolvers.Subscription,
  },
};

export default query;
