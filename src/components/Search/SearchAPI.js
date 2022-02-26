import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import {renderResponseItem} from '../../utils/util';
import axios from 'axios';
import classes from './SearchAPI.module.css';

const API_KEY=`5c8ece04ea5e1e31bb7e5630081968b6`;

const displayFilteredMovies=(arr)=>{
    return arr.map((mov)=><div className={classes.filteredMovies}>
                                 <Link to={`/movies/${mov.id}`}>{mov.original_title}</Link>
                            </div>
                  );
}

const SearchAPI=({query})=>{
    console.log('search');
    const {isLoading,data:item,isError,error,isFetching}=useQuery(`search${query}`,()=>axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${query}`),{staleTime:Infinity});

    return <>
        {(isLoading || isError ) && <div className={classes.filteredMovies}>{renderResponseItem(isLoading,error)}</div>}
        {item && displayFilteredMovies(item.data.results.slice(0,7))}
    </>
}

export default SearchAPI;