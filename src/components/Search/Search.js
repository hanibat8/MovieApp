import {useState,useCallback,useEffect} from 'react';
import classes from './Search.module.css';
import debounce from 'lodash.debounce';
import { useStore } from '../../hooks-store/store';
import magnifyingGlass from '../../assets/magnifying-glass.png';

const displayFilteredMovies=(arr)=>{
    return arr.map((mov)=><div className={classes.filteredMovies}>{mov.original_title}</div>);
}

const Search=()=>{
    const [globalState,setGlobalState]=useStore();

    const [inputSearchTerm,setInputSearchTerm]=useState('');
    const [searchButtonClicked,setSearchButtonClicked]=useState(false);
    const [filteredMovies,setFilteredMovies]=useState([]);

    const searchQueryHandler=(event)=>{
        if(event.target.value!='')setInputSearchTerm(event.target.value);
        else setFilteredMovies([]);
            
    };

    const debounceChangeHandler=useCallback(debounce(searchQueryHandler,400),[]);

    console.log(globalState);

    const filterMovies=(query)=>{
        let arr=globalState?.movie?.filter(mov=> {return mov.original_title.toLowerCase().startsWith(query)});
        console.log(arr);
        setFilteredMovies(arr);       
    }

    const searchButtonClickHandler=()=>{
       searchButtonClicked ? setSearchButtonClicked(false): setSearchButtonClicked(true);
       if(!searchButtonClicked)setFilteredMovies([]);
    }

    useEffect(()=>{
        filterMovies(inputSearchTerm);
    },[inputSearchTerm])

    return(
        <>
            <img src={magnifyingGlass} className={classes['search__icon']} onClick={searchButtonClickHandler}/>
            {searchButtonClicked && <form className={classes.form}>
                <input className={classes.search} placeholder='Search' onChange={debounceChangeHandler}/>
                {filteredMovies?.length>0 && displayFilteredMovies(filteredMovies)}
            </form>}
        </>
    )
}

export default Search;