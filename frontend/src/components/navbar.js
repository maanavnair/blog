import React, { useContext, useState } from 'react'
import {Link, Navigate, useNavigate} from 'react-router-dom'
import UserContext from '../context/userContext'

const Navbar = () => {
  const {user} = useContext(UserContext);
  const {setUser} = useContext(UserContext);
  const navigate = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();
    try{
      const res = await fetch('http://localhost:8080/logout', {
        method: 'POST',
        credentials: 'include',
      })
      if(res.ok){
        setUser(null);
        navigate('/');
      }
    }
    catch(err){
      console.log('Failed to logout');
      console.log(err);
    }
  }

  return (
    <nav>
        <span>Blogify</span>
        {!user && 
          <ul className='nav-no-user'>
            <li><Link to={'/login'} className='link'>Login</Link></li>
            <li><Link to={'/signup'} className='link'><button>Signup</button></Link></li>
          </ul>
        }
        {user && 
          <div className='nav-user'>
            <p>{user.username}</p>
            <button onClick={handleSubmit}>Logout</button>
          </div>
        }
    </nav>
  )
}

export default Navbar