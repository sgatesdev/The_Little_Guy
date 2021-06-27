const { Schema, model } = require('mongoose');

const propertySchema = new Schema({
    addressStreet: {
        type: String,
        required: true
    },
    addressCity: {
        type: String, 
        required: true
    },
    addressState: {
        type: String,
        required: true
    },
    addressZip: {
        type: String,
        required: true
    },
    
});

// which values will we pull from API? 