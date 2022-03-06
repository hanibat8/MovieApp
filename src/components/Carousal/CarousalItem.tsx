import React from 'react';
import classes from './CarousalItem.module.css';

const CarousalItem:React.FC=(props)=>{ 

    return (
        <div className={classes['carousal-item']}>
            {props.children}
        </div>
    );
}

export default CarousalItem;