/** APPLICATION RESOLVERS */

const { AuthenticationError } = require('apollo-server-express');
const { Application } = require('../../models');

module.exports = {
    Query: {
        myApplications: async (parent, args, context) => {
            if (context.user) {
                const allApplications = await Application.find({}).populate({
                    path: 'applicant',
                    populate: 'User'
                }).populate({
                    path: 'propertyId',
                    populate: 'Property',
                    populate: {
                        'path': 'owner'
                    }
                });

                let filtered = allApplications.filter((app) => app.propertyId.owner._id == context.user._id);

                return filtered;
            }
            throw new AuthenticationError('Not logged In!');
        } 
    },
    Mutation: {
        newApplication: async (parent, { input}, context) => {
            try {
                const application = await Application.create({...input});
                console.log(input)
                return application;
            } catch (error) {
                throw new Error
            }
        },
        updateApplication: async (parent, { _id, status }, context) => {
             if (context.user) {
                 const application = await Application.findOneAndUpdate({ _id: _id }, { $set: { status }});
 
                 return application;
             }
             throw new AuthenticationError('Not Logged In')
         }
    }
}