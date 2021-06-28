const { Schema } = require('mongoose');

const propertySchema = new Schema({
    type: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    tenant: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
});

const Property = model('Property', propertySchema);

module.exports = Property;

// const { Schema, model } = require('mongoose');

// const propertySchema = new Schema({
//     addressStreet: {
//         type: String,
//         required: true
//     },
//     addressCity: {
//         type: String, 
//         required: true
//     },
//     addressState: {
//         type: String,
//         required: true
//     },
//     addressZip: {
//         type: String,
//         required: true
//     },

// });

// which values will we pull from API? 
