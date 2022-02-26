import React from 'react';
import MovieItem from './MovieItem';
import classes from './MovieList.module.css';
import {renderResponseItem} from '../../utils/util';
import {useMovies} from  '../../hooks/use-movies';
import MovieTrailerItem from './MovieTrailerItem';

const MovieList=(props)=>{

    //console.log(props);

    /*const fetchData=()=>{
        const res = await fetch(props.url);
        const data = await res.json();
        return data;
    }*/

    //const [movieState,dispatch]=useStore(false);
    console.log('movie list rendering')

    //const {sendRequest,response:item,error,isLoading,unsetState}=useHttp();
    const {isLoading,item,isError,error,isFetching}=useMovies({url:props.url,category:props.category});
   
    //let memoizedItem
    //if(item && Array.isArray()) memoizedItem=React.memo(item.data.results);


    //console.log(movieState);
   
  /*  useEffect(()=>{
        //console.log('Request sent');
        sendRequest({url:props.url});
        
        return()=>{
            unsetState();
        }
    },[sendRequest,unsetState]);*/

    /*useEffect(()=>{
        if(item){
            dispatch('ADD_MOVIES',item.data.results)
        }
    },[item]);*/

    return(
       <React.Fragment>
            <h4 className={classes['movie-list__title']}>{props.category}</h4>
            {(isFetching || isError ) && renderResponseItem(isLoading,error)} 
            {(!isLoading && !isError) && item?.data?.results && (props.category!='Trailer' ?
            <MovieItem list={renderResponseItem(isLoading,error,item.data.results)} category={props.category}/>:
            <MovieTrailerItem list={renderResponseItem(isLoading,error,item.data.results)} category={props.category}/>)}
        </React.Fragment>
    )
}

export default MovieList;