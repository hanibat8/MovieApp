import classes from './Carousal.module.css';

const Carousal=(props)=>{
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