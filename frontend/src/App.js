import './App.css'
import React, { useContext, useEffect, useState } from 'react'
import {Route, Routes, Navigate} from 'react-router-dom';
import Signup from './pages/signup';
import Login from './pages/login';
import Home from './pages/home';
import Navbar from './components/navbar';
import Landing from './pages/landing';
import CreateBlog from './pages/createBlog';
import Blog from './pages/blog';
import EditBlog from './pages/editBlog';
import Footer from './components/footer';
import UserContext from './context/userContext';

const App = () => {
  const {user, setUser} = useContext(UserContext);
  const [loading, setLoading] = useState(true);

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
        finally{
          setLoading(false);
        }
    };
    if(!user){
      fetchUser();
    }
  }, [user, setUser]);

  if(loading){
    return(
      <div>Loading...</div>
    )
  }

  return (
    <div>
        <Navbar />
        <div className='content'>
          <Routes>
            <Route path='/' element= {user ? <Navigate to='/home' /> : <Landing />} />
            <Route path='/home' element= {user ? <Home /> : <Navigate to='/login' />} />
            <Route path='/signup' element= {<Signup />} />
            <Route path='/login' element= {<Login />} />
            <Route path='/create' element= {user ? <CreateBlog /> : <Navigate to='/login' />} />
            <Route path='/blog/:id' element= {user ? <Blog /> : <Navigate to='/login' />} />
            <Route path='/edit/:id' element= {user ? <EditBlog /> : <Navigate to='/login' />} />
          </Routes>
        </div>
        <Footer />
    </div>
  )
}

export default App;