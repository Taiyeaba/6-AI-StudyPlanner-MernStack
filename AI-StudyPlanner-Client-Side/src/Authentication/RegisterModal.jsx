

import React, { useState } from "react";
import SocialLoginModal from "./SocialLoginModal";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../hooks/UseAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";

const RegisterModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
  const { createUser } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const password = watch("password");

  
  const onSubmit = (data) => {

  createUser(data.email, data.password)
    .then(async (result) => {
      console.log(result.user);

      const userInfo = {
        name: data.name,
        email: data.email,
        createdAt: new Date()
      };

      
      await axiosSecure.post('/users', userInfo);
  console.log(data); 
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: 'Welcome to Study Planner',
        timer: 1500,
        showConfirmButton: false
      });

      onClose();
      reset();
      navigate('/');
    })
    .catch(error => {
      console.log(error);

      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: error.message
      });
    });
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 rounded-xl p-6 sm:p-8 w-11/12 sm:w-96 relative border border-white/10 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
          Create Account
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Name Field */}
          <div>
            <input
              type="text"
              placeholder="Full Name"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters"
                }
              })}
              className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field with Toggle */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)/,
                  message: 'Password must contain letters and numbers'
                }
              })}
              className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password Field with Toggle */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: value => value === password || "Passwords do not match"
              })}
              className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
            {errors.confirmPassword && (
              <p className="text-red-400 text-xs mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              {...register("terms", {
                required: "You must accept terms and conditions"
              })}
              className="mt-1 accent-indigo-500"
            />
            <label className="text-xs text-gray-400">
              I agree to the{" "}
              <a href="" className="text-indigo-400 hover:underline">
                Terms
              </a>{" "}
              and{" "}
              <a href="" className="text-indigo-400 hover:underline">
                Privacy Policy
              </a>
            </label>
          </div>
          {errors.terms && (
            <p className="text-red-400 text-xs mt-1">{errors.terms.message}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all transform hover:scale-[1.02] shadow-lg shadow-indigo-500/25"
          >
            Create Account
          </button>
        </form>

        {/* Social Login */}
        <div className="mt-6">
          <SocialLoginModal onClose={onClose} />
        </div>

        {/* Switch to Login */}
        <p className="mt-4 text-gray-400 text-sm text-center">
          Already have an account?{" "}
          <button
            onClick={() => {
              onClose();
              onSwitchToLogin();
            }}
            className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterModal;