const { Schema, model } = require('mongoose');

const applicationSchema = new Schema({
    status: {
        type: String, 
        required: false
    },
    propertyId: {
        type: Schema.Types.ObjectId,
        ref: 'Property'
    },
    applicant: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    grossAnnualIncome: {
        type: Number,
        required: true,
    },
    addressStreet: {
        type: String,
        required: false
    },
    addressCity: {
        type: String,
        required: false
    },
    addressState: {
        type: String,
        required: false
    },
    addressZip: {
        type: String,
        required: false
    },
    // applicantNewAddress: {
    //     type: [
    //         {
    //             addressStreet: String,
    //             addressCity: String,
    //             addressState: String,
    //             addressZip: String,
    //         }
    //     ],
    //     validate: [1, 'applicantNewAddress has an address set for this user']
    // },
    otherTenants: {
        type: Number
    },
    creditScore: {
        type: Number,
        required: true,
        min: 500,
        max: 800,
        default: 500,
        trim: true,
    },
    employer: {
        type: String,
        trim: true,
        default: '',
    },
    typeOfEmployment: {
        type: String,
        enum: ['self-employed', 'employed', 'unemployed'],
        default: 'employed'
    },
    pets: {
        type: [
            {
                type: String,
                trim: true
            }
        ],
        default: [null]
    }
});

const Application = model('Application', applicationSchema);

module.exports = Application;