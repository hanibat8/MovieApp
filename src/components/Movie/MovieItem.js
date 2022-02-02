import optionIcon from '../../assets/dots-three-horizontal.png';
import { useStore } from '../../hooks-store/store';
import { Link } from 'react-router-dom';
import Carousal from '../Carousal/Carousal';
import classes from './MovieItem.module.css';

const MovieItem=(props)=>{
    const[state,dispatch]=useStore();

    let content;

    const toggleFavHandler=(movie)=>{
       dispatch('TOGGLE_FAV',{movieId:movie.id,category:props.category});
    }

    const toggleWishlistHandler=(movie)=>{
        dispatch('TOGGLE_WISHLIST',{movieId:movie.id,category:props.category});
    }

    const isMovieFavorited=(id,favArr=state.favorite)=>favArr.some(fav=>fav.movieId===id);

    const isMovieWishlisted=(id,wishlistArr=state.wishlist)=>wishlistArr.some(wish=>wish.movieId===id);

    if(props.list.length>0){
        content=props.list.map((movie)=>{
            return <div key={movie.id} className={classes[`movie-item`]}>
                        <input className={classes['movie-item--checkbox']} type="checkbox" id="btnControl"/>                   
                        <div className={classes['movie-item--icon__container']}>
                            <img className={classes['movie-item--icon']} src={optionIcon}/>
                        </div>
                        <div className={classes[`movie-item__dropdown`]}>
                            <ul>
                                <li className={classes[`movie-item__list`]}>
                                    <button className={classes[`movie-item__btn`]} onClick={toggleWishlistHandler.bind(this,movie)}>{state.wishlist && isMovieWishlisted(movie.id)? `Remove from wishlist`:`Add to wishlist`}</button>
                                </li>
                                <li className={classes[`movie-item__list`]} >
                                    <button className={classes[`movie-item__btn`]} onClick={toggleFavHandler.bind(this,movie)}>{state.favorite && isMovieFavorited(movie.id)? `Unfavorite` :`Favorite`}</button>
                                </li>
                            
                            </ul>
                        </div>
                        <Link to={`/movies/${movie.id}`}>
                            <img className={classes['movie-item--img']} src={`https://www.themoviedb.org/t/p/w440_and_h660_face/`+movie.poster_path}/>      
                            <h4 className={classes['movie-item--name']}>{movie.original_title}</h4>
                        </Link>
                </div>
            }       
        )
    }

    return(
        <Carousal>
            {props.list.length>0 && content}
        </Carousal>
    );
}

export default MovieItem;