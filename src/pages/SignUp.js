import React,{useContext,useEffect} from 'react';
import {useNavigate } from 'react-router-dom';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Header from '../components/UI/Header';
import Input from '../components/UI/Input';
import classes from './Form.module.css';
import useHttp from '../hooks/use-http';
import {renderResponseItem} from '../utils/util';
import AuthContext from '../store/auth-context';

const SignUp=()=>{
    const {sendRequest,unsetState,response,isLoading,error}=useHttp();

    const authContext=useContext(AuthContext);
    const navigate=useNavigate ();

    const isLoggedIn=authContext.isLoggedIn;

    useEffect(()=>{
       // !error && !isLoading && response && authContext.logIn(response.idToken);
       response && authContext.logIn(response.idToken);   
       isLoggedIn && navigate('/');
    },[response,authContext,isLoggedIn])

    useEffect(()=>{
        return()=>{
            unsetState();
        }
    },[unsetState])

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
            onSubmit={(values, { setSubmitting }) => {
                 //unsetState();
                 sendRequest({
                    url:'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC3tkL__9PuUSI_bZBzyJIAjxda4AHOZog',
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
                
                    !error && !isLoading && setSubmitting(false);
                }}>
                {formik => {
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
                                {(isLoading || error) && renderResponseItem(isLoading,error,response)}
                                {!isLoading &&  <button type="submit" disabled={!formik.isValid || formik.isSubmitting} className={classes['form__btn']}>Sign Up</button>}
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