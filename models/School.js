const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
    name: { type: String, required: true },
    npsn: { type: String, unique: true },
    address: {
        street: String,
        city: String,
        province: String,
        postalCode: String
    },
    schoolType: { 
        type: String, 
        enum: ['NEGERI', 'SWASTA'] 
    },
    accreditation: String,
    phone: String,
    email: String,
    website: String
}, { timestamps: true });

module.exports = mongoose.model('School', schoolSchema);
