import { useEffect } from 'react/cjs/react.development';
import useHttp from '../../hooks/use-http';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './MovieList.module.css';
import Carousal from '../Carousal/Carousal';
import React from 'react';

const MovieList=()=>{
    const {sendRequest:popularSendRequest,item:popularMoviesItem,error:popularMoviesError,isLoading:popularMoviesIsLoading,unsetState}=useHttp();
    /*const {sendRequest:latestSendRequest,item:latestMoviesItem,error:latestMoviesError,isLoading:popularMoviesIsLoading,unsetState}=useHttp();*/
    useEffect(()=>{
        popularSendRequest('https://api.themoviedb.org/3/movie/popular?api_key=5c8ece04ea5e1e31bb7e5630081968b6');
        
        return()=>{
            unsetState();
        }
    },[popularSendRequest,unsetState])

    /*useEffect(()=>{
        sendRequest('https://api.themoviedb.org/3/movie/latest?api_key=5c8ece04ea5e1e31bb7e5630081968b6');
         
         return()=>{
             unsetState();
         }
     },[latestSendRequest,unsetState])*/

    let content;

    //console.log(item,error,isLoading);

    if(popularMoviesIsLoading){
        //console.log('loading');
        content= <LoadingSpinner/>
    }

    if(popularMoviesError){
        //console.log('error');
        content= <div>Error</div>

    }
    
    if(popularMoviesItem.length>0){
        //console.log(item[0]);
        content=popularMoviesItem;
        console.log(content);
    }

    return(
        <React.Fragment>
            <div className={classes.centered}>{popularMoviesItem.length===0 && content}</div>
            {popularMoviesItem.length>0 &&<Carousal list={content}/>}
        </React.Fragment>
    )
}

export default MovieList;