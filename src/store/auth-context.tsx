import React, {useState} from 'react';

const AuthContext=React.createContext({
    token:'',
    isLoggedIn:false,
    logIn:(token:string)=>{},
    logOut:()=>{},
});

export const AuthContextProvider:React.FC=(props)=>{
    const initialToken=localStorage.getItem('token')??'';
    const [token,setToken]=useState(initialToken);

    const userIsLoggedIn=!!token;
    //console.log(userIsLoggedIn);

    const loginHandler=(token:string)=>{
       // console.log(token);
        setToken(token);
        localStorage.setItem('token',token);
    }

    const logoutHandler=()=>{
        setToken('');
        localStorage.removeItem('token');
    }

    const contextValue={
        token:token,
        isLoggedIn:userIsLoggedIn,
        logIn:loginHandler,
        logOut:logoutHandler
    };

    return(
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}

export const useAuth=()=>{
    const context = React.useContext(AuthContext)
    if (context === undefined) {
      throw new Error('useAuth must be used within a AuthContextProvider')
    }
    return context
  }

export default AuthContext;