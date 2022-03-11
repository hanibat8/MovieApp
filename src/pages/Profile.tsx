import React from 'react';
import Header from '../components/UI/Header';
import Layout from '../components/UI/Layout';
import {auth,db} from '../firebase-config';
import {ref,get,child} from 'firebase/database';
import classes from './Profile.module.css';

const Profile=()=>{
    const user = auth.currentUser;
    console.log(user)

    return(
        <React.Fragment>
            <Header/>
            <div className={classes['profile']} style={{backgroundImage:`linear-gradient(rgb(21, 14, 54,.8),rgba(21, 14, 54,.4)), url(https://www.themoviedb.org/assets/2/v4/account_pipes/teal-2b30e621b46abc5f5c1c192b0adfbf81793a9f082d749fc3d20047a4ef10c27f.svg)`}}>
                <Layout className={classes['profile__details']}>
                    <div className={classes['profile__details--circle']}>
                        <span>{user?.email?.slice(0,1).toUpperCase()}</span>
                    </div>
                </Layout>
            </div>
        </React.Fragment>
    )
}

export default Profile;