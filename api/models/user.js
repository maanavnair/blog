const mongoose = require('mongoose');
const {Schema, model} = mongoose;
const {isEmail} = require('validator');

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Please enter username']
    },
    email: {
        type: String,
        required: [true, 'Please enter email'],
        unique: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter password']
    }
});

const User = model('User', userSchema);
module.exports = User;