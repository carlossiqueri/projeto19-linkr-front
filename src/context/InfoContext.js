import { createContext } from "react";
import { useState } from "react";

export const InfoContext = createContext();

export const InfoProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [currentUserId, setCurrentUserId] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [userId, setUserId] = useState("");
  const [refresh, setRefresh] = useState(false);

  return (
    <InfoContext.Provider
      value={{
        token,
        setToken,
        profileImage,
        setProfileImage,
        currentUserId,
        setCurrentUserId,
        userInfo,
        setUserInfo,
        userId,
        setUserId,
        refresh,
        setRefresh
      }}
    >
      {children}
    </InfoContext.Provider>
  );
};
