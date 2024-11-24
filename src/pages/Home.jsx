import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css"; // Make sure this file contains the styles
import "../App.css";
import logo from "../assets/logo.png"; // Your logo file
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import visibility icons
import axios from "axios";
import BASE_URL from "../components/urls";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const submitForm = (data) => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/`, data)
      .then((response) => {
        console.log("Login successful", response.data);
        reset();
 // Change this path as per your application flow
      })
      .catch((error) => {
        console.error("Error during login", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="login-container">
      <div className="form-wrapper">
        <img src={logo} alt="Logo" className="logo" />
        <h2>Sign in to MoreMonee!</h2>
        <p>Kindly enter the details below to proceed</p>
        <form onSubmit={handleSubmit(submitForm)}>
          {/* Email Input */}
          <label htmlFor="email">Email Address</label>
          <div className="formInput">
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className={errors.email ? "error-border" : ""}
            />
          </div>
          {errors.email && <p className="error-text">{errors.email.message}</p>}

          {/* Password Input */}
          <label htmlFor="password">Password</label>
          <div className="formInput password-input">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password")}
              className={errors.password ? "error-border" : ""}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && <p className="error-text">{errors.password.message}</p>}

          {/* Submit Button */}
          <button type="submit" disabled={loading} className="styled-button">
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>

        <a href="#" className="forgot-password">
          I forgot my Password
        </a>
        <p className="create-account">
          Don't have an account yet? <a href="#">Create Account</a>
        </p>
      </div>
    </div>
  );
};

export default Home;
