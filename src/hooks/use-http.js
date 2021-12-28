import { useCallback, useState } from "react";

const useHttp=()=>{
    const [isLoading,setIsLoading]=useState(false);
    const [error,setError]=useState(null);
    const [item,setItems]=useState([]);

    const sendRequest=useCallback(async (url,signal)=>{
        setIsLoading(true);
        setError(null);

        try{
            const response=await fetch(url,{signal});

            if(!response.ok){
                throw new Error('Something went wrong');
            }

            const data=await response.json();
            //console.log(data);
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

    return{
        sendRequest,
        unsetState,
        item,
        isLoading,
        error
    }
    
}

export default useHttp;