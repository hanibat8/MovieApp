import Header from "../components/UI/Header";
import Footer from "../components/UI/Footer";
import classes from './SingleMovie.modules.css';
import Layout from "../components/UI/Layout";
import {useEffect} from 'react';
import useHttp from '../hooks/use-http';
import { useParams } from "react-router-dom";
import {renderResponseItem} from '../utils/util';

const mapGenres=(genreArr)=>genreArr.map((genre)=><span className="single-movie--genre">{` ${genre.name}`}</span>);

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

    return(
        <>
            <Header/>
                {(isLoading || error ) && <div className='single-movie__container'>{renderResponseItem(isLoading,error)}</div>} 
                {movie && <div className='single-movie__container' style={{backgroundImage:`linear-gradient(rgba(27, 27, 27, 0.8),rgba(10, 10, 10, 0.8)), url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${movie.backdrop_path})`}}>
                            <Layout>
                                <div className={`single-movie--detail__container`}>
                                    <div className={`single-movie--img__container`}>
                                        <img src={`https://www.themoviedb.org/t/p/w440_and_h660_face/`+movie.poster_path} className={'single-movie--img'}/>
                                    </div>
                                    <div className={'single-movie--info__container'}>
                                        <h2 className="single-movie--heading">{movie.original_title}<span className="single-movie--heading--year">{`(${movie.release_date.split('-')[0]})`}</span></h2>
                                        {mapGenres(movie.genres)}
                                        <span>{`. ${movie.runtime}m`}</span>
                                        <div className="single-movie--buttons">
                                            <div className="single-movie--user-score--container">
                                            <span className="single-movie--user-score">{movie.vote_average*10}<sup>%</sup></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Layout>
                        </div>}
            <Footer/>
        </>
    );
}

export default SingleMovie;