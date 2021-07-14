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
        images:[String]
        description: String
    }

    type Auth {
        token: ID
        user: User
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
    type Query {
        user(id:ID!): User
        me:User
        property(input: UpdatePropertyInput!): Property
        myProperties: [Property]
        myTenants: [User]
        allProperties: [Property]
        getRating(id: ID!): Float 
        findLandlord(input: UpdatePropertyInput!): User
    }
    type Mutation {
        login(email:String!, password:String!): Auth
        signUp(input: NewUserInput!): Auth
        uploadImage(image:String!):ID
        addUserImage(cloudinaryId: String): String
        addPropertyImage(_id: ID!, cloudinaryId: String): String
        updateProperties(_id: ID!, input: UpdatePropertyInput!): Property
        deleteProperty(_id: ID!): Property
        deleteUser: Auth
        addProperty(input: UpdatePropertyInput!): Property
    }

`;

module.exports = typeDefs;