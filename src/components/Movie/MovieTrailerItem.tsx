import React from 'react';
import Carousal from '../Carousal/Carousal';
import CarousalTrailerItem from '../Carousal/CarousalTrailerItem';

interface Props{
    list:[] | JSX.Element,
    category:string
}

const MovieTrailerItem:React.FC<Props>=props=>{
    
    console.log('Movie Item render');

    let content;
    
    if(Array.isArray(props.list) && props.list.length>0){
        content=props.list.map((movie)=>{
            return <CarousalTrailerItem movie={movie}/>                                              
            }       
        )
    }

    return(
        <>
        {Array.isArray(props.list) && props.list.length>0}  <Carousal category={props.category}>
            {Array.isArray(props.list) && props.list.length>0 && content}
        </Carousal>
        </>
    
    );
}

export default MovieTrailerItem;