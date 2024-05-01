import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import UserContext from '../context/userContext';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

const Blog = () => {
    const {id} = useParams();
    const [blog, setBlog] = useState({
        title: '',
        username: '',
        body: '',
        email: ''
    });

    const {user} = useContext(UserContext);
    const navigate = useNavigate();

    function handleEdit(){
        navigate(`/edit/${id}`);
    }

    async function handleDelete(){
        const res = await fetch(`https://blogify-backend-lake.vercel.app/deleteblog/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        });
        try{
            if(res.ok){
                console.log('Blog Deleted Successfully');
                navigate('/home');
            }
            else{
                console.log('Internal Server Error');
            }
        }
        catch(err){
            console.log('Fetch Error');
        }
    }

    useEffect(() => {
        const fetchBlog = async () => {
            const res = await fetch(`https://blogify-backend-lake.vercel.app/blog/${id}`, {
                credentials: 'include',
            });
            try{
                if(res.ok){
                    const data = await res.json();
                    setBlog(data.blog);
                }
                else{
                    console.log('Internal Server Error');
                }
            }
            catch(err){
                console.log('Fetch Error');
            }
        }
        fetchBlog();
    }, []);

    const buttons = user && blog && user.email === blog.email && (<div className='blog-btn'>
        <Button variant='outlined' onClick={handleEdit} sx={{mx: 3}} >Edit Blog</Button>
        <Button variant='contained' startIcon={<DeleteIcon />} onClick={handleDelete} sx={{mx: 3}}>Delete Blog</Button>
    </div>)

  return (
    <div className='blog'>
        <h1>{blog.title}</h1>
        <p>by <span style={{fontWeight: 'bold'}}>{blog.username}</span></p>
        {user && blog && user.email === blog.email && buttons}
        <div dangerouslySetInnerHTML={{__html: blog.body}} />
    </div>
  )
}

export default Blog