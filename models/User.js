const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    phoneNumber: String,
    dateOfBirth: Date,
    address: {
        street: String,
        city: String,
        province: String,
        postalCode: String
    },
    schoolInfo: {
        schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School' },
        schoolName: String,
        class: String,
        academicYear: String
    },
    role: { 
        type: String, 
        enum: ['STUDENT', 'TEACHER', 'ADMIN'], 
        default: 'STUDENT' 
    },
    isVerified: { type: Boolean, default: false },
    verificationToken: String,
    profilePicture: String,
    lastLogin: Date,
    status: { 
        type: String, 
        enum: ['ACTIVE', 'SUSPENDED', 'INACTIVE'], 
        default: 'ACTIVE' 
    }
}, { timestamps: true });

userSchema.pre('save', async function() {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
