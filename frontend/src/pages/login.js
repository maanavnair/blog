import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/userContext'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

const Login = () => {

    const {setUser} = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
  
    async function handleSubmit(e){
      e.preventDefault();
      const userData = {
        email: email,
        password: password
      }
      try{
        const res = await fetch('http://localhost:8080/login', {
          method: 'POST',
          body: JSON.stringify(userData),
          headers: {'Content-Type': 'application/json'},
          credentials: 'include',
        })
        const data = await res.json();
        if(data.message){
          console.log('Errors');
          console.log(data.message);
          setError(data.message);
        }
        if(data.token){
          const username = data.username;
          setUser({email, username, token: data.token});
          console.log('User Logged In');
          navigate('/home');
        }
      }
      catch(err){
        console.log(err);
      }
    }
  
    return (
      <div className='form-div'>
          <form onSubmit={handleSubmit} className='login-form'>
            <h1>Login</h1>
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
            <Button variant='outlined' sx={{my:3}} type='submit' >Login</Button>
          </form>
          {error && <Alert severity='error' className='error'>{error}</Alert>}
      </div>
    )
  }

export default Login