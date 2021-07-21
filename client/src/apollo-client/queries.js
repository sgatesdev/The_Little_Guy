import { gql } from '@apollo/client';

/** PROPERTY QUERIES */

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
           owner {
           		firstName
            	lastName
           }
           images
       }
   }
`;

export const QUERY_MY_PROPERTIES = gql`
{
   myProperties {
            _id
            addressStreet
            addressCity
            addressState
            addressZip
            description
            tenant {
                firstName
                lastName
                email
            }
            price
            images
    }
}
`;

/** USER QUERIES */

export const QUERY_ME = gql`
{
    me {
        _id
        username
        firstName
        lastName
        email
        is_landlord
        image
        bio
        rating
        addressStreet
        addressCity
        addressState
        addressZip
        current_property {
            owner {
                firstName
                lastName
            }
            addressStreet
            addressCity
            addressState
            addressZip
            price
            images
            description
        }
    }
}
`;

/** APPLICATION QUERIES */

export const QUERY_APPLICATIONS = gql`
{
    myApplications {
        _id
        applicant {
          _id
          firstName
          lastName
        }
        grossAnnualIncome
        otherTenants
        creditScore
        employer
        typeOfEmployment
        addressStreet
        addressCity
        addressState
        addressZip
        propertyId {
            _id
            addressStreet
            addressCity
            addressState
            addressZip
            price
            images
            description
        }
        status
    }
}
`;