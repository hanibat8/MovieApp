import React,{useState,useEffect} from 'react';
import Header from '../components/UI/Header';
import Input from '../components/UI/Input';
import classes from './Form.module.css';
import {useNavigate } from 'react-router-dom';
import {renderResponseItem} from '../utils/util';
import {
    createUserWithEmailAndPassword
  } from "firebase/auth";
import {auth} from '../firebase-config';
import { Formik, Form } from "formik";
import * as Yup from "yup";

const SignUp:React.FC=()=>{
    //const {sendRequest,unsetState,response,isLoading,error}=useHttp();
    const [error,setError]=useState(false);
    const navigate=useNavigate ();
    //const isLoggedIn=authContext.isLoggedIn;
    const user = auth.currentUser;
    console.log(user);

    useEffect(()=>{
        if(user){
            navigate('/');
        }
    },[])

    /*useEffect(()=>{
       // !error && !isLoading && response && authContext.logIn(response.idToken);
       response && authContext.logIn(response.idToken);   
       isLoggedIn && navigate('/');
    },[response,authContext,isLoggedIn])

    useEffect(()=>{
        return()=>{
            unsetState();
        }
    },[unsetState])*/
 
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
                .min(6, "Must be 6 characters or more")
                .required("Required"),
            confirmPassword: Yup.string()
                .min(6, "Must be 6 characters or more")
                .required("Required")
                .oneOf([Yup.ref('password'), null], 'Passwords must match'),
            email: Yup.string()
                .email("Invalid email address`")
                .required("Required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
                 //unsetState();
                 /*sendRequest({
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
                    });*/
                    createUserWithEmailAndPassword(
                        auth,
                        values.email,
                        values.password
                      ).then((userCredential:any) => {
                        console.log(userCredential);
                        setSubmitting(false);
                        //authContext.logIn(userCredential._tokenResponse.idToken);
                        navigate('/');
                      }).catch((err)=>{
                        setError(err.message);
                      })
                
                    //!error && !isLoading && setSubmitting(false);
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
                                {(formik.isSubmitting || error) && renderResponseItem(formik.isSubmitting,error)}
                                {!formik.isSubmitting && <button type="submit" disabled={!formik.isValid || formik.isSubmitting} className={classes['form__btn']}>Sign Up</button>}
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