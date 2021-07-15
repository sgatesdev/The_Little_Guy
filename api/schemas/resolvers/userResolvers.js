module.exports = {
    Query: {
        user: async (parent, { id }) => {
            return await User.findOne({_id: id}).populate({
                path: 'current_property',
                populate: {
                    path: 'owner'
                }
            })
        },
        me: async (parent, args, context) => {
            if (context.user) {

                const user = await User.findOne({ _id: context.user._id }).populate({
                    path: 'current_property',
                    populate: {
                        path: 'owner'
                    }
                });

                return user;
            } 
            throw new AuthenticationError('Not Logged In');
        },
        myProperties: async (parent, args, context) => {
            if (context.user) {
                const userProperties = await Property.find({ owner: context.user._id }).populate({
                    path: 'tenant',
                    populate: 'User'
                });
                
                return userProperties;

            }
            throw new AuthenticationError('Not logged In!');
        },
        myTenants: async (parent, args, context) => {
            if (context.user) {
                const userTenants = await Property.find({ owner: context.user._id }).populate({
                    path: 'tenant',
                    populate: 'User'
                });
                let tenants = [];
                userTenants.forEach((property) => tenants.push(property.tenant))
                return tenants;
            }
            throw new AuthenticationError('Not Logged In!');
        },
        getRating: async (parent, { id }) => {
            try {
                const userRating = await User.findById(id);
                let rating = userRating.rating;
                let total = rating.reduce((total, num) => num + total);
                let avg = total / rating.length;
                return avg
            } catch (error) {
                console.log(error)
                throw new AuthenticationError('There are no rating yet!')
            }
        },
        findLandlord: async (parent, { input }) => {
            try {
                const property = await Property.findOne(
                    {
                        addressStreet: input.addressStreet,
                        addressCity: input.addressCity,
                        addressState: input.addressState,
                        addressZip: input.addressZip,
                    }).populate({
                        path: 'owner',
                        populate: 'User'
                    });
                const { owner } = property;
                return owner
            } catch (error) {
                throw new AuthenticationError('No property found')
            }
        },
    },
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email: email }).populate({
                path: 'current_property',
                populate: 'Property',
                populate: {
                    path: 'owner',
                    model: 'User'
                }
            });

            if (!user) {
                throw new AuthenticationError('user not found');
            };

            const passCheck = await user.isCorrectPassword(password);

            if (!passCheck) {
                throw new AuthenticationError('password wrong');
            }

            const token = signToken(user);
            return { token, user };
        },
        signUp: async (parent, { input }) => {
            const { username, email } = input;

            // make sure username and email are unique 

            //const checkUser = await User.findOne({ username });
            //if(checkUser) {
            //    throw new ApolloError('Username already exists!');
            //}

            const checkEmail = await User.findOne({ email });
            if (checkEmail) {
                throw new ApolloError('Email already exists!');
            }

            // they are unique, so create the user
            const user = await User.create(input);
            const token = signToken(user);

            return { token, user };
        },
        deleteUser: async (parent, context) => {
            try {
                if (context.user) {
                    const user = await User.findByIdAndDelete(context.user._id);
                    const token = ''
                    return { token, user }
                }
                throw new AuthenticationError('Not Logged In')
            } catch (error) {
                throw new AuthenticationError(error);
            }
        },
    }
}