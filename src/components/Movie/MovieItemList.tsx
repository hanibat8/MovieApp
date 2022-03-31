import React from 'react';
import Carousal from '../Carousal/Carousal';
import MovieItem from './MovieItem';
import classes from './MovieItemList.module.css';

interface Props {
    list:[] | JSX.Element,
    category:string
}

type movie={
    id: number,
    original_title: string,
    vote_average: number,
    poster_path: string,
    overview:string
}

const MovieItemList:React.FC<Props>=props=>{

    let content;
    
    if(Array.isArray(props.list) && props.list.length>0){
        content=props.list.map((movie:movie)=>{
            return <MovieItem type='carousal--item' movie={movie}/>
            }       
        )
    }

    return(
        <>
        {Array.isArray(props.list) && props.list.length>0} <Carousal category={props.category}>
            { content}
        </Carousal>
        </>
    
    );
}

export default MovieItemList;