import { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../context/userContext'

const Login = () => {

    const {setUser} = useContext(UserContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
  
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
        }
        if(data.user){
          const username = data.username;
          setUser({email, password, username});
          console.log('User Logged In');
          setRedirect(true);
        }
      }
      catch(err){
        console.log(err);
      }
    }

    if(redirect){
      return <Navigate to = {'/home'} />
    }
  
    return (
      <div className='form-div'>
          <form onSubmit={handleSubmit} className='login-form'>
            <h1>Login</h1>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button>Login</button>
          </form>
      </div>
    )
  }

export default Login