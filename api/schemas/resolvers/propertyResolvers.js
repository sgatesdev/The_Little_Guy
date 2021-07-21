/** PROPERTY RESOLVERS */

const { AuthenticationError } = require('apollo-server-express');
const { User, Property } = require('../../models');
const { cloudinary } = require('../../utils/cloudinary');

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
        allProperties: async (parent, args) => {
            try {
                const allProperties = await Property.find().populate({
                    path: 'owner',
                    populate: 'User'
                }).limit(20).sort({ _id: -1 });

                return allProperties;
            } catch (error) {
                throw new AuthenticationError('No Properties found');
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
        }
    },
    Mutation: {
        updateProperty: async (parent, { input }, context) => {
            const { _id  } = input;
 
             const { addressStreet, addressCity, addressState, addressZip, price, description } = input;
 
             if (context.user) {
                 const property = await Property.findOneAndUpdate({ _id: _id }, { $set: { addressStreet, addressCity, addressState, addressZip, price, description }});
 
                 return property;
             }
             throw new AuthenticationError('Not Logged In')
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
        addProperty: async (parent, { input }, context) => {
            if(context.user) {
                const property = await Property.create({...input, ['owner']: context.user._id});
                return property;
            }
            throw new AuthenticationError('Not Logged In');
        },
        updateTenant: async (parent, { _id, tenant }, context) => {
            if (context.user) {
                const userUpdate = await User.findOneAndUpdate({ _id: tenant }, { $set: { current_property: _id } });

                const property = await Property.findOneAndUpdate({ _id: _id }, { $set: { tenant: tenant }});

                return property;
            }
            throw new AuthenticationError('Not Logged In')
        }
    }
}