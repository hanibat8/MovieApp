import { useCallback, useState } from "react";

const useHttp=()=>{
    const [isLoading,setIsLoading]=useState(false);
    const [error,setError]=useState(null);
    const [item,setItems]=useState([]);


    const sendRequest=useCallback(async (url)=>{

        setIsLoading(true);
        setError(null);

        try{
            const response=await fetch(url);

            if(!response.ok){
                throw new Error('Something went wrong');
            }

            const data=await response.json();
            setItems(data.results);
        }
        catch(err){
            setError(err.message || 'Something went wrong');
        }
        setIsLoading(false);

    },[])

    const unsetState=useCallback(()=>{
        setItems([]);
    },[]);

    //console.log(isLoading);
    //console.log(item);
    //console.log(error);

    return{
        sendRequest,
        unsetState,
        item,
        isLoading,
        error
    }
    
}

export default useHttp;