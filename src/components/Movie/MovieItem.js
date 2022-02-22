import React from 'react';
import Carousal from '../Carousal/Carousal';
import CarousalItem from '../Carousal/CarousalItem';
import CircularScore from '../UI/CircularScore';
import { useStore } from '../../hooks-store/store';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../store/auth-context';
import { Link } from 'react-router-dom';
import optionIcon from '../../assets/dots-three-horizontal.png';
import classes from './MovieItem.module.css';

const MovieItem=props=>{
    const[state,dispatch]=useStore();
    console.log('Movie Item render',state);

    const authContext=useAuth();
    const isLoggedIn=authContext.isLoggedIn;

    let content;
    let navigate = useNavigate();

    const navigateToSignUpPage=()=> navigate('/signUp'); 

    const navigateToLoginInForm=()=> navigate('/login');

    const toggleFavHandler=(movie)=>{
       dispatch('TOGGLE_FAV',{movieId:movie.id,category:props.category});
    }

    const toggleWishlistHandler=(movie)=>{
        dispatch('TOGGLE_WISHLIST',{movieId:movie.id,category:props.category});
    }

    const isMovieFavorited=(id,favArr=state.favorite)=>favArr.some(fav=>fav.movieId===id);

    const isMovieWishlisted=(id,wishlistArr=state.wishlist)=>wishlistArr.some(wish=>wish.movieId===id);
    
    if(props.list.length>0){
        let imgSrc='w440_and_h660_face/';
        content=props.list.map((movie)=>{
            return <CarousalItem category={props.category}>
                        <input className={classes['movie-item--checkbox']} type="checkbox" id="btnControl"/>                   
                        <div className={classes['movie-item--icon__container']}>
                            <img className={classes['movie-item--icon']} src={optionIcon}/>
                        </div>
                        <div className={classes[`movie-item__dropdown`]}>
                            <ul>
                                <li className={classes[`movie-item__list`]}>
                                    <button className={classes[`movie-item__btn`]}onClick={isLoggedIn?toggleWishlistHandler.bind(this,movie):navigateToSignUpPage}>{isLoggedIn? state.wishlist && isMovieWishlisted(movie.id)? `Remove from wishlist`:`Add to wishlist`:'Login to wishlist'}</button>
                                </li>
                                <li className={classes[`movie-item__list`]} >
                                    <button className={classes[`movie-item__btn`]}  onClick={isLoggedIn?toggleFavHandler.bind(this,movie):navigateToLoginInForm}>{isLoggedIn?state.favorite && isMovieFavorited(movie.id)? `Unfavorite` :`Favorite`:'SignUp to favorite'}</button>
                                </li>
                            
                            </ul>
                        </div>
                        <Link to={`/movies/${movie.id}`}>
                            <div className={classes['movie-item--container']}>
                                <img className={classes['movie-item--img']} src={`https://www.themoviedb.org/t/p/${imgSrc}`+movie.poster_path}/> 
                                <div className={classes['movie-item--score']}>
                                    <CircularScore className={classes['movie--item--score']} score={movie.vote_average}/>
                                </div>
                            </div>     
                            <h4 className={classes['movie-item--name']}>{movie.original_title}</h4>
                        </Link>
                        
                </CarousalItem>
            }       
        )
    }

    return(
       props.list.length>0 && <Carousal category={props.category}>
            {props.list.length>0 && content}
        </Carousal>
    
    );
}

export default React.memo(MovieItem);