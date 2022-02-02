import React,{ useEffect } from 'react';
import MovieItem from './MovieItem';
import classes from './MovieList.module.css';
import useHttp from '../../hooks/use-http';
import {renderResponseItem} from '../../utils/util';
import { useStore } from '../../hooks-store/store';

const MovieList=(props)=>{

    const [movieState,dispatch]=useStore();

    const {sendRequest,response:item,error,isLoading,unsetState}=useHttp();
    
    //console.log(movieState);
   
    useEffect(()=>{
        //console.log('Request sent');
        sendRequest({url:props.url});
        
        return()=>{
            unsetState();
        }
    },[sendRequest,unsetState]);

    useEffect(()=>{
        if(item){
            dispatch('ADD_MOVIES',item.results)
        }
    },[item]);

    return(
       <React.Fragment>
            <h4 className={classes['movie-list__title']}>{props.category}</h4>
            {(isLoading || error ) && renderResponseItem(isLoading,error)} 
            {item &&<MovieItem list={renderResponseItem(isLoading,error,item.results)} category={props.category}/>}
        </React.Fragment>
    )
}

export default MovieList;