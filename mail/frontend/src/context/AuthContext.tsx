import React, { createContext } from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  userId: string;
  signin: () => void;
  signup: () => void;
};

let AuthContext = React.createContext<AuthContextType>(null!);
export default AuthContext;
