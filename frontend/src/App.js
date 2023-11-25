import './App.css'
import React from 'react'
import {Route, Routes} from 'react-router-dom';
import Signup from './pages/signup';
import Login from './pages/login';
import Home from './pages/home';
import Navbar from './components/navbar';
import UserContextProvider from './context/userContextProvider';
import Landing from './pages/landing';
import CreateBlog from './pages/createBlog';
import Blog from './pages/blog';
import EditBlog from './pages/editBlog';

const App = () => {
  return (
    <div>
      <UserContextProvider>
        <Navbar />
        <Routes>
          <Route path='/' element= {<Landing />} />
          <Route path='/home' element= {<Home />} />
          <Route path='/signup' element= {<Signup />} />
          <Route path='/login' element= {<Login />} />
          <Route path='/create' element= {<CreateBlog />} />
          <Route path='/blog/:id' element= {<Blog />} />
          <Route path='/edit/:id' element= {<EditBlog />} />
        </Routes>
      </UserContextProvider>
    </div>
  )
}

export default App;