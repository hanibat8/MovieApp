import { useState } from 'react';
import classes from './Input.module.css';

const Input=(props)=>{
    const [enteredValue,setEnteredValue]=useState('');
    const [touched,setIsTouched]=useState(false);

    const enteredValueIsEmpty=props.onValidation(enteredValue) && touched;

   // const enteredValueIsValid=enteredValueIsNotEmpty;

    const inputChangeHandler=(e)=>{
        setEnteredValue(e.target.value);
        setIsTouched(true);
        console.log(enteredValueIsEmpty);
    }

    const onBlurHandler=()=>{
        setIsTouched(true);
    }

    let inputClasses=enteredValueIsEmpty ? `${classes.input} ${classes.error}`:`${classes.input} `;

    return(
        <div className={classes['control-group']}>
            <label className={classes['label']} htmlFor={props.htmlFor}>{props.title}</label>
            <input onChange={inputChangeHandler} onBlur={onBlurHandler} className={inputClasses} type={props.type}
                   id={props.id}
                />
            {enteredValueIsEmpty && <p className={classes.error}>{'Invalid Value'}</p>}
        </div>
    )
}

export default Input;