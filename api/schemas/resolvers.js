const { AuthenticationError } = require('apollo-server-express');
const { User, Property } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (id) => {
            return await User.findByPk(id);
        },
        property: async (parent, { address }) => {
            const params = {};
            if (address) {
                params.address = address;
            }
            return await Property.find(params);
        },
        me: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findByPk(context.user._id).populate('Property').populate({
                    path: 'Property.Images',
                    populate: 'Images'
                })
                return user;
            }
            throw new AuthenticationError('Not Logged In');
        },
        myProperties: async (parent, args, context) => {
            if (context.user) {
                const userProperties = await Property.find({ owner: context.user._id }).populate('Images')
                return userProperties
            }
            throw new AuthenticationError('Not logged In!');
        },
        tenants: async (parent, args, context) => {
            if (context.user) {
                const userTenants = Property.find({ owner: context.user._id }).populate({
                    path: 'Property.tenant',
                    populate: 'User'
                });
                return userTenats;
            }
            throw new AuthenticationError('Not Logged In!');
        }
    },

    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect Credentials');
            };

            const passCheck = await user.isCorrectPassword(password);

            if (!passCheck) {
                throw new AuthenticationError('Incorrect Credentials');
            }

            const token = signToken(user);
            return { token, user };
        },
        signUp: async (parent, { input }) => {
            const newUser = await User.create(input);
            const token = await signToken(user);

            return { token, user };
        }
    }
};

module.exports = resolvers;