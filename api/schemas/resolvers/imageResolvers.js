/** IMAGE RESOLVERS */

const { AuthenticationError } = require('apollo-server-express');
const { ApolloError } = require('apollo-server-errors');
const { User, Property } = require('../../models');
const { cloudinary } = require('../../utils/cloudinary');

module.exports = {
    Mutation: {
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

        }
    }
}