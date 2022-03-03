import { initStore } from "./store"

const idExists=(arr,id)=>arr.some(item=>item.movieId===id);
const filteredArr=(arr,id)=>arr.filter(item=>item.movieId!=id);

const configureStore=()=>{
    const actions={
        TOGGLE_FAV:(curState,movieDetails)=>{
        
            let newFavoriteArr=[movieDetails];
            
            if(curState.favorite){
                if(idExists(curState.favorite,movieDetails.movieId))  newFavoriteArr=[...filteredArr(curState.favorite,movieDetails.movieId)];
                else newFavoriteArr=[...newFavoriteArr,...curState.favorite];
            }
        
            return {...curState,favorite:newFavoriteArr}
        },
        TOGGLE_WISHLIST:(curState,movieDetails)=>{
        
            let newWishlistArr=[movieDetails];
            
            if(curState.wishlist){
                if(idExists(curState.wishlist,movieDetails.movieId)) newWishlistArr=[...filteredArr(curState.wishlist,movieDetails.movieId)];
                else newWishlistArr=[...newWishlistArr,...curState.wishlist];
            }
        
            return {...curState,wishlist:newWishlistArr}
        },

        /*ADD_MOVIES:(curState,movies)=>{
            let newMovieArr=[...movies];

            if(curState.movie){
                newMovieArr=[...newMovieArr,...curState.movie];
                newMovieArr=uniqBy(newMovieArr, function (e) {//only get the unique array values
                    return e.id;
                });

                //console.log(newMovieArr);
            }
           
            return {...curState,movie:newMovieArr};
        }*/
    }

    initStore(actions);
}

export default configureStore;