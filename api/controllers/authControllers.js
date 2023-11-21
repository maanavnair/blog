const User = require('../models/user');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');

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
    try {
        return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
            expiresIn: maxAge
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports.signup_post = async (req, res) => {
    const {username, email, password} = req.body;
    try{
        const salt = await bcrypt.genSalt();
        const hashed = await bcrypt.hash(password, salt);
        const newUser = await User.create({username, email, password: hashed});
        const token = createToken(newUser._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 }).status(201).json({user: newUser._id, username: newUser.username,token});
    }
    catch(err){
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
}

module.exports.login_post = async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({message: "Incorrect Email"});
        }
        const auth = await bcrypt.compare(password, user.password);
        if(!auth){
            return res.status(401).json({message: 'Incorrect Password'});
        }
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 }).status(201).json({user: user._id, username: user.username, token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

module.exports.logout = async (req, res) => {
    res.cookie('jwt', '', {maxAge: 1}).json();
}