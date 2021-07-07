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
        rating: [Int]
        avarage: Int
        current_property: Property
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
    type Query {
        user(_id:ID!): User
        me:User
        property(input: UpdatePropertyInput!): Property
        myProperties: [Property]
        myTenants: [User]
        allProperties: [Property]
        # use aggragete to avarage up rating array
        getRating(id: ID!): User  
        findLandlord(input: UpdatePropertyInput!): User
    }
    
    input UpdatePropertyInput {
        type: String
        addressStreet: String
        addressCity: String
        addressState: String
        addressZip: String
        price: Int
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
        deleteProperty(_id: ID!): Property
        deleteUser: Auth
    }

`;

module.exports = typeDefs;