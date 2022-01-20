import Layout from "../components/UI/Layout";
import MovieList from "../components/Movie/MovieList";
import Header from "../components/UI/Header";
import classes from './Home.module.css';
import React from 'react';

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
            <MovieList url={'https://api.themoviedb.org/3/movie/popular?api_key=5c8ece04ea5e1e31bb7e5630081968b6'} carousal='carousal' category={`What's Popular`}/>
            <MovieList url={'https://api.themoviedb.org/3/movie/top_rated?api_key=5c8ece04ea5e1e31bb7e5630081968b6'} carousal='carousal'  category={`Top Rated`}/>
            <MovieList url={'https://api.themoviedb.org/3/movie/now_playing?api_key=5c8ece04ea5e1e31bb7e5630081968b6'} carousal='carousal' category={`Upcoming `}/>
          </Layout>
        </React.Fragment>
    )
}

export default Home;