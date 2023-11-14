"use client"

import {useState} from 'react'

const signup = () => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
      const data = await res.json();
      if(data.errors){
        console.log('Errors');
        console.log(data.errors);
      }
      if(data.user){
        console.log('User Created');
      }
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <div>
        <form onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
                name='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='text-black'
            />
            <label htmlFor='email'>Email</label>
            <input
                type='email'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='text-black'
            />
            <label htmlFor='password'>Password</label>
            <input
                type='password'
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='text-black'
            />
            <button>Sign Up</button>
        </form>
    </div>
  )
}

export default signup