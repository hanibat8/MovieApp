import Header from '../components/UI/Header';
import Input from '../components/UI/Input';
import classes from './SignUp.module.css';
import React from 'react';

const SignUp=()=>{

    const checkEmptyHandler=(enteredValue)=>enteredValue.trim()==='';

    const checkEmailHandler=(enteredEmail)=>!enteredEmail.includes('@');

    const emailIsValidHandler=(enteredEmail)=>checkEmptyHandler(enteredEmail) || checkEmailHandler(enteredEmail);

    return (
        <React.Fragment>
            <Header/>
            <div className={classes['sign-up__form__container']}>
                <form className={classes['sign-up__form']}>
                    <h2 className={classes['sign-up__form__heading']}>Sign up</h2>
                    <Input onValidation={checkEmptyHandler} htmlFor='username' type='text' id='username' title='Username'/>
                    <Input onValidation={checkEmptyHandler} htmlFor='password' type='password' id='password' title='Password (5 characters minimum)'/>
                    <Input onValidation={checkEmptyHandler} htmlFor='password-confirm' type='password' id='password-confirm' title='Confirm Password'/>
                    <Input onValidation={emailIsValidHandler} htmlFor='email' type='email' id='email' title='Email'/>
                    <button className={classes['sign-up__form__btn']}>Sign Up</button>
                </form>
            </div>
        </React.Fragment>
    )
}

export default SignUp;