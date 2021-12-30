import { useCallback, useState } from "react";

const useHttp=()=>{
    const [isLoading,setIsLoading]=useState([]);
    const [error,setError]=useState([]);
    const [item,setItems]=useState([]);

    const sendRequest=useCallback(async (url)=>{
        setIsLoading([true,true]);
        setError([null,null]);

        let popularMoviesResponse,topRatedMoviesResponse;

        try{
            [popularMoviesResponse,topRatedMoviesResponse]=await Promise.allSettled( [fetch(url[0]),fetch(url[1])]);
            let error,popularMoviesData,topRatedMoviesData;
            
            if(!popularMoviesResponse.value.ok){
                error=true;
            }else{
                popularMoviesData=await popularMoviesResponse.value.json();
            }

            if(!topRatedMoviesResponse.value.ok){
                error=true;
            }else{
                topRatedMoviesData=await topRatedMoviesResponse.value.json();
            }

           // console.log(data1,data2.results);
            setItems([[popularMoviesData],[topRatedMoviesData]]);

            if(error){
                throw new Error(error.message);
            }
        }
        catch(err){
            console.log(err.message);
            if(!popularMoviesResponse.value.ok) {setError([err.message || 'Error. Could not load movies',error[1]])};
            if(!topRatedMoviesResponse.value.ok){setError([error[0],err.message || 'Error. Could not load movies'])};
        }
        
        setIsLoading([false,false]);
    },[])

    const unsetState=useCallback(()=>{
        setItems([]);
    },[]);

    //console.log(isLoading);
    //console.log(item);
    console.log(error);

    return{
        sendRequest,
        unsetState,
        item,
        isLoading,
        error
    }
    
}

export default useHttp;