import classes from './CarousalItem.module.css';

const CarousalItem=(props)=>{

    let passedClasses=props.category=== 'Trailer' ? 'trailer-carousal-item' : 'carousal-item' ;

    return (
        <div className={classes[passedClasses]}>
            {props.children}
        </div>
    );
}

export default CarousalItem;