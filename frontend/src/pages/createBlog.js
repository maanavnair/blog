import React, {useState, useContext} from 'react';
import UserContext from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import Editor from '../components/editor';
import Button from '@mui/material/Button';

const CreateBlog = () => {

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [body, setBody] = useState('');
  const {user} = useContext(UserContext);
  const navigate = useNavigate();

  async function handleCreateBlog(e){
    e.preventDefault();
    if(title === '' || desc === '' || body === ''){
      alert('All fields must be filled');
      return;
    }
    const { email, username } = user;
    const blog = {title, desc, body, email, username};
    try{
      const data = await fetch('http://localhost:8080/createblog',{
        method: 'POST',
        body: JSON.stringify(blog),
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
      })
      if(data.ok){
        navigate('/home');
      }
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <div className='create-blog'>
        <form onSubmit={handleCreateBlog}>
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
          <Editor value = {body} onChange = {setBody} readOnly={false} />
          <Button variant='contained' color='success' type='submit' sx={{my: 7}} >Create</Button>
        </form>
    </div>
  )
}

export default CreateBlog