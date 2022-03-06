import React from 'react';
import classes from './CircularScore.module.css';

type Props = {
    circularClassName?: string,
    score:number
  }

const CircularScore=({circularClassName,score}:Props)=>{

    //console.log(props.className);
    let passedClasses=circularClassName?circularClassName:'';
    let totalClasses=`${classes['circular-score--container']} ${passedClasses}`;

    let scoreColor=score>5 ? '#4d5b' : score>2 ? 'rgb(214, 216, 73)' : 'rgb(216, 73, 73)';
    
    return (
        <div className={totalClasses} style={{background:`conic-gradient(${scoreColor} ${score*10 *3.6}deg , rgb(94, 86, 128,.6) ${score*10 *3.6}deg)`}}>
            <div className={classes['circular-score']}>{score*10}<sup>%</sup></div>
        </div>
    );
}

export default CircularScore;