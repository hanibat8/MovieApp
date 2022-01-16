import classes from './Carousal.module.css';
import optionIcon from '../../assets/dots-three-horizontal.png';
import { useStore } from '../../hooks-store/store';

const Carousal=(props)=>{
    const[state,dispatch]=useStore();

    let content;
    //console.log(props);

    const toggleFavHandler=(movie)=>{
       dispatch('TOGGLE_FAV',{movieId:movie.id,category:props.category});
    }

    if(props.list.length>0){
        content=props.list.map((movie)=>{
            //console.log(movie);
            return<div className={classes[`${props.carousal}__item`]}>
                    <input className={classes['carousal__item--checkbox']} type="checkbox" id="btnControl"/>                   
                    <div className={classes['carousal__item--icon__container']}>
                        <img className={classes['carousal__item--icon']} src={optionIcon}/>
                    </div>
                    <div className={classes[`carousal__item__dropdown`]}>
                        <ul>
                            <li className={classes[`carousal__item__list`]}>
                                <button className={classes[`carousal__item__btn`]}>Add to wishlist</button>
                            </li>
                            <li className={classes[`carousal__item__list`]} >
                                <button className={classes[`carousal__item__btn`]} onClick={toggleFavHandler.bind(this,movie)}>Favorite</button>
                            </li>
                          
                        </ul>
                    </div>
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