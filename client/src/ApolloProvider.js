import React from 'react';
import App from './App';
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from '@apollo/client';
import { setContext } from 'apollo-link-context';

const cache = new InMemoryCache();
const link = createHttpLink({
  uri: 'http://localhost:5000',
  headers: { authorization: `bearer [token]` },
});

const authLink = setContext(() => {
  const token = localStorage.getItem('jwtToken');
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  cache,
  link: authLink.concat(link),
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
