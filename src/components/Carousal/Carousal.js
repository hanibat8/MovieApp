import classes from './Carousal.module.css';

const Carousal=(props)=>{
    let content;
   //console.log(props);

    if(props.list.length>0){
        content=props.list.map((movie)=>{
           // console.log(movie);
            return<div className={classes[`${props.carousal}__item`]}>
                    <img className={classes['carousal__item--img']} src={`https://www.themoviedb.org/t/p/w440_and_h660_face/`+movie.poster_path}/>      
                    <h4 className={classes['carousal__item--name']}>{movie.original_title}</h4>
                </div>
        }       
        )
    }

    return(
        <div className={classes['carousal__container']}>
            <div className={classes[`${props.carousal}__list`]}>
                {props.list.length>0 && content}
            </div>
        </div>
    )
}

export default Carousal;