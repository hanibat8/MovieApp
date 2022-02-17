import LoadingSpinner from '../components/UI/LoadingSpinner';
import classes from './util.module.css';

export const renderResponseItem=(isLoading,error,item=null)=>{

    if(isLoading){
        return <div className={classes.centered}><LoadingSpinner/></div>;
    }
    
    else if(error){
        return <div className={classes.centered}>{error}</div>;
    }
   
    else if(item){
        return item;
    }

}
