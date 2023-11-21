import './App.css'
import React from 'react'
import {Route, Routes} from 'react-router-dom';
import Signup from './pages/signup';
import Login from './pages/login';
import Home from './pages/home';
import Navbar from './components/navbar';
import UserContextProvider from './context/userContextProvider';
import Landing from './pages/landing';

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
        </Routes>
      </UserContextProvider>
    </div>
  )
}

export default App;