import React from 'react';
import Carousal from '../Carousal/Carousal';
import CarousalItem from '../Carousal/CarousalItem';
import CircularScore from '../UI/CircularScore';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import {auth} from '../../firebase-config';
import {getWishlistFavMovies} from '../../utils/util';
import optionIcon from '../../assets/dots-three-horizontal.png';
import heartOutlineIcon  from '../../assets/heart-outlined.png';
import bookmarkOutline from '../../assets/bookmark_outline.png';
import classes from './MovieItem.module.css';

interface Props {
    list:[] | JSX.Element,
    category:string
}

type movie={
    id: number,
    original_title: string,
    vote_average: number,
    poster_path: string,
    overview:string
}

const MovieItem:React.FC<Props>=props=>{

    const user = auth.currentUser;

    let content;
    
    let navigate = useNavigate();
    const navigateToSignUpPage=()=> navigate('/signUp'); 
    const navigateToLoginInForm=()=> navigate('/login');

    
    if(Array.isArray(props.list) && props.list.length>0){
        let imgSrc='w440_and_h660_face/';
        content=props.list.map((movie:movie)=>{
            return <CarousalItem >
                        <input data-testid={movie.id} className={classes['movie-item--checkbox']} type="checkbox" id="btnControl"/>                   
                        <div className={classes['movie-item--icon__container']}>
                            <img decoding='async' className={classes['movie-item--icon']} src={optionIcon}/>
                        </div>
                        <div className={classes[`movie-item__dropdown`]}>
                            <ul>
                                <li className={classes[`movie-item__list`]}>
                                    <button className={classes[`movie-item__btn`]} onClick={user ? getWishlistFavMovies.bind(window,user?.uid,{id:movie.id,original_title:movie.original_title,overview:movie.overview,poster_path:movie.poster_path},'wishlist'):navigateToSignUpPage}>{user? <div><img src={bookmarkOutline}/><span>Add to Wishlist</span></div>:'Login to wishlist'}</button>
                                </li>
                                <li className={classes[`movie-item__list`]} >
                                    <button className={classes[`movie-item__btn`]}  onClick={user ? getWishlistFavMovies.bind(window,user?.uid,{id:movie.id,original_title:movie.original_title,overview:movie.overview,poster_path:movie.poster_path},'favorite'):navigateToLoginInForm}>{user?<div><img src={heartOutlineIcon}/><span>Add to Favorite</span></div>:'SignUp to favorite'}</button>
                                </li>
                            
                            </ul>
                        </div>
                        <Link to={`/movies/${movie.id}`}>
                            <div className={classes['movie-item--container']}>
                                <img decoding='async' className={classes['movie-item--img']} src={`https://www.themoviedb.org/t/p/${imgSrc}`+movie.poster_path}/> 
                                <div className={classes['movie-item--score']}>
                                    <CircularScore circularClassName={classes['movie--item--score']} score={movie.vote_average}/>
                                </div>
                            </div>     
                            <h4 className={classes['movie-item--name']}>{movie.original_title}</h4>
                        </Link>
                        
                </CarousalItem>
            }       
        )
    }

    return(
        <>
        {Array.isArray(props.list) && props.list.length>0} <Carousal category={props.category}>
            { content}
        </Carousal>
        </>
    
    );
}

export default MovieItem;