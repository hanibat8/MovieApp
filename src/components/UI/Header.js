import './Header.css';
import Search from './../Search/Search';
import {Fragment} from 'react';
import { Link } from 'react-router-dom';

const Header=()=>{
    return(
        <Fragment>
            <div className='header__container'>
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
                            <Link to='/signUp' className={`navbar__link`}>
                                Join TMDB
                            </Link>
                            <Link to='/logIn' className={`navbar__link`}>
                                Login
                            </Link>
                        </div>
                    </div>
                    <Search/>
                </div>
            </div>
        </Fragment>
    )
}

export default Header;