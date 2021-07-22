/** USER RESOLVERS */

const { AuthenticationError } = require('apollo-server-express');
const { ApolloError } = require('apollo-server-errors');
const { User } = require('../../models');
const { signToken } = require('../../utils/auth');
const { cloudinary } = require('../../utils/cloudinary');

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
        }
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

            if(user._id == context.user._id) {

                await user.changePassword(newPassword);
                const updatedUser = user.save();

                return updatedUser;
            } throw new AuthenticationError('Contact Admin for help')
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
        }
    }
}