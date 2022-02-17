import {useState,useEffect} from 'react';

let globalState={};
let listeners=[];
let actions={};

export const useStore=(shouldLListen=true)=>{
    const [state,setState]=useState(globalState);
    //console.log(state);

    const dispatch=(actionIdentifier,payload)=>{
        const newState=actions[actionIdentifier](globalState,payload);
        globalState={...globalState,...newState};

        for(const listener of listeners){
            listener(globalState);
        }

    }

    useEffect(()=>{
        if(shouldLListen){
            listeners.push(setState);
        }

        return()=>{
            if(shouldLListen){
                listeners=listeners.filter(li=>li!==setState);
            }
            
        };
    },[setState,shouldLListen])

    return [globalState,dispatch];
}

export const initStore=(userActions,initialState)=>{
    if(initialState){
        globalState={...globalState,...initialState};
    }

    actions={...actions,...userActions};

}