import React from 'react';
import classes from './VideoModal.module.css';

interface Props{
  setOpenModal:(isOpen:boolean)=>void,
  movie:{}
}

const VideoModal:React.FC<Props>=({ setOpenModal })=> {
  
  return (
    <div className={classes['modalBackground']}>
      <div className={classes['modalContainer']}>
        <div className={classes['titleCloseBtn']}>
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div >
          <h1>Are You Sure You Want to Continue?</h1>
        </div>
        <div >
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button>Continue</button>
        </div>
      </div>
    </div>
  );


   /* const [isOpen,setIsOpen]=useState(false);
    const openModal=()=>setIsOpen(true);
    const closeModal=()=>setIsOpen(false);
  
    return (
      <>
           <div className={classes['movie-item--container']} onClick={openModal}>
            <img className={classes['movie-item--img']} src={`https://www.themoviedb.org/t/p/${props.imgSrc}`+props.movie.poster_path}/> 
            <ReactModal isOpen={isOpen} shouldCloseOnOverlayClick={true} onRequestClose={() => setIsOpen(false)}
              style={{
                overlay: {
                  backgroundColor: 'rgba(0, 0, 0, 0.76)'
                }
              }}>
              <div>ok</div>
              <button onClick={closeModal}>close</button>
            </ReactModal>
            </div>     
            <h4 className={classes['movie-item--name']}>{props.movie.original_title}</h4>
            <h5 className={classes['movie-item--sub-name']}>The Official Trailer</h5>
      </>
    );*/
}

export default VideoModal;