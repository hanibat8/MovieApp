import React,{useState,useCallback} from 'react';
import SearchAPI from './SearchAPI';
import classes from './Search.module.css';
import debounce from 'lodash.debounce';
import magnifyingGlass from '../../assets/magnifying-glass.png';

const Search=()=>{

    const [inputSearchTerm,setInputSearchTerm]=useState('');
    const [searchButtonClicked,setSearchButtonClicked]=useState(false);

    const searchQueryHandler=(event:{target:{value:string}})=>{
        setInputSearchTerm(event.target.value);
            
    };

    const debounceChangeHandler=useCallback(debounce(searchQueryHandler,400),[]);

    const searchButtonClickHandler=()=>{
       searchButtonClicked ? setSearchButtonClicked(false): setSearchButtonClicked(true);
    }

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