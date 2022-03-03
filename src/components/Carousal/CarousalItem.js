import classes from './CarousalItem.module.css';

const CarousalItem=(props)=>{ 

    return (
        <div className={classes['carousal-item']}>
            {props.children}
        </div>
    );
}

export default CarousalItem;