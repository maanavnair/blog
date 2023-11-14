const User = require('../models/user');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();

function handleErrors(err){
    let errors = {username: "", email: "", password: ""};

    if(err.code === 11000){
        errors.email = 'Email already in use';
    }

    if(err.message.includes('User validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        })
    }
    return errors;
}
const maxAge = 10 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        expiresIn: maxAge
    }, (err) => {
        if(err){
            console.log(err);
        }
    });
}

module.exports.signup_post = async (req, res) => {
    const {username, email, password} = req.body;
    try{
        const newUser = await User.create({username, email, password});
        const token = createToken(newUser._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({user: newUser._id});
        const { jwt } = req.cookies;
        console.log(jwt);
    }
    catch(err){
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
}
