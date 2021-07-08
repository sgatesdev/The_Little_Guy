const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const Property = require('./Property');

const validEmail = (email) => {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: 'Please provide an email',
        email: true,
        unique: true,
        validate: [validEmail, 'Please fill in a valid email.'],
        trim: true,
        lowercase: true
    },
    is_landlord: {
        type: Boolean,
        default: false
    },

    bio: {
        type: String,
        required: true
    },

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
    saved_properties: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Property'
        }
    ],
    current_property: {
        type: Schema.Types.ObjectId,
        ref: 'Property'
    },
    owned_properties: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Property'
        }
    ],
    image: 
        {
        type: String,
        },
    rating: [Number]
},
    {
        timestamps: true
    });

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

userSchema.pre('remove', async function (next) {
    Property.remove({owner: this._id}.exec());
    next()
});


userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};


const User = model('User', userSchema);

module.exports = User;