import React from 'react';
import './Header.css';
import Search from '../Search/Search';
import {Fragment} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import {auth} from '../../firebase-config';
import Layout from './Layout';

const Header=()=>{

    //const authContext=useContext(AuthContext);
    //const isLoggedIn=authContext.isLoggedIn;

    const navigate=useNavigate();
    const user = auth.currentUser;
   // console.log(user);

    const logoutHandler=()=>{
        signOut(auth).then((s)=>{
            console.log(s);
            //authContext.logOut();
            navigate('/')
        }).catch((err)=>alert(err.message));
    }
    

    return(
        <>
            <div className='header__container'>
                <Layout>
                <div className={`header`}>
                    <div className={`navbar`}>
                        <div className={`navbar__links`}>
                            <Link to='/movies' className={`navbar__link`}>
                                Movies
                                <div className={`navbar__link__dropdown`}>
                                    <ul>
                                        <li className={`navbar__list`}>
                                            <Link to='/movies/popular' className={`navbar__list__category`}>Popular</Link></li>
                                        <li className={`navbar__list`} >
                                            <Link to='/movies/topRated' className={`navbar__list__category`}>Top Rated</Link></li>
                                       <li className={`navbar__list`}>
                                            <Link to='/movies/upcoming' className={`navbar__list__category`}>Upcoming</Link></li>
                                    </ul>
                                </div>
                            </Link>
                            <Link to='/tvShows' className={`navbar__link`}>
                                TVShows
                                <div className={`navbar__link__dropdown`}>
                                    <ul>
                                        <li className={`navbar__list`}>
                                            <Link to='/tvShows/popular' className={`navbar__list__category`}>Popular</Link></li>
                                        <li className={`navbar__list`} >
                                            <Link to='/tvShows/topRated' className={`navbar__list__category`}>Top Rated</Link></li>
                                        <li className={`navbar__list`}>
                                            <Link to='/tvShows/upcoming' className={`navbar__list__category`}>Upcoming</Link></li>
                                    </ul>
                                </div>
                            </Link>
                        </div>
                        <div className={`navbar__login`}>
                            {!user&&
                                <Fragment> 
                                    <Link to='/signUp' className={`navbar__link`}>
                                        Join TMDB
                                    </Link>  
                                    <Link to='/logIn' className={`navbar__link`}>
                                        Login
                                    </Link>   
                                </Fragment>
                                }
                            {user && 
                                <Fragment> 
                                    <Link to='/profile' className={`navbar__link`}>
                                         Profile
                                    </Link> 
                                    <button className={`navbar__btn`} onClick={logoutHandler}>Logout</button>
                                </Fragment>
                            }
                        </div>
                    </div>
                    <Search/>
                </div>
                </Layout>
            </div>
        </>
    )
}

export default Header;