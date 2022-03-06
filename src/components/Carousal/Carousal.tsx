import React from 'react';
import classes from './Carousal.module.css';

interface Props{
    category?:string
}

const Carousal:React.FC<Props>=(props)=>{
    let passedClasses=props.category=== 'Trailer' ? 'trailer__carousal__list' : 'carousal__list' ;
    //let totalClasses=`${classes.layout} ${passedClasses}`;

    return(
        <div className={classes['carousal__container']}>
            <div className={classes[passedClasses]}>
                {props.children}
            </div>
        </div>
    )
}

export default Carousal;