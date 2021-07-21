const db = require('./config');
const { User } = require('../models')
const userData = require('./users.json');

/** SEEDER FILE - JUST DOING USERS FOR NOW */

db.once('open', async () => {
    await User.deleteMany({});
    await Property.deleteMany({});

    const allUsers = await User.create(userData);
    console.log('Users inserted! :)');

    process.exit();
})