import Layout from "../components/UI/Layout";
import MovieList from "../components/Movie/MovieList";
import Header from "../components/UI/Header";
import classes from './Home.module.css';
import React from 'react';
import Footer from "../components/UI/Footer";

const Home=()=>{
    return(
        <React.Fragment>
          <Header/>
          <div className={classes['home__poster']}>
                <h1 className={classes['home__poster__heading']}>Welcome.</h1>
                <h2 className={classes['home__poster__sub-heading']}>Millions of movies and TV shows to discover. Explore now.</h2>
                <form className={classes['home__poster__form']}>
                    <input className={classes['home__poster__form__input']} placeholder='Search'/>
                    <button className={classes['home__poster__form__btn']}>Search</button>
                </form>
            </div>
          <Layout >
            <MovieList category={`Popular`} />
            <MovieList category={'Trailer'}/>
            <MovieList category={'Top Rated'}/>
            <MovieList category={'Now Playing'}/>
          </Layout>
          <Footer/>
        </React.Fragment>
    )
}

export default Home;