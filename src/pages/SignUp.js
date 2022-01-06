import Header from '../components/UI/Header';
import Input from '../components/UI/Input';
import classes from './Form.module.css';
import React from 'react';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import useHttp from '../hooks/use-http';

const SignUp=()=>{
    const {sendRequest,response,isLoading,error}=useHttp();

    return(
        <React.Fragment>
            <Header/>
            <Formik
            initialValues={{
                email: "",
                password:"",
                confirmPassword:""
            }}
            validationSchema={Yup.object({   
            password: Yup.string()
                .min(5, "Must be 5 characters or more")
                .required("Required"),
            confirmPassword: Yup.string()
                .min(5, "Must be 5 characters or more")
                .required("Required")
                .oneOf([Yup.ref('password'), null], 'Passwords must match'),
            email: Yup.string()
                .email("Invalid email address`")
                .required("Required"),
            })}
            onSubmit={async(values, { setSubmitting }) => {
                try{
                    const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC3tkL__9PuUSI_bZBzyJIAjxda4AHOZog',
                    {
                        method:'POST',
                        body: JSON.stringify({
                            email: values.email,
                            password: values.password,
                            returnSecureToken: true,
                          }),
                          headers: {
                            'Content-Type': 'application/json',
                          },
                    });
        
                    if(!response.ok){
                        throw new Error(error);
                    }
                    setSubmitting(false);
                    const data=await response.json();
                    console.log(data);
                }
                catch(err){
                    setSubmitting(false);
                   console.log(err.message || 'Something went wrong');
                }
                    console.log(values);
            }}>
                {formik => {
                    //console.log('Formik props', formik)
                    return (
                        <div className={classes['form__container']}>
                            <Form className={classes['form']}>
                                <h2 className={classes['form__heading']}>Sign Up</h2>
                                <Input 
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                />
                                <Input
                                    label="Password"
                                    name="password"
                                    type="password"       
                                />
                                <Input
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    type="password"       
                                />
                                <button type="submit" disabled={!formik.isValid || formik.isSubmitting} className={classes['form__btn']}>Sign Up</button>
                            </Form>
                        </div>
                    )
                }
            }
        </Formik>
    </React.Fragment>
    )
}

export default SignUp;