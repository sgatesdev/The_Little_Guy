const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID,
        username: string
    }

    type Property {
        _id: ID,
        address: String,
    }

    type Query {
        user: User,
        property(address: String): Property, 
    }

`;

module.exports = typeDefs;