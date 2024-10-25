import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthInput from "./Authinput/AuthInput";

import Socials from "./Socials/Socials";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-500">
      <div className="  p-8 rounded-lg bg-gray-900 shadow-xl w-96">
        <h2 className="text-2xl font-bold text-center text-white mb-2">
          SIGNUP
        </h2>
        <p className="text-gray-400 text-center mb-8">
          Please enter your details to create an account!
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <AuthInput
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            handleChange={handleChange}
            required={true}
          />
          <AuthInput
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            handleChange={handleChange}
          />
          <AuthInput
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            handleChange={handleChange}
          />

          <button
            type="submit"
            className="w-full py-3 px-4 bg-transparent border border-white text-white rounded hover:bg-white hover:text-gray-900 transition-colors duration-300"
            onClick={async () => {}}
          >
            SIGNUP
          </button>
        </form>

        <Socials />

        <p className="text-center mt-8 text-gray-400">
          Already have an account? <Link to={"/login"}>Login </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
