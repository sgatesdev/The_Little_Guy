module.exports = {
    Query: {
        property: async (parent, { input }) => {
            const property = await Property.findOne(
                {
                    addressStreet: input.addressStreet,
                    addressCity: input.addressCity,
                    addressState: input.addressState,
                    addressZip: input.addressZip,
                }
            ).populate({
                path: 'owner',
                populate: 'User'
            });
            if (!property) throw new AuthenticationError('No property found')
            return property
        },
        allProperties: async (parent, args) => {
            try {
                const allProperties = await Property.find().populate({
                    path: 'owner',
                    populate: 'User'
                }).limit(20);

                return allProperties;
            } catch (error) {
                throw new AuthenticationError('No Properties found');
            }
        },
    },
    Mutation: {
        addProperty: async (parent, { input }, context) => {
            if(context.user) {
                const property = await Property.create({...input, ['owner']: context.user._id});
                return property;
            }
            throw new AuthenticationError('Not Logged In');
        },
        updateProperties: async (parent, args, context) => {
            if (context.user) {
                const property = await Property.findOneAndUpdate({ _id: args.id }, { $set: args.input });
                return property;
            }
            throw new AuthenticationError('Not Logged In')
        },
        deleteProperty: async (parent, { _id }, context) => {
            try {
                if (context.user) {
                    const user = await User.findOneDelete({ owned_properties: context.user._id });
                    const property = await Property.deleteOne({ _id: _id });

                    return property;
                }
                throw new AuthenticationError('Not Logged In')
            } catch (error) {
                throw new AuthenticationError('No property was found');
            }
        },
        newApplication: async (parent, { input}, context) => {
            try {
                const application = await Application.create({...input});
                return application
            } catch (error) {
                throw new Error
            }
        },
    }
}