import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import * as Api from "../utils/Api";
import { Loader2 } from "lucide-react";

import { signupProps, signinProps } from "./AuthContext";
import { toast } from "react-toastify";
import { getCurrentUser } from "../utils/handlers";
function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedin] = useState(false);
  const [isInitailised, setIsInitailised] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    async function iffe() {
      const token = localStorage.getItem("token");
      if (token) {
        const currentUser = await getCurrentUser(token);
        localStorage.setItem("user", JSON.stringify(currentUser));
        setUserId(currentUser._id);
        setIsLoggedin(true);
      } else {
        setIsLoggedin(false);
      }
      setIsInitailised(true);
    }
    iffe();
  }, []);

  if (!isInitailised) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Loader2 />
      </div>
    );
  }

  async function signin({ email, password }: signinProps) {
    try {
      const data = await Api.post("/user/login", { email, password });
      if (data.status == 200) {
        localStorage.setItem("token", data.data.data.jwtToken);
        setUserId(data.data.data.user.id);
        setIsLoggedin(true);
        toast.info("logged in successfully");
        return Promise.resolve(data);
      }
      return Promise.reject(data);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  async function signup({ name, email, password }: signupProps) {
    try {
      const data = await Api.post("/user/signup", { name, email, password });
      console.log(data);
      if (data.status == 201) {
        return Promise.resolve(data);
      }
      return Promise.reject(data);
    } catch (err) {
      console.log(err);
    }
  }
  async function logout() {
    try {
      localStorage.removeItem("item");
      setIsLoggedin(false);
      setUserId("");
    } catch (err) {
      console.log(err);
    }
  }
  const value = { userId, signup, signin, isLoggedIn, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
