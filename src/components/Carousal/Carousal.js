import classes from './Carousal.module.css';

const Carousal=(props)=>{
    return(
        <div className={classes['carousal__container']}>
            <div className={classes[`carousal__list`]}>
                {props.children}
            </div>
        </div>
    )
}

export default Carousal;