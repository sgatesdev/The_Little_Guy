const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID,
        username: String
        email: String!
        firstName: String!
        lastName: String!
        password: String!
    }

    type Property {
        _id: ID
        address: String
    }
    type Auth {
        token: ID
        user: User
    }

    type Query {
        user(_id:ID!): User
        me:User
        property(address: String): Property
        myProperties: Property
        tenants(_id: ID!): Property
    }
    input NewUserInput {
        firstName: String
        lastName: String
        email: String
        password: String
    }

    type Mutation {
        login(email:String!, password:String!): Auth
        signUp(input: NewUserInput): Auth

    }

`;

module.exports = typeDefs;