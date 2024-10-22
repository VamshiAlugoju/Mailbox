import React, { Children, useEffect, useState } from "react";
import AuthContext from "./AuthContext";
function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedin] = useState(false);
  const [isInitailised, setIsInitailised] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setIsLoggedin(true);
      setIsInitailised(true);
    }, 3000);
  }, []);

  if (!isInitailised) {
    return <h1>loading</h1>;
  }

  function signin() {}
  function signup() {}
  let value = { userId, signup, signin, isLoggedIn };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
