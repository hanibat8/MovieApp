import { useState,useEffect } from 'react';
import classes from './Input.module.css';

const Input=(props)=>{
    const [enteredValue,setEnteredValue]=useState('');
    const [touched,setIsTouched]=useState(false);

    let enteredValueIsInvalid=props.onValidation(enteredValue) && touched;

    useEffect(()=>{
        const identifier=setTimeout(()=>{
          //  enteredValueIsInvalid=props.onValidation(enteredValue) && touched;
        
        },5000);

        return()=>{
            clearTimeout(identifier);
        }
    },[])

   // const enteredValueIsValid=enteredValueIsNotEmpty;

    const inputChangeHandler=(e)=>{
        setEnteredValue(e.target.value);
        setIsTouched(true);
        console.log(enteredValueIsInvalid);
    }

    const onBlurHandler=()=>{
        setIsTouched(true);
    }

    let inputClasses=enteredValueIsInvalid ? `${classes.input} ${classes.error}`:`${classes.input}`;
    console.log(inputClasses)
    return(
        <div className={classes['control-group']}>
            <label className={classes['label']} htmlFor={props.htmlFor}>{props.title}</label>
            <input onChange={inputChangeHandler} onBlur={onBlurHandler} className={inputClasses} type={props.type}
                   id={props.id}
                />
                {console.log(enteredValueIsInvalid)}
            {enteredValueIsInvalid && <p className={classes.error}>{'Invalid Value'}</p>}
        </div>
    )
}

export default Input;