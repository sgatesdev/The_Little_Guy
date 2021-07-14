const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const {User, Property} = require('./models/index')
const bodyParser = require('body-parser')

const { typeDefs, resolvers } = require('./schemas/index');
const { AuthMiddleware } = require('./utils/auth');
const db = require('./config/config');
const { cloudinary } = require('./utils/cloudinary');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: AuthMiddleware
});

server.applyMiddleware({ app, 
bodyParserConfig: {limit: '50mb'} });

app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb', parameterLimit: 50000, extended: true}));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')))
}
app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'))
});


db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
})