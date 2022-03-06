import React,{ useState} from 'react';
import VideoModal from '../UI/VideoModal';
import classes from './CarousalTrailerItem.module.css';

interface Props{
    movie:{
        original_title:string,
        poster_path:string
    }
}

const CarousalTrailerItem:React.FC<Props>=(props)=>{

    const [modalOpen, setModalOpen] = useState(true);

    let imgSrc='w355_and_h200_multi_faces/';

    return (
        <>
            <div className={classes['trailer-carousal-item']}  onClick={() => {
                setModalOpen(true);
            }}>
                <div className={classes['movie-item--container']}>
                <img className={classes['movie-item--img']} src={`https://www.themoviedb.org/t/p/${imgSrc}`+props.movie.poster_path}/> 
                </div>
                <h4 className={classes['movie-item--name']}>{props.movie.original_title}</h4>
                <h5 className={classes['movie-item--sub-name']}>The Official Trailer</h5>
            </div>
        {modalOpen && <VideoModal setOpenModal={setModalOpen} movie={props.movie} />}
      </>
    );
}

export default CarousalTrailerItem;