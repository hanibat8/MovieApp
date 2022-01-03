import Header from '../components/UI/Header';
import Input from '../components/UI/Input';
import classes from './Login.module.css';
import React from 'react';

const Login=()=>{

    const checkEmptyHandler=(enteredValue)=>enteredValue.trim()==='';

    const checkEmailHandler=(enteredEmail)=>!enteredEmail.includes('@');

    const emailIsInvalidHandler=(enteredEmail)=>checkEmptyHandler(enteredEmail) || checkEmailHandler(enteredEmail);

    return (
        <React.Fragment>
            <Header/>
            <div className={classes['login__form__container']}>
                <form className={classes['login__form']}>
                    <h2 className={classes['login__form__heading']}>Login</h2>
                    <Input onValidation={emailIsInvalidHandler} htmlFor='email' type='email' id='email' title='Email'/>
                    <Input onValidation={checkEmptyHandler} htmlFor='password' type='password' id='password' title='Password' />
                    <button className={classes['login__form__btn']}>Login</button>
                </form>
            </div>
        </React.Fragment>
    )
}

export default Login;