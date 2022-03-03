import React from 'react';
import Carousal from '../Carousal/Carousal';
import CarousalTrailerItem from '../Carousal/CarousalTrailerItem';

const MovieTrailerItem=props=>{
    
    console.log('Movie Item render');

    let content;
    
    if(props.list.length>0){
        content=props.list.map((movie)=>{
            return <CarousalTrailerItem movie={movie}/>                                              
            }       
        )
    }

    return(
       props.list.length>0 && <Carousal category={props.category}>
            {props.list.length>0 && content}
        </Carousal>
    
    );
}

export default MovieTrailerItem;