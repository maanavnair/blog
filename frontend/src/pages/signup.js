import {useState, useContext} from 'react'
import UserContext from '../context/userContext'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

  const {setUser} = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    username: "",
    password: "",
    email: "",
  })
  const navigate = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();
    const userData = {
      username: username,
      email: email,
      password: password
    }
    try{
      const res = await fetch('http://localhost:8080/signup', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
      })
      const data = await res.json();
      if(data.errors){
        console.log('Errors');
        console.log(data.errors);
        setError(data.errors);
      }
      if(data.token){
        setUser({email, password, username, token: data.token});
        console.log('User Created');
        navigate('/home');
      }
    }
    catch(err){
      console.log('Fetch Error');
      console.log(err);
    }
  }

  return (
    <div className='form-div'>
        <form onSubmit={handleSubmit} className='signup-form'>
          <h1>Signup</h1>
            <TextField 
              className='input'
              label='Username'
              variant='outlined'
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin='normal'
            />
            <TextField 
              className='input'
              label='Email'
              variant='outlined'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin='normal'
            />
            <TextField 
              className='input'
              label='Password'
              variant='outlined'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin='normal'
            />
            <Button variant='outlined' sx={{my:3}} type='submit' >Signup</Button>
        </form>
        {error.username && <Alert severity='error' className='error'>{error.username}</Alert>}
        {error.email && <Alert severity='error' className='error'>{error.email}</Alert>}
        {error.password && <Alert severity='error' className='error'>{error.password}</Alert>}
    </div>
  )
}

export default Signup