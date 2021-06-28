const { Schema} = require('mongoose');

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