import React,{createContext, useContext, useReducer} from "react";

// prepares the DataLayer
export const StateContext = createContext();

// wrap out app and provide a DataLayer
export const StateProvider = ({reducer, initialState, children}) => {
    return <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider> 
}

// pull information from the DataLayer
export const useStateValue = ()=> useContext(StateContext);