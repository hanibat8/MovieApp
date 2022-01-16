import { useCallback, useState } from "react";

const useHttp=()=>{
    const [isLoading,setIsLoading]=useState(false);
    const [error,setError]=useState(null);
    const [response,setResponse]=useState(null);

    const sendRequest=useCallback(async (requestConfig)=>{

        setIsLoading(true);
        setError(null);

        try{
            const response=await fetch(requestConfig.url,{
                method:requestConfig.method?requestConfig.method:'GET',
                headers:requestConfig.headers?requestConfig.headers:{},
                body:requestConfig.body?requestConfig.body:null,
            });

            const data=await response.json();
            
            if(!response.ok){
                //console.log(data);
                throw new Error(data.status_message || data.error.message);
            
            }
            //console.log(data);
            setResponse(data);
        }
        catch(err){
            //console.log(err);
            setError(err.message || 'Something went wrong');
        }
        setIsLoading(false);

    },[])

    const unsetState=useCallback(()=>{
        setResponse(null);
    },[]);

    //console.log(isLoading);
    //console.log(response);
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