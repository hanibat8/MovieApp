import React, {useState, useEffect} from 'react';
import {auth} from '../firebase-config';
import {renderResponseItem} from '../utils/util';

const AuthContext=React.createContext({
    isLoggedIn:false
});

export const AuthContextProvider:React.FC=(props)=>{
    //const initialToken=localStorage.getItem('token')??'';
    //const [token,setToken]=useState(initialToken);

    const [isLoading,setIsLoading]=useState(true);//to make sure children are only rendered when user is set
    const [isLoggedIn,setIsloggedIn]=useState(false);
    // const userIsLoggedIn=!!user;
    //console.log(userIsLoggedIn);

    /*const loginHandler=(user:{})=>{
       // console.log(token);
        //setToken(token);
        //localStorage.setItem('token',token);
        
    }*/

    /*const logoutHandler=()=>{
        setToken('');
        localStorage.removeItem('token');
    }*/


    useEffect(()=>{
        const unsubscribe=auth.onAuthStateChanged((user)=>{
            user ? setIsloggedIn(true):setIsloggedIn(false);
            setIsLoading(false);
        });
        return unsubscribe
    },
    [])


    let contextValue={
        isLoggedIn:isLoggedIn
    };

    return(
        <AuthContext.Provider value={contextValue}>
            {isLoading && renderResponseItem(isLoading,false)}
            {!isLoading && props.children}
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
