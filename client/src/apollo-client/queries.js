import { gql } from '@apollo/client';

// single property
export const QUERY_PROPERTY = gql`

`;

// multiple properties
export const QUERY_PROPERTIES = gql`

`;

export const QUERY_ALL_PROPERTIES = gql`
   {
       properties {
           _id
           addressStreet
           addressCity
           addressState
           addressZip
           price
           imageLink
       }
   }
`;

export const QUERY_MY_PROPERTIES = gql`
   query getMyProperties($user: ID) {
        properties(owner: $user) {
            _id
            addressStreet
            addressCity
            addressState
            addressZip
            tenant {
                firstName
                lastName
                email
            }
            price
            imageLink
        }
    }
`;

// single user
export const QUERY_USER = gql`
    
`;

// multiple users
export const QUERY_USERS = gql`
    
`;

/**
 * 
 * Additional models/collections:
 * 1. Documents (lease, etc)
 * 2. Pictures
 * 
 */