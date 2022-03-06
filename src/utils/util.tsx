import React from 'react';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import classes from './util.module.css';

export const renderResponseItem=(isLoading:boolean,error:any,item:[] | null=null):[]|JSX.Element=>{

    if(isLoading){
        return <div className={classes.centered}><LoadingSpinner/></div>;
    }
    
    else if(error){
        return <div className={classes.centered}>{error}</div>;
    }
   
    else if(item){
        return item;
    }

    return [];

}
