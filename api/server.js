const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

const { typeDefs, resolvers } = require('./schemas/index');
const { AuthMiddleware } = require('./utils/auth');
const db = require('./config/config');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: AuthMiddleware
});

server.applyMiddleware({ app });

app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb'}));

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build' )))
}
app.get('/', (req, res ) => {
    res.sendFile(path.join(publicPath, 'index.html'))
});
app.post('/api/uploadImage', async (req, res) => {
    try{
        const imageString = req.body.data;
        const uploadedResponse = await cloudinary.uploader.
        upload(imageString, {
            upload_preset: 'usydr1v1'
        })

    } catch (err) {
        console.log(err);
    }
})

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
})