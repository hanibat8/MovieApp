import { useQuery } from "react-query";
import axios from "axios";

/*export interface MovieInterface {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }
*/
const API_KEY=`5c8ece04ea5e1e31bb7e5630081968b6`;

export const useMovies=(props:{category:string})=>{
    //console.log(`https://api.themoviedb.org/3/movie/${props.category.toLowerCase()}?api_key=${API_KEY}`);
    if(props.category==='Trailer')props.category='Now Playing';
    const {isLoading,data:item,isError,error,isFetching}=useQuery(props.category,()=>axios.get(`https://api.themoviedb.org/3/movie/${props.category.split(' ').join('_').toLowerCase()}?api_key=${API_KEY}`),{staleTime:Infinity});
    return {
        isLoading,
        item,
        isError,
        error,
        isFetching
    }
}
