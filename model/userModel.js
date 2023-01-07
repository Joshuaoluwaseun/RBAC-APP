// server/models/userModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    }, 
    email: {
    type: String,
    unique: true, 
    required: true,
    trim: true
    },
    password: {
    type: String,
    required: true,
    min: 6
    },
    role: {
    type: String,
    enum: ["staff", "supervisor", "admin"],
    default: 'basic'
    },
    accessToken: {
    type: String
    }
},
{
    timestamps: true,
});

const User = mongoose.model('User', UserSchema);

module.exports = User;