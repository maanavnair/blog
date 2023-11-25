import React, { useContext, useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import UserContext from '../context/userContext'

const Navbar = () => {
  const {user} = useContext(UserContext);
  const {setUser} = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
        try{
            const res = await fetch('http://localhost:8080/user', {
                credentials: 'include',
            });
            if(res.ok){
                const data = await res.json();
                setUser(data.userProfile);
            }
            // else{
            //     console.log('Failed to fetch user');
            // }
        }
        catch(err){
            console.log('Error fetching user details: ', err);
        }
    };
    fetchUser();
  }, []);

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
            <li><Link to={'/signup'} className='link'><button className='nav-btn'>Signup</button></Link></li>
          </ul>
        }
        {user && 
          <div className='nav-user'>
            <p>{user.username}</p>
            <Link to={'./create'}><button className='blog-btn'>Write Blog</button></Link>
            <button onClick={handleSubmit} className='nav-btn'>Logout</button>
          </div>
        }
    </nav>
  )
}

export default Navbar