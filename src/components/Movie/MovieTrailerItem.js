import React from 'react';
import Carousal from '../Carousal/Carousal';
import CarousalItem from '../Carousal/CarousalItem';
import VideoModal from '../UI/VideoModal';
import classes from './MovieItem.module.css';

const MovieItem=props=>{
    
    console.log('Movie Item render');

    let content;
    
    if(props.list.length>0){
        let imgSrc='w355_and_h200_multi_faces/';
        content=props.list.map((movie)=>{
            return <CarousalItem category={props.category}>
                        <VideoModal class={classes} movie={movie} imgSrc={imgSrc}/>                        
                </CarousalItem>
            }       
        )
    }

    return(
       props.list.length>0 && <Carousal category={props.category}>
            {props.list.length>0 && content}
        </Carousal>
    
    );
}

export default React.memo(MovieItem);