import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthInput from "./Authinput/AuthInput";
import Socials from "./Socials/Socials";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const Auth = useContext(AuthContext);
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Form submitted:", formData);
      await Auth.signin({
        email: formData.email,
        password: formData.password,
      });
      // console.log("came hre");
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-600">
      <div className="bg-gray-900 p-8 rounded-lg shadow-xl w-96">
        <h2 className="text-2xl text-white text-center font-bold mb-2">
          LOGIN
        </h2>
        <p className="text-gray-400 text-center mb-6">
          Please enter your login and password!
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <AuthInput
            type="email"
            name="email"
            value={formData.email}
            handleChange={handleChange}
            placeholder="Email"
          />

          <AuthInput
            type="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            handleChange={handleChange}
          >
            <span className="absolute right-3 top-3 text-gray-400">👁️</span>{" "}
          </AuthInput>

          <div className="text-center">
            <a href="#" className="text-gray-400 hover:text-white text-sm">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-transparent border border-white text-white rounded hover:bg-white hover:text-gray-900 transition-colors duration-200"
          >
            LOGIN
          </button>

          <Socials />

          <div className="text-center mt-6">
            <p className="text-gray-400">
              Don't have an account? <Link to={"/signup"}>Sign Up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
