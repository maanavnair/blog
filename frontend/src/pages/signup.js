import {useState, useContext} from 'react'
import {Navigate} from 'react-router-dom';
import UserContext from '../context/userContext'

const Signup = () => {

  const {setUser} = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

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
      }
      if(data.user){
        setUser({email, password, username});
        console.log('User Created');
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
        <form onSubmit={handleSubmit} className='signup-form'>
          <h1>Sign Up</h1>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
                name='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
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
            <button>Sign Up</button>
        </form>
    </div>
  )
}

export default Signup