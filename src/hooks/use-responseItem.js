const useResponseItem=(isLoading,error,item)=>{
    let content;
    //console.log(props);

    if(isLoading){
        console.log('in loading');
        content= <div className={classes.centered}><LoadingSpinner/></div>
    }

    if(error){
        console.log('error');
        content= <div className={classes.centered}>{error}</div>

    }
    //console.log(item);
    if(item.length>0){
      //  console.log(item);
        content=item;
        //console.log(content);
    }

    return content;
}