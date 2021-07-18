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

// get my applications
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
        pets
        propertyId {
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