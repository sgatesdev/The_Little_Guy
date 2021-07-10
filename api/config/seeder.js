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
        console.log(user._id);
        propertyData[i].owner = user._id;
        propertyData[10].tenant = allUsers[3]._id;
        propertyData[11].tenant = user._id;
        propertyData[12].tenant = user._id;
        propertyData[0].owner = allUsers[0]._id;
    }

    // simple test case
    await User.create(    {
        "password": "password",
        "firstName": "Test",
        "lastName": "Tenant",
        "username": "testT",
        "email": "testT@test.com"
    },
    {
        "password": "password",
        "firstName": "Test",
        "lastName": "Landlord",
        "username": "testL",
        "email": "testL@test.com",
        "is_landlord": true
    });
    
    console.log('Users inserted! :)');
    const allProperties = await Property.insertMany(propertyData);
    console.log('Properties Inserted! :)');
    await User.create( {
        "password": "pass123",
        "firstName": "testing",
        "lastName": "login",
        "username": "loginUsername",
        "email": "testingLogin@email.com",
        "current_property": allProperties[0]._id
    })
    
    process.exit();
})