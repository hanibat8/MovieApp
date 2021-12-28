import { useEffect } from 'react/cjs/react.development';
import useHttp from '../../hooks/use-http';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './MovieList.module.css';
import Carousal from '../Carousal/Carousal';
import React from 'react';
import { render } from '@testing-library/react';

const renderMovieList=(isLoading,error,item)=>{
    let content;
    //console.log(props);

    if(isLoading){
        //console.log('loading');
        content= <LoadingSpinner/>
    }

    if(error){
        //console.log('error');
        content= <div>Error</div>

    }
    
    if(item.length){
        //console.log(item[0]);
        content=item;
        console.log(content);

        return content;
    }
}

const MovieList=(props)=>{

    const {sendRequest,item,error,isLoading,unsetState}=useHttp();
   
    console.log(item);
    useEffect(()=>{
        sendRequest(props.url);
        
        return()=>{
            unsetState();
        }
    },[sendRequest,unsetState])

    //renderMovieList();

    return(
       // <div></div>
        <React.Fragment>
            <div className={classes.centered}>{item.length===0 && renderMovieList(isLoading[0],error[0],item)}</div>
            {item.length>0 &&<Carousal list={renderMovieList(isLoading[0],error[0],item[0])} title= {`What's Popular`}/>}
            <div className={classes.centered}>{item.length===0 && renderMovieList(isLoading[1],error[1],item)}</div>
            {item.length>0 &&<Carousal list={renderMovieList(isLoading[1],error[1],item[1])} title= {`Top Rated`}/>}
        </React.Fragment>
    )
}

export default MovieList;