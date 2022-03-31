import React from 'react';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Profile from './pages/Profile';
import SingleMovie from './pages/SingleMovie';
import MoviesCategory from './pages/MoviesCategory';
import {Route,Routes,Navigate} from 'react-router-dom';
import {QueryClientProvider,QueryClient} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';
import {useAuth} from './store/auth-context';
import {ErrorBoundary} from 'react-error-boundary'
import './App.css';

const queryClient=new QueryClient();

const App:React.FC=()=>{

  const authContext=useAuth();
  console.log(authContext.isLoggedIn)
  
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Routes>
          <Route path='/movies/popularMovies' element={<MoviesCategory category='Popular'/>}/>
          <Route path='/movies/topRated' element={<MoviesCategory category='Top Rated'/>}/>
          <Route path='/movies/upcoming' element={<MoviesCategory category='Now Playing'/>}/>
          <Route path='/movies/:movieId' element={<SingleMovie/>}/>
          <Route path='/signUp' element={!authContext.isLoggedIn ? <SignUp/>: <Navigate to='/'/>}/>
          <Route path='/login' element={!authContext.isLoggedIn ?   
            <ErrorBoundary
              fallbackRender =  {({error, resetErrorBoundary}) => (
                <div>
                  <h1>An error occurred: {error.message}</h1>
                  <button onClick={resetErrorBoundary}>Try again</button>
                </div>
              )}>
              <Login/>
            </ErrorBoundary>: <Navigate to='/'/>}/>
          <Route path='/profile' element={authContext.isLoggedIn ? <Profile/>: <Navigate to='/'/>}/>
          <Route path='/' element={<Home/>} />
        </Routes>
      </div>
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right'/>
    </QueryClientProvider>
  );
}

export default App;
