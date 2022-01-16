import merge from 'lodash/merge';
import {useState,useEffect} from 'react';

let globalState={};
let listeners=[];
let actions={};

export const useStore=()=>{
    const [state,setState]=useState(globalState);

    const dispatch=(actionIdentifier,payload)=>{
        const newState=actions[actionIdentifier](globalState,payload);
        console.log(newState.favorite);
        console.log(globalState);
        globalState={...globalState,...newState};
        console.log(globalState);            

        for(const listener of listeners){
           // console.log(listeners);
            listener(globalState);
        }

    }

    useEffect(()=>{
        //console.log(setState);
        listeners.push(setState);

        return()=>{
            listeners=listeners.filter(li=>li!==setState);
        };
    },[setState])

    return [globalState,dispatch];
}

export const initStore=(userActions,initialState)=>{
    if(initialState){
        globalState={...globalState,...initialState};
    }

    actions={...actions,...userActions};

}