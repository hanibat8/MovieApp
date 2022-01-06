import { useEffect } from 'react/cjs/react.development';
import useHttp from '../../hooks/use-http';
import {renderResponseItem} from '../../util';
import Carousal from '../Carousal/Carousal';
import classes from './MovieList.module.css';
import React from 'react';

/*const renderMovieList=(isLoading,error,item)=>{
    let content;
    //console.log(props);

    if(isLoading){
        //console.log('in loading');
        content= <div className={classes.centered}><LoadingSpinner/></div>
    }

    if(error){
        //console.log('error');
        content= <div className={classes.centered}>{error}</div>

    }
    //console.log(item);
    if(item.length>0){
      //  console.log(item);
        content=item;
        //console.log(content);
    }

    return content;
}*/

const MovieList=(props)=>{

    const {sendRequest,response:item,error,isLoading,unsetState}=useHttp();
    //console.log(item);
   
    useEffect(()=>{
        //console.log('Requsut sent');
        sendRequest({url:props.url});
        
        return()=>{
            unsetState();
        }
    },[sendRequest,unsetState])

    return(
        //<div></div>
       <React.Fragment>
            <h4 className={classes['movie-list__title']}>{props.category}</h4>
            {item.length===0 && (isLoading || error ) && renderResponseItem(isLoading,error,item)}
            {item.length>0 &&<Carousal list={renderResponseItem(isLoading,error,item)} carousal={props.carousal}/>}
        </React.Fragment>
    )
}

export default MovieList;