const { AuthenticationError} = require('apollo-server-express');
const { User, Property } = require('../models');

const resolvers = {
    Query: {
        user: async () => {
            return await User.findByPk(1);
        },
        property: async (parent, { address }) => {
            const params = {};
            if(address) {
                params.address = address;
            }
            return await Property.find(params);
        }
    },
};

module.exports = resolvers;