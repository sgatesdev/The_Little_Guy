/** COMBINE RESOLVERS HERE FOR EXPORT */

const { mergeResolvers } = require('@graphql-tools/merge');

const applicationResolvers = require('./applicationResolvers');
const imageResolvers = require('./imageResolvers');
const propertyResolvers = require('./propertyResolvers');
const userResolvers = require('./userResolvers');

const resolvers = [
  applicationResolvers,
  imageResolvers,
  propertyResolvers,
  userResolvers
];