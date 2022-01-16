import React,{ useEffect } from 'react';
import useHttp from '../../hooks/use-http';
import {renderResponseItem} from '../../utils/util';
import Carousal from '../Carousal/Carousal';
import { useStore } from '../../hooks-store/store';
import classes from './MovieList.module.css';

const MovieList=(props)=>{

    const [movieState,dispatch]=useStore();

    const {sendRequest,response:item,error,isLoading,unsetState}=useHttp();
    //console.log(item);
   
    useEffect(()=>{
        //console.log('Requsut sent');
        sendRequest({url:props.url});
        
        return()=>{
            unsetState();
        }
    },[sendRequest,unsetState]);

    useEffect(()=>{
        if(item){
            let category=props.category;
            dispatch('ADD_MOVIES',{[category]:item.results})
        }
    },[item]);

    return(
        //<div></div>
       <React.Fragment>
            <h4 className={classes['movie-list__title']}>{props.category}</h4>
            {item && (isLoading || error ) && renderResponseItem(isLoading,error,item.results)}
            {item &&<Carousal list={renderResponseItem(isLoading,error,item.results)} carousal={props.carousal} category={props.category}/>}
        </React.Fragment>
    )
}

export default MovieList;