const { AuthenticationError } = require('apollo-server-express');
const { ApolloError } = require('apollo-server-errors');
const { User, Property, Application } = require('../models');
const { signToken } = require('../utils/auth');
const { cloudinary } = require('../utils/cloudinary');

const resolvers = {
    Query: {
        user: async (parent, { id }) => {
            return await User.findOne({_id: id}).populate({
                path: 'current_property',
                populate: {
                    path: 'owner'
                }
            })
        },
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
        changePasssword: async (parent, {email, password, newPassword}, context) => {
            const user = await User.findOne({ email: email }).populate();
            console.log(user._id)
            if (!user) {
                throw new AuthenticationError('Incorrect Credentials');
            };
            const passCheck = await user.isCorrectPassword(password);

            if (!passCheck) {
                throw new AuthenticationError('Incorrect Credentials');
            }
            if(user._id === context.user._id) {
                const updateUser = User.findOneAndUpdate({email: email}, {password: newPassword})
                return updateUser;
            } throw new AuthenticationError('Contact Admin for help')


        },
        updateUser: async (parent, args, context) => {
            if (context.user) {
                try {
                    const imageString = args.input.image;
                    if (imageString.includes("the-little-guy/")) {
                        const user = await User.findOneAndUpdate({ _id: context.user._id }, { $set: args.input }, {new: true});
                     return user
                    } else {
                    const uploadedResponse = await cloudinary.uploader.
                        upload(imageString, {
                            upload_preset: 'usydr1v1'
                        });
                    const publicId = uploadedResponse.public_id;
                    args.input.image = publicId;
                    const user = await User.findOneAndUpdate({ _id: context.user._id }, { $set: args.input }, {new: true});
                     return user }
                } catch (error) {
                    console.log(error)
                }
            }
            throw new AuthenticationError('Not Logged In')
        },
        updateProperty: async (parent, { input }, context) => {
           const { _id  } = input;

            const { addressStreet, addressCity, addressState, addressZip, price, description } = input;

            if (context.user) {
                const property = await Property.findOneAndUpdate({ _id: _id }, { $set: { addressStreet, addressCity, addressState, addressZip, price, description }});

                return property;
            }
            throw new AuthenticationError('Not Logged In')
        },
        uploadImage: async (parent, args) => {
            try {
                const imageString = args.image;
                const uploadedResponse = await cloudinary.uploader.
                    upload(imageString, {
                        upload_preset: 'usydr1v1'
                    });
                const publicId = uploadedResponse.public_id;
                return publicId
            } catch (error) {
                console.log(error)
            }

        },
        addUserImage: async (parent, { cloudinaryId}, context) => {
            try {
                if (context.user) {
                    const image = await User.findOneAndUpdate({ _id: context.user._id }, { image: cloudinaryId });
                    if (!image) {
                        throw new ApolloError('We could not Process your request at this time!')
                    }
                    return cloudinaryId
                }
                throw new AuthenticationError('You must be logged in to edit this profile!')

            } catch (error) {
                console.log(error)
            }
        },
        addPropertyImage: async (parent, { cloudinaryId, _id }) => {
            try {
                /** HANDLE CLOUDINARY DELETE BEFORE UPDATING **/
                const property = await Property.findOne({ _id: _id });

                if(property.images.length > 0) {
                    await cloudinary.uploader.destroy(property.images[0], (err, res) => {
                        if(err) console.log(err);
                        else console.log(res);
                    });
                }

                /** TEMPORARILY ZERO OUT ARRAY, WILL IMPLEMENT MULTIPLE PICS AT A LATER DATE */
                await Property.findOneAndUpdate({ _id: _id }, { images: [] } );

                /** INSERT NEW CLOUDINARY LINK  */
                const image = await Property.findOneAndUpdate({ _id: _id }, { $push: { images: cloudinaryId } });
                if (!image) {
                    throw new ApolloError('We could not Process your request at this time!')
                }
                return cloudinaryId

            } catch (error) {
                console.log(error)
            }
        },
        deleteProperty: async (parent, { _id }, context) => {
            /*** THIS WILL ALSO HANDLE CLOUDINARY DELETE ****/

            try {
                if (context.user) {
                    //const user = await User.findOneDelete({ owned_properties: context.user._id });
                    const property = await Property.findOne({ _id: _id });

                    if(property.images.length > 0) {
                        await cloudinary.uploader.destroy(property.images[0], (err, res) => {
                            if(err) console.log(err);
                            else console.log(res);
                        });
                    }

                    const deleteProp = await Property.deleteOne({ _id: _id });

                    return deleteProp;
                }
                throw new AuthenticationError('Not Logged In')
            } catch (error) {
                throw new AuthenticationError('No property was found');
            }
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
        addProperty: async (parent, { input }, context) => {
            if(context.user) {
                const property = await Property.create({...input, ['owner']: context.user._id});
                return property;
            }
            throw new AuthenticationError('Not Logged In');
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
};

module.exports = resolvers;