const Blog = require('../models/blog');
const mongoose = require('mongoose');

module.exports.create_blog = async (req, res) => {
    const {title, desc, body, email, username} = req.body;
    try{
        const newBlog = await Blog.create({title, desc, body, email, username});
        res.status(201).json({message: 'Blog Created'});
    }
    catch(err){
        console.log(err);
        res.status(400).json({error: 'Error Creating Blog'});
    }
}

module.exports.home = async (req, res) => {
    try{
        const blogs = await Blog.find();
        res.status(201).json({blogs});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

module.exports.blog = async(req, res) => {
    try{
        const { id } = req.params;
        const blog = await Blog.findById(id);
        res.status(201).json({blog});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

module.exports.delete_blog = async(req, res) => {
    try{
        const {id} = req.params;
        const deletedBlog = await Blog.findByIdAndDelete(id);
        res.status(201).json({deletedBlog});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

module.exports.edit_blog = async (req, res) => {
    try{
        const {id} = req.params;
        const {title, desc, body, email, username} = req.body;
        const newBlog = await Blog.findByIdAndUpdate(id, {title, desc, body, email, username});
        if(!newBlog){
            res.status(404).json({error: 'Blog not found'})
        }
        res.status(201).json({newBlog});
    }
    catch(err){
        res.status(500).json({error: 'Internal Server Error'});
    }
}