import { gql } from '@apollo/client';

/** LOGIN */
export const LOGIN = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

/** USER MUTATIONS */

export const ADD_USER = gql`
 mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
    }
  }
`;

export const UPDATE_USER = gql`

`;

export const DELETE_USER = gql`

`;

/** PROPERTY MUTATIONS */

export const ADD_PROPERTY = gql`

`;

export const UPDATE_PROPERTY = gql`

`;

export const DELETE_PROPERTY = gql`

`;