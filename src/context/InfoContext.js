import { createContext } from "react";
import { useState } from "react";

export const InfoContext = createContext();

export const InfoProvider = ({children}) => {
    const [token, setToken] = useState("");
    const [profileImage, setProfileImage] = useState("");
   const [currentUserId, setCurrentUserId] = useState("");
   const [userId, setUserId] = useState("");

    return(
        <InfoContext.Provider
        value={{token, setToken, 
            profileImage, setProfileImage,
            currentUserId, setCurrentUserId,
            userId, setUserId,
        }}
         >
            {children}
        </InfoContext.Provider>
    )
}