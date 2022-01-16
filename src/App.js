import './App.css';
import {Route,Routes} from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/signUp' element={<SignUp/>} />
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
