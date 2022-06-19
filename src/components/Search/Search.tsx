import React,{useState,useCallback} from 'react';
import SearchAPI from './SearchAPI';
import classes from './Search.module.css';
import debounce from 'lodash.debounce';

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
            <svg xmlns="http://www.w3.org/2000/svg" className={classes['search__icon']} onClick={searchButtonClickHandler} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchButtonClicked && <form className={classes.form}>
                <input className={classes.search} placeholder='Search' onChange={debounceChangeHandler}/>
                {inputSearchTerm.length>0 && <SearchAPI query={inputSearchTerm}/>}
            </form>}
        </>
    )
}

export default Search;