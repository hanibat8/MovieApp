import { useState } from "react";
import ReactModal from "react-modal/lib/components/Modal";
import classes from './VideoModal.module.css';

const VideoModal=(props)=> {

  const [modalIsOpen, setModalIsOpen] = useState(false)
  return (
    <>
      <div className={classes['movie-item--container']} onClick={() => setModalIsOpen(true)}>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: {
            backgroundColor: 'grey'
          },
          content: {
            color: 'orange'
          }
        }}
        // shouldCloseOnOverlayClick={false}
      >
        <h2>Modal title</h2>
        <div>Modal Body</div>
        <div>
          <button onClick={() => setModalIsOpen(false)}>Close</button>
        </div>
      </ReactModal>
      </div>
    </>
  )

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