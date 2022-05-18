import React, { useState , useRef, useEffect } from 'react';
import Layout from "../components/UI/Layout";
import classes from './MoviesCategory.module.css';
import Header from '../components/UI/Header';
import MovieItem from '../components/Movie/MovieItem';
import {renderResponseItem} from '../utils/util';
import {useMovies} from  '../hooks/use-movies';
import Footer from '../components/UI/Footer';

type movie={
    id: number,
    original_title: string,
    vote_average: number,
    poster_path: string,
    overview:string,
    release_date:string
}

interface Props {
    category:string
}

const MoviesCategory:React.FC<Props>=(props)=>{

    const {isLoading,item,isError,error,isFetching}=useMovies({category:props.category});
    const [moviesContent,setMoviesContent]=useState<any[]>([]);

    const selectElRef = useRef<HTMLSelectElement>(null);

    const generateSortedMoviesJSX=(sortedArr:any[])=>{
        console.log(sortedArr);
        setMoviesContent(sortedArr.map((movie:movie)=>{
                //console.log(movie);
            return <MovieItem movie={movie}/>
        }       
        ))
    }

    console.log('here');

    useEffect(()=>{
        item?.data.results && generateSortedMoviesJSX(item?.data.results);
    },[item?.data.results])

    const sortMovies=(sortType:string|undefined)=>{
        if(Array.isArray(item?.data.results) && item?.data.results.length>0){
            console.log(item?.data.results[0]);
            switch (sortType) {
                case "Popularity Descending":
                    generateSortedMoviesJSX(item?.data.results.sort((a:movie, b:movie) => (b.vote_average > a.vote_average ? 1 : -1)))
                  break;
                case "Popularity Ascending":
                    generateSortedMoviesJSX(item?.data.results.sort((a:movie, b:movie) => (a.vote_average > b.vote_average ? 1 : -1)))                    
                  break;
                case "Release Date Descending":
                    generateSortedMoviesJSX(item?.data.results.sort((a:movie, b:movie) =>( (a.release_date) > (b.release_date) ? 1 : -1)))
                  break;
                case "Release Date Ascending":
                    generateSortedMoviesJSX(item?.data.results.sort((a:movie, b:movie) =>( (b.release_date) > (a.release_date) ? 1 : -1)));
                  break;  
                case "Title (A-Z)":
                    generateSortedMoviesJSX(item?.data.results.sort((a:movie, b:movie) =>( (a.original_title.trim()) > (b.original_title.trim()) ? 1 : -1)))
                  break;
                case "Title (Z-A)":
                    generateSortedMoviesJSX(item?.data.results.sort((a:movie, b:movie) =>((b.original_title.trim()) > (a.original_title.trim()) ? 1 : -1)));
                  break;
                default:
                  break;
                
              }
        }
    }

    const clickHandler=(e:React.FormEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        let sortType=selectElRef.current?.value;
        sortMovies(sortType);
    }

    return (
        <React.Fragment>
            <Header/>
            <Layout className={classes['popular__movie__layout']}>
                <aside className={classes['popular__movie__aside']}>
                    <h2 className={classes['popular__movie__aside__sort__main-heading']}>Popular Movies</h2>
                    <div className={classes['popular__movie__aside__sort']}>
                        <h4 className={classes['popular__movie__aside__sort__sub-heading']}>Sort</h4>
                        <label htmlFor='sort' className={classes['popular__movie__aside__sort__label']}>Sort Results By</label>
                        <select ref={selectElRef} id='sort' className={classes['popular__movie__aside__sort__select']}>
                            <option value='Popularity Descending' className={classes['popular__movie__aside__sort__option']}>Popularity Descending</option>
                            <option value='Popularity Ascending' className={classes['popular__movie__aside__sort__option']}>Popularity Ascending</option>
                            <option value='Release Date Descending' className={classes['popular__movie__aside__sort__option']}>Release Date Descending</option>
                            <option value='Release Date Ascending' className={classes['popular__movie__aside__sort__option']}>Release Date Ascending</option>
                            <option value='Title (A-Z)' className={classes['popular__movie__aside__sort__option']}>Title (A-Z)</option>
                            <option value='Title (Z-A)'className={classes['popular__movie__aside__sort__option']}>Title (Z-A)</option>
                        </select>
                    </div>
                    <button className={classes['sort__btn']} type='submit' onClick={clickHandler}>Search</button>
                </aside>
                <div className={classes['popular__movie__main']}>
                    {(isFetching || isError || isLoading ) && renderResponseItem(isFetching,error)} 
                    {moviesContent && <div className={classes['popular__movie__main__grid']}>{moviesContent}</div>}
                </div>
            </Layout>
            <Footer/>
        </React.Fragment>
    )
}

export default MoviesCategory;