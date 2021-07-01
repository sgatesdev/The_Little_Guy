const db = require('./config');
const { User, Property, Image } = require('../models')
const userData = require('./users.json');
const propertyData = require('./properties.json')

db.once('open', async () => {
    await User.deleteMany();

    const allUsers = await User.create(userData);
    console.log('Users inserted! :)');

    await Property.deleteMany();

    for (let i = 0; i < allUsers.length; i++) {
        const user = allUsers[i];
        propertyData[i].owner = user._id;
        propertyData[10].tenant = user._id;
        propertyData[11].tenant = user._id;
        propertyData[12].tenant = user._id;
    }

    // simple test case
    await User.create(    {
        "password": "password",
        "firstName": "Sammy",
        "lastName": "G",
        "username": "samg",
        "email": "sam@test.com"
    });

    console.log('Users inserted! :)');

    await Property.deleteMany();

    await Property.insertMany(propertyData);
    console.log('Properties Inserted! :)');

    process.exit();
})