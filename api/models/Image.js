const { Schema } = require('mongoose');

const imageSchema = new Schema({
    image_url: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        required: true
    }
});

const Image = model('Image', imageSchema);

module.exports = Image;