const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID,
        username: String
        email: String!
        firstName: String!
        lastName: String!
        password: String!
        is_landlord: Boolean
        image: String
        rating: [Int]
        avarage: Int
        bio: String
        current_property: Property
        addressStreet: String
        addressCity: String
        addressState: String
        addressZip: String
    }
    
    type Property {
        _id: ID
        type: String!
        addressStreet: String!
        addressCity: String!
        addressState: String!
        addressZip: String!
        price: Int
        owner: User
        tenant: User
        images:[String]
        description: String
    }

    type Auth {
        token: ID
        user: User
    }

    input UpdatePropertyInput {
        _id: ID
        type: String
        addressStreet: String
        addressCity: String
        addressState: String
        addressZip: String
        price: Int
        owner: ID
        tenant: ID
        description: String
        images: [String]
    }

    input NewUserInput {
        firstName: String
        lastName: String
        email: String
        password: String
        username: String
        image: String
        is_landlord: Boolean
    }

    type TenantApplication {
        _id: ID
        applicant: User
        propertyId: Property 
        status: String
        addressStreet: String
        addressCity: String
        addressState: String
        addressZip: String
        grossAnnualIncome: Int
        otherTenants: Int
        creditScore: Int
        employer: String
        typeOfEmployment: String
    }

    input NewApplicationInput {
        applicant: ID
        propertyId: ID
        addressStreet: String
        addressCity: String
        addressState: String
        addressZip: String
        grossAnnualIncome: Int
        otherTenants: Int
        creditScore: Int!
        employer: String
        typeOfEmployment: String
    }

    input UpdateUserInput {
        firstName: String
        lastName: String
        bio: String
        image: String
    }

    type Query {
        user(id:ID!): User
        me:User
        property(input: UpdatePropertyInput!): Property
        myProperties: [Property]
        myTenants: [User]
        allProperties: [Property]
        getRating(id: ID!): Float 
        findLandlord(input: UpdatePropertyInput!): User
        myApplications: [TenantApplication]
    }

    type Mutation {
        login(email:String!, password:String!): Auth
        signUp(input: NewUserInput!): Auth
        uploadImage(image:String!):ID
        addUserImage(cloudinaryId: String): String
        addPropertyImage(_id: ID!, cloudinaryId: String): String
        updateUser(input: UpdateUserInput!): User
        changePasssword(email:String!, password:String!, newPassword: String!): User
        updateProperty(input: UpdatePropertyInput!): Property
        deleteProperty(_id: ID!): Property
        deleteUser: Auth
        addProperty(input: UpdatePropertyInput!): Property
        newApplication(input: NewApplicationInput!): TenantApplication
        updateApplication(_id: ID!, status: String!): TenantApplication
        updateTenant(_id: ID!, tenant: ID!): Property
    }
`;

module.exports = typeDefs;