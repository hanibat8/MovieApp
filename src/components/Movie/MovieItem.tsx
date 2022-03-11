import React from 'react';
import Carousal from '../Carousal/Carousal';
import CarousalItem from '../Carousal/CarousalItem';
import CircularScore from '../UI/CircularScore';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import {auth} from '../../firebase-config';
import {db} from '../../firebase-config';
import {ref,set,get,child,push} from 'firebase/database';
import optionIcon from '../../assets/dots-three-horizontal.png';
import classes from './MovieItem.module.css';

interface Props {
    list:[] | JSX.Element,
    category:string
}

const MovieItem:React.FC<Props>=props=>{
    //const[state,dispatch]=useStore();
    //console.log('Movie Item render',state);

    const user = auth.currentUser;

    let content;
    let navigate = useNavigate();

    const navigateToSignUpPage=()=> navigate('/signUp'); 

    const navigateToLoginInForm=()=> navigate('/login');

    const toggleFavHandler=(id:number)=>{
      // dispatch('TOGGLE_FAV',{movieId:movie.id,category:props.category});
    }


    const addWishlistFavMovieToDB=(movieId:number,category:string)=>{
        set(ref(db,`users/${auth.currentUser?.uid}/${category}/`),{[movieId]:true})
    };

    const updateWishlistFavMovieToDB=(movieId:string,category:string)=>{
        //console.log('here');
        const nodeRef = child(ref(db), `users/${auth.currentUser?.uid}/${category}/` + movieId); // id = custom ID you want to specify 

        set(nodeRef, true )
    }

    const toggleWishlistFavHandler=(movieId:number,category:string)=>{
        //dispatch('TOGGLE_WISHLIST',{movieId:movie.id,category:props.category});
        get(child(ref(db), `users/${user?.uid}/${category}`)).then((snapshot) => {
            if (snapshot.exists()) {
                //console.log(snapshot.child(`${movieId}`).exists());
                !snapshot.child(`${movieId}`).exists() && updateWishlistFavMovieToDB(movieId+'',category);
                //addWishlistMovieToDB(movieId);
            }
            else {
                addWishlistFavMovieToDB(movieId,category);
            }
            }).catch((error) => {
                console.error(error);
            });

    }

    
    if(Array.isArray(props.list) && props.list.length>0){
        let imgSrc='w440_and_h660_face/';
        content=props.list.map((movie:{id:number,original_title:string,vote_average:number,poster_path:string})=>{
            return <CarousalItem >
                        <input className={classes['movie-item--checkbox']} type="checkbox" id="btnControl"/>                   
                        <div className={classes['movie-item--icon__container']}>
                            <img decoding='async' className={classes['movie-item--icon']} src={optionIcon}/>
                        </div>
                        <div className={classes[`movie-item__dropdown`]}>
                            <ul>
                                <li className={classes[`movie-item__list`]}>
                                    <button className={classes[`movie-item__btn`]} onClick={user ? toggleWishlistFavHandler.bind(window,movie.id,'wishlist'):navigateToSignUpPage}>{user? 'Add to wishlist':'Login to wishlist'}</button>
                                </li>
                                <li className={classes[`movie-item__list`]} >
                                    <button className={classes[`movie-item__btn`]}  onClick={user ? toggleWishlistFavHandler.bind(window,movie.id,'favorite'):navigateToLoginInForm}>{user?'Add to favorite':'SignUp to favorite'}</button>
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