import React, {useContext, useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import UserContext from '../context/userContext';
import Editor from '../components/editor';
import Button from '@mui/material/Button';

const EditBlog = () => {
    const {id} = useParams();
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [body, setBody] = useState("");
    const {user} = useContext(UserContext);

    const navigate = useNavigate();

    function handleCancel(){
        navigate(`/blog/${id}`);
    }

    async function confirmEdit(){
        const blogData = {
            title: title,
            desc: desc,
            body: body,
            email: user.email,
            username: user.username
        }
        const res = await fetch(`http://localhost:8080/edit/${id}`, {
            method: 'PUT',
            body: JSON.stringify(blogData),
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        })
        try{
            if(res.ok){
                navigate(`/blog/${id}`);
            }
            else if(res.status === 404){
                console.log('Blog not found');
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
            const res = await fetch(`http://localhost:8080/blog/${id}`, {
                credentials: 'include',
            });
            try{
                if(res.ok){
                    const data = await res.json();
                    setTitle(data.blog.title);
                    setDesc(data.blog.desc);
                    setBody(data.blog.body);
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
    }, [])

  return (
    <div className='edit-blog'>
        <label htmlFor='title'>Title</label>
        <input 
            type='text' 
            value={title}
            className='title'
            onChange={e => setTitle(e.target.value)} 
        />
        <label htmlFor='desc'>Description</label>
        <textarea
            value={desc}
            className='desc'
            onChange={e => setDesc(e.target.value)}
        />
        <label htmlFor='body' >Body</label>
        <Editor value = {body} onChange = {setBody} readOnly={false} className='body' />
        <div className='edit-blog-btn'>
            <Button variant='outlined' onClick={handleCancel} sx={{mx: 3}} >Cancel</Button>
            <Button variant='contained' onClick={confirmEdit} sx={{mx: 3}} >Confirm Edit</Button>
        </div>
    </div>
  )
}

export default EditBlog;