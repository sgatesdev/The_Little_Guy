/**
 * 
 * 
 * If we decide to split files up, they will be merged here as follows...
 * 
 * // ./graphql/resolvers/index.js
const { mergeResolvers } = require('@graphql-tools/merge');
const clientResolver = require('./clientResolver');
const productResolver = require('./productResolver');

const resolvers = [
  clientResolver,
  productResolver,
];

module.exports = mergeResolvers(resolvers);
 * 
 * 
 */