const { Schema, model } = require('mongoose');
const bcrypt = require('bcypt');

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
    address: {
        type: String,
        default: '',
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
    ]
    


});

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });
  
  userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };
  

const User = model('User', userSchema);

module.exports = User;