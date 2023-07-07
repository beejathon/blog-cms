import React, { useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

const Context = React.createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState();

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user'));
    const localToken = localStorage.getItem('token');
    let decoded;
    let expiration;
    if (localToken) {
      decoded = jwt_decode(localToken);
      expiration = decoded.exp*1000;
    }

    // check token expiry
    if (localUser !== undefined && expiration >= Date.now()) {
      setToken(localToken);
      setUser(localUser);
    } else {
      setToken(null);
      setUser(null);
    }
  }, [])

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        token,
        setToken
      }}>
      {children}
    </Context.Provider>
  )
}

export const useAuth = () => useContext(Context);