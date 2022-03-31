import React from 'react';
import CircularScore from '../UI/CircularScore';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import {auth} from '../../firebase-config';
import {getWishlistFavMovies} from '../../utils/util';
import optionIcon from '../../assets/dots-three-horizontal.png';
import heartOutlineIcon  from '../../assets/heart-outlined.png';
import bookmarkOutline from '../../assets/bookmark_outline.png';
import classes from './MovieItem.module.css';

type movie={
    id: number,
    original_title: string,
    vote_average: number,
    poster_path: string,
    overview:string
}

interface Props {
    movie:movie 
    type?:string
}

const MovieItem:React.FC<Props>=props=>{ 

    const user = auth.currentUser;
    
    let navigate = useNavigate();
    const navigateToSignUpPage=()=> navigate('/signUp'); 
    const navigateToLoginInForm=()=> navigate('/login');

    let imgSrc='w440_and_h660_face/';

    let itemClass=props.type==='carousal--item'?'movie-carousal-item':'movie-item';

    return (
        <div className={classes[itemClass]}>
             <input data-testid={props.movie.id} className={classes['movie-item--checkbox']} type="checkbox" id="btnControl"/>                   
                        <div className={classes['movie-item--icon__container']}>
                            <img decoding='async' className={classes['movie-item--icon']} src={optionIcon}/>
                        </div>
                        <div className={classes[`movie-item__dropdown`]}>
                            <ul>
                                <li className={classes[`movie-item__list`]}>
                                    <button className={classes[`movie-item__btn`]} onClick={user ? getWishlistFavMovies.bind(window,user?.uid,{id:props.movie.id,original_title:props.movie.original_title,overview:props.movie.overview,poster_path:props.movie.poster_path},'wishlist'):navigateToSignUpPage}>{user? <div><img src={bookmarkOutline}/><span>Add to Wishlist</span></div>:'Login to wishlist'}</button>
                                </li>
                                <li className={classes[`movie-item__list`]} >
                                    <button className={classes[`movie-item__btn`]}  onClick={user ? getWishlistFavMovies.bind(window,user?.uid,{id:props.movie.id,original_title:props.movie.original_title,overview:props.movie.overview,poster_path:props.movie.poster_path},'favorite'):navigateToLoginInForm}>{user?<div><img src={heartOutlineIcon}/><span>Add to Favorite</span></div>:'SignUp to favorite'}</button>
                                </li>
                            
                            </ul>
                        </div>
                        <Link to={`/movies/${props.movie.id}`}>
                            <div className={classes['movie-item--container']}>
                                <img decoding='async' className={classes['movie-item--img']} src={`https://www.themoviedb.org/t/p/${imgSrc}`+props.movie.poster_path}/> 
                                <div className={classes['movie-item--score']}>
                                    <CircularScore circularClassName={classes['movie--item--score']} score={props.movie.vote_average}/>
                                </div>
                            </div>     
                            <h4 className={classes['movie-item--name']}>{props.movie.original_title}</h4>
                        </Link>
        </div>
    );
}

export default MovieItem;