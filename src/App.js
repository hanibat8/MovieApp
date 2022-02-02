import './App.css';
import {Route,Routes} from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Profile from './pages/Profile';
import SingleMovie from './pages/SingleMovie';

function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path='/movies/:movieId' element={<SingleMovie/>}/>
        <Route path='/signUp' element={<SignUp/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/' element={<Home/>} />
      </Routes>
    </div>
  );
}

export default App;
