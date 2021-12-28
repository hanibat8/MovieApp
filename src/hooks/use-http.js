import { useCallback, useState } from "react";

const useHttp=()=>{
    const [isLoading,setIsLoading]=useState([]);
    const [error,setError]=useState([]);
    const [item,setItems]=useState([]);

    const sendRequest=useCallback(async (url)=>{
        setIsLoading([true,true]);
        setError([null,null]);

        let response;

        try{
            response=await Promise.allSettled( [fetch(url[0]),fetch(url[1])]);

            if(!response[0].value.ok){
                throw new Error('Something went wrong');
            }

            const data1=await response[0].value.json();

            if(!response[1].value.ok){
                throw new Error('Something went wrong');
            }

            const data2=await response[1].value.json();

            setItems([[data1.results],[data2.results]]);
        }
        catch(err){
            if(!response[0].value.ok) {setError([err.message || 'Something went wrong',error[1]])};
            if(!response[1].value.ok){setError([error[0],err.message || 'Something went wrong'])};
        }
        setIsLoading([false,false]);
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