/**
 * Apollo Client config file
 */

import {
    ApolloClient,
    InMemoryCache,
    createHttpLink,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

import { getToken } from '../utils/token';

export const httpLink = createHttpLink({
    uri: '/graphql',
});
  
export const authLink = setContext((_, { headers }) => {
  const token = getToken();
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