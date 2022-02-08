import Header from "../components/UI/Header";
import Footer from "../components/UI/Footer";
import classes from './SingleMovie.modules.css';
import Layout from "../components/UI/Layout";
import {useEffect} from 'react';
import useHttp from '../hooks/use-http';
import { useParams } from "react-router-dom";
import {renderResponseItem} from '../utils/util';
import heartIcon from '../assets/heart-outlined.png';
import boolMarkIcon from '../assets/bookmark.png';
import playIcon from '../assets/controller-play.png';
import Carousal from "../components/Carousal/Carousal";
import CarousalItem from "../components/Carousal/CarousalItem";

const mapGenres=(genreArr)=>genreArr.map((genre)=><span key={genre.id} className="single-movie--genre">{`${genre.name}`}</span>);

const SingleMovie=(props)=>{

    const params=useParams();
    const {sendRequest,response:movie,error,isLoading,unsetState}=useHttp();
   
    console.log(movie);

    useEffect(()=>{
        //console.log('Request sent');
        sendRequest({url:`https://api.themoviedb.org/3/movie/${params.movieId}?api_key=5c8ece04ea5e1e31bb7e5630081968b6&language=en-US`});
        
        return()=>{
            unsetState();
        }
    },[sendRequest,unsetState]);

    
    const cast=movie?.genres.map((genre)=>{
            return <CarousalItem>
                <div key={genre.id}>
                    <img src="https://www.themoviedb.org/t/p/w138_and_h175_face/hhKZGnu66EXC0nDYzjErMs62ETb.jpg" className='carousal-item--img'/>
                    {genre.name}
                </div>
            </CarousalItem>
        });

    return(
        <>
            <Header/>
                {(isLoading || error ) && <div className='single-movie__container'>{renderResponseItem(isLoading,error)}</div>} 
                {movie && <> <div className='single-movie__container' style={{backgroundImage:`linear-gradient(rgba(27, 27, 27, 0.8),rgba(10, 10, 10, 0.8)), url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${movie.backdrop_path})`}}>
                            <Layout>
                                <div className={`single-movie--detail__container`}>
                                    <div className={`single-movie--img__container`}>
                                        <img src={`https://www.themoviedb.org/t/p/w440_and_h660_face/`+movie.poster_path} className={'single-movie--img'}/>
                                    </div>
                                    <div className={'single-movie--info__container'}>
                                        <h2 className="single-movie--heading">{movie.original_title}<span className="single-movie--heading--year">{`(${movie.release_date.split('-')[0]})`}</span></h2>
                                        <span className="single-movie--date">{movie.release_date.split('-').join('/')}</span>
                                        {mapGenres(movie.genres)}
                                        <span className="single-movie--runtime">{`${movie.runtime}m`}</span>
                                        <div className="single-movie--buttons">
                                            <div className="single-movie--user-score--container">
                                                <span className="single-movie--user-score">{movie.vote_average*10}<sup>%</sup></span>
                                            </div>
                                            <button className="single-movie--button">
                                                <img src={heartIcon}/>
                                            </button>
                                            <button className="single-movie--button">
                                                <img src={boolMarkIcon}/>
                                            </button>
                                            <button className="single-movie--play-button">
                                                <img className="single-movie--play-button--img" src={playIcon}/>
                                                <span>Play Trailer</span>
                                            </button>
                                        </div>
                                    <p className="single-movie--tagline">{movie.tagline}</p>
                                    <div className="single-movie--overview">
                                        <h3>Overview</h3>
                                        <p>{movie.overview}</p>
                                    </div>
                                    </div>
                                </div>
                            </Layout>
                        </div>
                        <Layout>
                        <h2>Top Billed Cast</h2>
                        <Carousal>{cast}</Carousal>
                        </Layout>
                        </>}
            <Footer/>
        </>
    );
}

export default SingleMovie;