import {useState,useCallback} from 'react';
import SearchAPI from './SearchAPI';
import classes from './Search.module.css';
import debounce from 'lodash.debounce';
import magnifyingGlass from '../../assets/magnifying-glass.png';

const Search=()=>{
    //const [globalState,setGlobalState]=useStore();

    const [inputSearchTerm,setInputSearchTerm]=useState('');
    const [searchButtonClicked,setSearchButtonClicked]=useState(false);

    const searchQueryHandler=(event)=>{
        setInputSearchTerm(event.target.value);
            
    };

    console.log(inputSearchTerm);

    const debounceChangeHandler=useCallback(debounce(searchQueryHandler,400),[]);

    /*const filterMovies=(query)=>{
        //let arr=globalState?.movie?.filter(mov=> {return mov.original_title.toLowerCase().startsWith(query)});
        //console.log(arr);
        setFilteredMovies(dataQuery);       
    }*/

    const searchButtonClickHandler=()=>{
       searchButtonClicked ? setSearchButtonClicked(false): setSearchButtonClicked(true);
    }

    /*useEffect(()=>{
        filterMovies(inputSearchTerm);
    },[inputSearchTerm])*/

    return(
        <>
            <img src={magnifyingGlass} className={classes['search__icon']} onClick={searchButtonClickHandler}/>
            {searchButtonClicked && <form className={classes.form}>
                <input className={classes.search} placeholder='Search' onChange={debounceChangeHandler}/>
                {inputSearchTerm.length>0 && <SearchAPI query={inputSearchTerm}/>}
            </form>}
        </>
    )
}

export default Search;