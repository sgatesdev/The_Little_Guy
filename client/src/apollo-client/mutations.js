import { gql } from '@apollo/client';

/** LOGIN */
export const LOGIN = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        username
        is_landlord
      }
    }
  }
`;

/** USER MUTATIONS */

export const SIGN_UP = gql`
 mutation(
   $firstName: String!,
   $lastName: String!,
   $email: String!,
   $password: String!,
   $username: String!
   ){
    signUp(input: {
      firstName: $firstName,
      lastName: $lastName,
      email: $email,
      password: $password,
      username: $username,
    }) {
      token
      user {
        _id
      }
    }
  }
`;

/** 

export const UPDATE_USER = gql`

`;

export const DELETE_USER = gql`

`;
**/

/** PROPERTY MUTATIONS

export const ADD_PROPERTY = gql`

`;

export const UPDATE_PROPERTY = gql`

`;

export const DELETE_PROPERTY = gql`

`;
**/