/** COMBINE RESOLVERS HERE FOR EXPORT */

const { mergeResolvers } = require('@graphql-tools/merge');

const applicationResolvers = require('./resolvers/applicationResolvers');
const imageResolvers = require('./resolvers/imageResolvers');
const propertyResolvers = require('./resolvers/propertyResolvers');
const userResolvers = require('./resolvers/userResolvers');

const resolvers = mergeResolvers([
  applicationResolvers,
  imageResolvers,
  propertyResolvers,
  userResolvers
]);

module.exports = resolvers;