import React from 'react';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Profile from './pages/Profile';
import SingleMovie from './pages/SingleMovie';
import {Route,Routes,Navigate} from 'react-router-dom';
import {QueryClientProvider,QueryClient} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';
import {auth} from './firebase-config';
import './App.css';

const queryClient=new QueryClient();

const App:React.FC=()=>{

  const user = auth.currentUser;
  //console.log(user);
  
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Routes>
          <Route path='/movies/:movieId' element={<SingleMovie/>}/>
          <Route path='/signUp' element={!user ? <SignUp/>: <Navigate to='/'/>}/>
          <Route path='/login' element={!user ? <Login/>: <Navigate to='/'/>}/>
          <Route path='/profile' element={user ? <Profile/>: <Navigate to='/'/>}/>
          <Route path='/' element={<Home/>} />
        </Routes>
      </div>
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right'/>
    </QueryClientProvider>
  );
}

export default App;
