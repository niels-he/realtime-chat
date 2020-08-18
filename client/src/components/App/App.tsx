import React, { FC } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import Chat from '../Chat/Chat';

const link = new WebSocketLink({
  uri: `ws://localhost:4000/`,
  options: {
    reconnect: true,
  },
});

const client = new ApolloClient({
  link,
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});

const App: FC = () => (
  <ApolloProvider client={client}>
    <Chat />
  </ApolloProvider>
);

export default App;
