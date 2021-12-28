import classes from './Search.module.css';

const Search=()=>{
    return(
        <form className={classes.form}>
            <input className={classes.search} placeholder='Search'/>
        </form>
    )
}

export default Search;