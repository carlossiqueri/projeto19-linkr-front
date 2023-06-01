import { createContext } from "react";
import { useState } from "react";

export const InfoContext = createContext();

export const InfoProvider = ({children}) => {
    const [token, setToken] = useState("");

    return(
        <InfoContext.Provider
        value={{token, setToken}}
         >
            {children}
        </InfoContext.Provider>
    )
}