import { useEffect } from 'react/cjs/react.development';
import useHttp from '../../hooks/use-http';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './MovieList.module.css';
import Carousal from '../Carousal/Carousal';
import React from 'react';

const renderMovieList=(isLoading,error,item)=>{
    let content;
    //console.log(props);

    if(isLoading){
        //console.log('loading');
        content= <div className={classes.centered}><LoadingSpinner/></div>
    }

    if(error){
        console.log('error');
        content= <div className={classes.centered}>{error}</div>

    }
    
    if(item){
        console.log(item);
        content=item;
        //console.log(content);
    }

    return content;
}

const MovieList=(props)=>{

    const {sendRequest,item,error:[popularMoviesError,topRatedMoviesError],isLoading:[popularMoviesIsLoading,topRatedMoviesIsLoading],unsetState}=useHttp();
    let popularMoviesItem,topRatedMoviesItem;
    
    if(item.length>0){
        [[popularMoviesItem],[topRatedMoviesItem]]=item;
    }
   
    useEffect(()=>{
        sendRequest(props.url);
        
        return()=>{
            unsetState();
        }
    },[sendRequest,unsetState])

    //renderMovieList();

    return(
        //<div></div>
       <React.Fragment>
            <h4 className={classes['movie-list__title']}>What's Popular</h4>
            {!popularMoviesItem && renderMovieList(popularMoviesIsLoading,popularMoviesError,popularMoviesItem)}
            {popularMoviesItem &&<Carousal list={renderMovieList(popularMoviesIsLoading,popularMoviesError,popularMoviesItem.results)}/>}
            <h4 className={classes['movie-list__title']}>Top Rated</h4>
            {!topRatedMoviesItem && renderMovieList(topRatedMoviesIsLoading,topRatedMoviesError,topRatedMoviesItem)}
            {topRatedMoviesItem &&<Carousal list={renderMovieList(topRatedMoviesIsLoading,topRatedMoviesError,topRatedMoviesItem.results)}/>}
        </React.Fragment>
    )
}

export default MovieList;