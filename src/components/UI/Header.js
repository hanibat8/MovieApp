import classes from './Header.module.css';
import Search from './../Search/Search';
import {Fragment} from 'react';

const Header=()=>{
    return(
        <Fragment>
            <div className={classes.header__container}>
                <div className={classes.header}>
                    <div className={classes.navbar}>
                        <a className={classes.navbar__link}>Movies</a>
                        <a className={classes.navbar__link}>TVShows</a>
                    </div>
                    <Search/>
                </div>
            </div>
            <div className={classes.header__main}>
                <h1 className={classes.header__main__heading}>Welcome.</h1>
                <h2 className={classes['header__main__sub-heading']}>Millions of movies and TV shows to discover. Explore now.</h2>
                <form className={classes.header__main__form}>
                    <input className={classes.header__main__form__input} placeholder='Search'/>
                    <button className={classes.header__main__form__btn}>Search</button>
                </form>
            </div>
        </Fragment>
    )
}

export default Header;