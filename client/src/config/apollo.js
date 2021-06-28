/**
 * Apollo Client config file
 */

import {
    ApolloClient,
    InMemoryCache,
    createHttpLink,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: '/graphql',
});
  
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('little_guy_token');
  return {
    headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
        },
    };
});
  
export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});