import React from 'react';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import {db} from '../firebase-config';
import {ref,set,get,child} from 'firebase/database';
import classes from './util.module.css';

export const renderResponseItem=(isLoading:boolean,error:any,item:[] | null=null):[]|JSX.Element=>{

    if(isLoading){
        return <div className={classes.centered}><LoadingSpinner/></div>;
    }
    
    else if(error){
        return <div className={classes.centered}>{error}</div>;
    }
   
    else if(item){
        return item;
    }

    return [];

}

type movie={
    id: number,
    original_title: string,
    overview:string,
    poster_path: string,
}

export const addWishlistFavMovieToDB=(movie:movie, category:string, uid:string | undefined)=>{
    set(ref(db,`users/${uid}/${category}/${movie.id}`),movie)
};

export const updateWishlistFavMovieToDB=(movie:movie, category:string, uid:string | undefined)=>{
    console.log('in here');
    const nodeRef = child(ref(db), `users/${uid}/${category}/` + movie.id); // id = custom ID you want to specify 
    set(nodeRef, movie )
}

export const getWishlistFavMovies=(uid:string | undefined, movie:movie, category:string)=>{
    get(child(ref(db), `users/${uid}/${category}`)).then((snapshot) => {
        
        if (snapshot.exists()) {
            console.log('here');
             updateWishlistFavMovieToDB(movie,category,uid);  
        }

        else {
            console.log('or here');
            addWishlistFavMovieToDB(movie,category,uid);
        }
        
        }).catch((error) => {
            console.error(error);
        });
}