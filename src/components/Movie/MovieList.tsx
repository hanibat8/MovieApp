import React from 'react';
import MovieItemList from './MovieItemList';
import classes from './MovieList.module.css';
import {renderResponseItem} from '../../utils/util';
import {useMovies} from  '../../hooks/use-movies';
import MovieTrailerItem from './MovieTrailerItem';

interface Props {
    url?:string,
    category:string
}

const MovieList:React.FC<Props>=(props)=>{

    console.log('movie list rendering')
    
    const {isLoading,item,isError,error,isFetching}=useMovies({category:props.category});
   
    let definedClass=props.category==='Trailer'?'movie-trailer-list':'movie-list';

    return(
       <React.Fragment>
            <h4 className={classes['movie-list__title']}>{props.category}</h4>
            <div className={classes[definedClass]}>
                {(isFetching || isError ) && renderResponseItem(isFetching,error)} 
                {(!isLoading && !isError) && item?.data?.results && (props.category!='Trailer' ?
                <MovieItemList list={renderResponseItem(isLoading,error,item.data.results)} category={props.category}/>:
                <MovieTrailerItem list={renderResponseItem(isLoading,error,item.data.results)} category={props.category}/>)}
            </div>
        </React.Fragment>
    )
}

export default MovieList;