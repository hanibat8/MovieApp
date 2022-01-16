import merge from 'lodash/merge';
import { initStore } from "./store"

const configureStore=()=>{
    const actions={
        TOGGLE_FAV:(curState,movieDetails)=>{
            console.log(movieDetails)
            let newFavoriteArr=[movieDetails];
            //console.log(newFavoriteArr);
            //console.log(movieDetails);
            //newFavoriteArr.push(movieDetails);
            //console.log(newFavoriteArr);
            console.log(curState.favorite);
            if(curState.favorite){
                console.log(curState.favorite);
                console.log(newFavoriteArr);
                newFavoriteArr=[...newFavoriteArr,...curState.favorite];
                console.log(newFavoriteArr);
            }
            // curState.favorite.push(movieDetails.movieId);
            // console.log(curState);

            return {...curState,favorite:newFavoriteArr}

        },
        ADD_MOVIES:(curState,movies)=>{
            return {...movies}
        }
    }

    initStore(actions);
}

export default configureStore;