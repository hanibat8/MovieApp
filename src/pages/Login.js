import React,{useContext,useEffect} from 'react';
import {useNavigate } from 'react-router-dom';
import Header from '../components/UI/Header';
import Input from '../components/UI/Input';
import classes from './Form.module.css';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import useHttp from '../hooks/use-http';
import {renderResponseItem} from '../utils/util';
import AuthContext from '../store/auth-context';

const Login=()=>{
    const {sendRequest,unsetState,response,isLoading,error}=useHttp();

    const authContext=useContext(AuthContext);
    const navigate=useNavigate ();

    const isLoggedIn=authContext.isLoggedIn;

    useEffect(()=>{
       // !error && !isLoading && response && authContext.logIn(response.idToken);
       response && authContext.logIn(response.idToken);
       isLoggedIn && navigate('/');
    },[response,authContext])

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
                password:""
            }}
            validationSchema={Yup.object({
            email: Yup.string()
                .email("Invalid email addresss`")
                .required("Required"),
            password: Yup.string()
                .min(5, "Must be 5 characters or more")
                .required("Required"),
            })}
            onSubmit={async(values, { setSubmitting }) => {
                unsetState();
                sendRequest({
                   url:'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC3tkL__9PuUSI_bZBzyJIAjxda4AHOZog',
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
                   //{error && console.log(error)}
               }}>
                {formik => {
                    //console.log('Formik props', formik)
                    return (
                        <div className={classes['form__container']}>
                        <Form className={classes['form']}>
                        <h2 className={classes['form__heading']}>Login</h2>
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
                        {(isLoading || error) && renderResponseItem(isLoading,error,response)}
                        {!isLoading && <button type="submit" disabled={!formik.isValid || formik.isSubmitting} className={classes['form__btn']} type="submit">Submit</button>}
                        </Form>
                        </div>
                    )}}
        </Formik>
    </React.Fragment>
    )
}

export default Login;