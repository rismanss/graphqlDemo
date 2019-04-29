// @flow
import * as React from 'react';
import AppNav from './AppNav';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

export const link = createHttpLink({
  uri: 'http://192.168.1.7:4000/graphql',
});

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <AppNav/>
      </ApolloProvider>
    );
  }
}

export default App;
