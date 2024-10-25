import React from "react";
import { ApiResponse } from "../utils/Api";

export interface signinProps {
  email: string;
  password: string;
}
export interface signupProps {
  email: string;
  name: string;
  password: string;
}

type AuthContextType = {
  isLoggedIn: boolean;
  userId: string;
  signin: (params: signinProps) => Promise<ApiResponse | undefined>;
  signup: (params: signupProps) => Promise<ApiResponse | undefined>;
  logout: () => void;
};

const AuthContext = React.createContext<AuthContextType>(null!);
export default AuthContext;
