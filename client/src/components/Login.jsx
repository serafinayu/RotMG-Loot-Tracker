import React, { useContext, useEffect, useState } from "react";
import { ItemContext } from "../context/ItemContext";

const Login = () => {
  const { setDisplayLogin } = useContext(ItemContext);
  const [loginState, setLoginState] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showVerifyPassword, setShowVerifyPassword] = useState(false);

  return (
    // Dimmed background
    <div
      className=" bg-black absolute w-full h-full sm:w-auto sm:h-auto sm:fixed sm:inset-0 sm:top-[64px] sm:z-50 sm:flex sm:text-center sm:items-center sm:justify-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
      onClick={() => setDisplayLogin(false)} // Close when clicking the overlay
    >
      {/* Login & Sign Up Popup */}
      <div
        className="bg-black text-center px-20 py-10  sm:p-8 sm:rounded-lg sm:shadow-2xl sm:w-150 sm:max-w-lg sm:p-12 sm:mx-6 sm:border sm:border-[#555555] sm:border-4"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the form
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="w-full text-white text-2xl font-bold text-center">
            {loginState === "login" ? "Login" : "Sign Up"}
          </h3>
        </div>

        <form className="mt-3 mb-10">
          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="text-left block text-white mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="your email"
              className="w-full p-3 rounded bg-[#111111] text-white focus:border-white focus:outline-none placeholder-dimmed"
            />
          </div>

          {/* Username Field */}
          {loginState === "sign up" && (
            <div className="mb-4">
              <label
                htmlFor="username"
                className="text-left block text-white mb-2"
              >
                Username
              </label>
              <input
                type="username"
                id="username"
                placeholder="your username"
                className="w-full p-3 rounded bg-[#111111] text-white focus:border-white focus:outline-none placeholder-dimmed"
              />
            </div>
          )}

          {/* Password Field */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="text-left block text-white mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="your password"
                className="w-full p-3 rounded bg-[#111111] text-white focus:border-white focus:outline-none placeholder-dimmed"
              />
              <i
                onClick={() => setShowPassword(!showPassword)}
                className={`bi ${
                  showPassword ? "bi-eye" : "bi-eye-slash"
                } absolute text-xl right-5 top-2.5 bold-icon cursor-pointer`}
              ></i>
            </div>
          </div>

          {/* Verify Password Field */}
          {loginState === "sign up" && (
            <div className="mb-6">
              <label
                htmlFor="verifyPassword"
                className="text-left block text-white mb-2"
              >
                Verify Password
              </label>
              <div className="relative">
                <input
                  type={showVerifyPassword ? "text" : "password"}
                  id="verifyPassword"
                  placeholder="your password again"
                  className="w-full p-3 rounded bg-[#111111] text-white focus:border-white focus:outline-none placeholder-dimmed"
                />
                <i
                  onClick={() => setShowVerifyPassword(!showVerifyPassword)}
                  className={`bi ${
                    showVerifyPassword ? "bi-eye" : "bi-eye-slash"
                  } absolute text-xl right-5 top-2.5 bold-icon cursor-pointer`}
                ></i>
              </div>
            </div>
          )}
          <button
            type="submit"
            className="!bg-white text-black py-3 mt-5 rounded font-semibold hover:bg-gray-200 transition-colors duration-200"
          >
            {loginState === "login" ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex flex-row items-center">
          <hr className="flex-2 border-white" />
          <p className="flex-1 text-xl text-bold">OR</p>
          <hr className="flex-2 border-white" />
        </div>

        {/* Google Sign In button */}
        <button className="mt-10 mb-6 rounded-sm !bg-[#3A79D8]">
          <i className="bi bi-google"></i>
          <span className="mx-3">|</span>
          <span>Sign in with Google</span>
        </button>

        {/* Switch Login/Sign Up State */}
        <p className="text-center mt-4">
          {loginState === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
          {loginState === "login" ? (
            <span
              onClick={() => setLoginState("sign up")}
              className="text-[#009CDF] pl-3 cursor-pointer hover:underline"
            >
              Sign Up
            </span>
          ) : (
            <span
              onClick={() => setLoginState("login")}
              className="text-[#009CDF] pl-3 cursor-pointer hover:underline"
            >
              Login
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;
