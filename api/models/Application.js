const { Schema, model } = require('mongoose');

const applicationSchema = new Schema({
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
    otherTenants: {
        type: Number
    },
    creditScore: {
        type: Number
    },
    employer: {
        type: String,
        trim: true,
        default: '',
    },
    typeOfEmployment: {
        type: String
    },
    status: {
        type: String,
        trim: true,
    },
    pets: {
        type: Number
    }
},
{
    timestamps: true
});

const Application = model('Application', applicationSchema);

module.exports = Application;