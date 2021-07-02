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
        imageLink: [Image]
        description: String
    }
    type Image {
        imageLink: String
    }

    type Auth {
        token: ID
        user: User
    }
    input NewUserInput {
        firstName: String
        lastName: String
        email: String
        password: String
    }

    type Query {
        user(_id:ID!): User
        me:User
        property(address: String): Property
        myProperties: Property
        myTenants: Property
        allProperties: [Property]
    }
    input UpdatePropertyInput {
        type: String!
        addressStreet: String!
        addressCity: String!
        addressState: String!
        addressZip: String!
        price: Int!
        owner: ID
        tenant: ID
        imageLink: [String]
        description: String
    }
    
    input NewUserInput {
        firstName: String
        lastName: String
        email: String
        password: String
        username: String
        is_landlord: Boolean
    }
# need to set up all new mutations tomorrow
    type Mutation {
        login(email:String!, password:String!): Auth
        signUp(input: NewUserInput!): Auth
        updateMyProperties(_id: ID!, input: UpdatePropertyInput!): Property
        updateMySavedProperties: Property
        findProperty(address: String!): Property
        findLanlord: User
        deleteProperty: User
        deleteUser: Auth
    }

`;

module.exports = typeDefs;