import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server';

import { SECRET_KEY } from '../config.js';

let query = (context) => {
  //context = {... headers}
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    // Bearer token
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch (error) {
        throw new AuthenticationError('Invalid/Expired token');
      }
    }
    throw new Error("Authentication Token must be ' Bearer [token]");
  }
  throw new Error('Authorization Header must be provided');
};

export default query;
