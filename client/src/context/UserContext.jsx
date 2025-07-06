import React from "react";
import { useContext } from "react";
import { createContext } from "react";
import { authDataContext } from "./AuthContext";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export const getUserContext = createContext();

function UserContext({ children }) {
  const { serverUrl } = useContext(authDataContext);
  let [userData, setUserData] = useState(null);

  let getUserData = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/user/userdata", {
        withCredentials: true,
      });
        setUserData(result.data);
    } catch (error) {
      setUserData(null);
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  let value = {
    userData,
    setUserData,
    getUserData,
  };
  return (
    <getUserContext.Provider value={value}>{children}</getUserContext.Provider>
  );
}

export default UserContext;
