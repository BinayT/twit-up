import React from 'react';
import App from './App';
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from '@apollo/client';

const cache = new InMemoryCache();
const link = createHttpLink({
  uri: 'http://localhost:5000/',
});

const client = new ApolloClient({
  cache,
  link,
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
