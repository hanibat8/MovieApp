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
        console.log('in loading');
        content= <div className={classes.centered}><LoadingSpinner/></div>
    }

    if(error){
        console.log('error');
        content= <div className={classes.centered}>{error}</div>

    }
    //console.log(item);
    if(item.length>0){
      //  console.log(item);
        content=item;
        //console.log(content);
    }

    return content;
}

const MovieList=(props)=>{

    const {sendRequest,item,error,isLoading,unsetState}=useHttp();
    //console.log(item);
   
    useEffect(()=>{
        sendRequest(props.url);
        
        return()=>{
            unsetState();
        }
    },[sendRequest,unsetState])

    return(
        //<div></div>
       <React.Fragment>
            <h4 className={classes['movie-list__title']}>{props.category}</h4>
            {item.length===0 && (isLoading || error ) && renderMovieList(isLoading,error,item)}
            {item.length>0 &&<Carousal list={renderMovieList(isLoading,error,item)} carousal={props.carousal}/>}
        </React.Fragment>
    )
}

export default MovieList;