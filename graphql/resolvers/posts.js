import Post from '../../models/Post.js';

let query = {
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

export default query;
