import Header from '../components/UI/Header';
import Input from '../components/UI/Input';
import classes from './Form.module.css';
import React from 'react';
import { Formik, Form } from "formik";
import * as Yup from "yup";

const Login=()=>{
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
            onSubmit={async (values, { setSubmitting }) => {
                await new Promise(r => setTimeout(r, 500));
                setSubmitting(false);
            }}>
                {formik => {
                    console.log('Formik props', formik)
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
                        <button type="submit" disabled={!formik.isValid || formik.isSubmitting} className={classes['form__btn']} type="submit">Submit</button>
                        </Form>
                        </div>
                    )}}
        </Formik>
    </React.Fragment>
    )
}

export default Login;