import './App.css';
import {useState, useEffect} from 'react'
import Login from './Views/Login.js';
import Showroom from './Views/Showroom.js';
import CarSubscribe from "./Views/carSubscribe/CarSubscribe.js"
import UserView from './Views/UserView/UserView';
import { Routes, Route, Link, BrowserRouter, NavLink } from 'react-router-dom'
import Admin from './Views/Admin/Admin';



function App() {

  
  return (
    <div className="App">

      <BrowserRouter>
      <nav className='navbar'>

        <ul className='navbar_ul'>
          <li><NavLink to={'/'} >Login</NavLink></li>
          <li><NavLink to={'/Showroom'}>Showroom</NavLink></li>
          <li><NavLink to={'/User'}>User</NavLink></li>
          <li><NavLink to={'/Admin'}>Admin</NavLink></li>
          
        </ul>

      </nav>

      <Routes>
        <Route exact path='/' element={<Login/>} />
        <Route exact path='/Showroom' element={<Showroom/>} />
        <Route exact path='/Subscribe' element={<CarSubscribe/>} />
        <Route exact path='/User' element={<UserView/>} />
        <Route exact path='/Admin' element={<Admin/>} />
      </Routes>
      
      </BrowserRouter>

    </div>
  );
}

export default App;
