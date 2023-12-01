import React, { useContext, useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import UserContext from '../context/userContext'
import Button from '@mui/material/Button';
import { createSvgIcon } from '@mui/material/utils';

const Navbar = () => {
  const {user} = useContext(UserContext);
  const {setUser} = useContext(UserContext);
  const navigate = useNavigate();

  const PlusIcon = createSvgIcon(
    // credit: plus icon from https://heroicons.com/
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>,
    'Plus',
  );

  // useEffect(() => {
  //   const fetchUser = async () => {
  //       try{
  //           const res = await fetch('http://localhost:8080/user', {
  //               credentials: 'include',
  //           });
  //           if(res.ok){
  //               const data = await res.json();
  //               setUser(data.userProfile);
  //           }
  //           // else{
  //           //     console.log('Failed to fetch user');
  //           // }
  //       }
  //       catch(err){
  //           console.log('Error fetching user details: ', err);
  //       }
  //   };
  //   fetchUser();
  // }, []);

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

  const logo = user ? <span className='logo'><Link to={'/home'} className='logo-link'>Blogify</Link></span> : <span className='logo'>Blogify</span>

  return (
    <nav>
        {logo}
        {!user && 
          <ul className='nav-no-user'>
            <li><Link to={'/login'} className='link'><Button variant='text' >Login</Button></Link></li>
            <li><Link to={'/signup'} className='link'><Button variant='contained' >Signup</Button></Link></li>
          </ul>
        }
        {user && 
          <div className='nav-user'>
            <p>{user.username}</p>
            <Link to={'./create'}><Button variant='outlined' startIcon={<PlusIcon />} sx={{mx: 3}} >Write Blog</Button></Link>
            <Button variant='contained' onClick={handleSubmit} >Logout</Button>
          </div>
        }
    </nav>
  )
}

export default Navbar