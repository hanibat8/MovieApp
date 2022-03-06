import React from 'react';
import MovieItem from './MovieItem';
import classes from './MovieList.module.css';
import {renderResponseItem} from '../../utils/util';
import {useMovies} from  '../../hooks/use-movies';
import MovieTrailerItem from './MovieTrailerItem';

interface Props {
    url?:string,
    category:string
}


const MovieList:React.FC<Props>=(props)=>{

    //const [movieState,dispatch]=useStore(false);
    console.log('movie list rendering')

    //const {sendRequest,response:item,error,isLoading,unsetState}=useHttp();
    const {isLoading,item,isError,error,isFetching}=useMovies({category:props.category});
   
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
    let definedClass=props.category==='Trailer'?'movie-trailer-list':'movie-list';

    return(
       <React.Fragment>
            <h4 className={classes['movie-list__title']}>{props.category}</h4>
            <div className={classes[definedClass]}>
                {(isFetching || isError ) && renderResponseItem(isFetching,error)} 
                {(!isLoading && !isError) && item?.data?.results && (props.category!='Trailer' ?
                <MovieItem list={renderResponseItem(isLoading,error,item.data.results)} category={props.category}/>:
                <MovieTrailerItem list={renderResponseItem(isLoading,error,item.data.results)} category={props.category}/>)}
            </div>
        </React.Fragment>
    )
}

export default MovieList;