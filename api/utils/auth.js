const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.TOKEN_SECRET;
const experitation = '2h';

module.exports = {
    AuthMiddleware: async function ({ req }) {
        let token = req.body.token || req.query.token || req.headers.authorization;

        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }

        if (!token) return req;

        try {
            const { data } = jwt.verify(token, secret, { maxAge: experitation });
            req.user = data;
        } catch (error) {
            console.log('Invalid Token');
        }
        return req;
    },
    signToken: function ({ username, email, _id }) {
        const payload = { username, email, _id };

        return jwt.sign({ data: payload }, secret, { expiresIn: experitation })
    }
};