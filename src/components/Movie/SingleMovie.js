import classes from './SingleMovie.module.css';

const SingleMovie=(props)=>{
    return(
        <div className={classes['single-movie']}> 
            <img className={classes['single-movie__img']} src={`https://www.themoviedb.org/t/p/w220_and_h330_face/`+props.movie.poster_path}/>
        </div>
    )
}

export default SingleMovie;