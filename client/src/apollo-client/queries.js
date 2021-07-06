import { gql } from '@apollo/client';

/**  single property
export const QUERY_PROPERTY = gql`

`;

// multiple properties
export const QUERY_PROPERTIES = gql`

`;
*/

export const QUERY_ALL_PROPERTIES = gql`
   {
       allProperties {
            _id
           addressStreet
           addressCity
           addressState
           addressZip
           price
           description
           imageLink {
            imageLink
          }
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

// query me
export const QUERY_ME = gql`
{
    me {
        _id
        username
        firstName
        lastName
        email
        is_landlord
    }
}
`;

/** single user
export const QUERY_USER = gql`
    
`;

// multiple users
export const QUERY_USERS = gql`
    
`;
*/

/**
 * 
 * Additional models/collections:
 * 1. Documents (lease, etc)
 * 2. Pictures
 * 
 */