const { Schema, model } = require('mongoose');

const applicationSchema = new Schema({

    applicantFirstName: {
        type: String,
        required: true,
        trim: true
    },
    applicantMiddleInitial: {
        type: String,
        required: true,
        trim: true,
        maxlength: 3,
    },
    applicantLastName: {
        type: String,
        required: true,
        trim: true
    },
    grossAnnualIncome: {
        type: Number,
        required: true,
    },
    applicantCurrentAddress: {
        type: Schema.Types.ObjectId,
        ref: 'User'
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
    otherTenants: [
        {
            type: String
        }
    ],
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