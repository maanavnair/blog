const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const blogSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Enter Title'],
    },
    desc: {
        type: String,
        required: [true, 'Enter Description'],
    },
    body: {
        type: String,
        required: [true, 'Enter Content'],
    },
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
});

const Blog = model('Blog', blogSchema);
module.exports = Blog;