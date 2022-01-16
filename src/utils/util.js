import LoadingSpinner from '../components/UI/LoadingSpinner';
import classes from './util.module.css';

export const renderResponseItem=(isLoading,error,item)=>{
    let content;

    if(isLoading){
        content=<div className={classes.centered}><LoadingSpinner/></div>;
    }
    
    else if(error){
        console.log(error);
        content=<div className={classes.centered}>{error}</div>;
    }
   
    else{
        content=item;
    }

    return content;
}
