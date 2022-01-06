import { useCallback, useState } from "react";

const useHttp=()=>{
    const [isLoading,setIsLoading]=useState(false);
    const [error,setError]=useState(null);
    const [response,setResponse]=useState([]);

    const sendRequest=useCallback(async (requestConfig)=>{

        setIsLoading(true);
        setError(null);

        try{
            const response=await fetch(requestConfig.url,{
                method:requestConfig.method?requestConfig.method:'GET',
                headers:requestConfig.headers?requestConfig.headers:{},
                body:requestConfig.body?JSON.stringify(requestConfig.body):null,
            });

            if(!response.ok){
                throw new Error('Something went wrong');
            }

            const data=await response.json();
            setResponse(data.results);
        }
        catch(err){
            setError(err.message || 'Something went wrong');
        }
        setIsLoading(false);

    },[])

    const unsetState=useCallback(()=>{
        setResponse([]);
    },[]);

    //console.log(isLoading);
    //console.log(item);
    //console.log(error);

    return{
        sendRequest,
        unsetState,
        response,
        isLoading,
        error
    }
    
}

export default useHttp;