import classes from './CircularScore.module.css';

const CircularScore=(props)=>{

    //console.log(props.className);
    let passedClasses=props.className?props.className:'';
    let totalClasses=`${classes['circular-score--container']} ${passedClasses}`;

    let scoreColor=props.score>5 ? '#4d5b' : props.score>2 ? 'rgb(214, 216, 73)' : 'rgb(216, 73, 73)';
    
    return (
        <div className={totalClasses} style={{background:`conic-gradient(${scoreColor} ${props.score*10 *3.6}deg , rgb(94, 86, 128,.6) ${props.score*10 *3.6}deg)`}}>
            <div className={classes['circular-score']}>{props.score*10}<sup>%</sup></div>
        </div>
    );
}

export default CircularScore;