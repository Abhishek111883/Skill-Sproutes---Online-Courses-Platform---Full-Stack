import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../utillities/Providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Correctly importing axios

export const UseAxiosSecure = () => {
  const { logout } = useContext(AuthContext); // Ensure this is providing the logout function
  const navigate = useNavigate();

  const axiosSecure = axios.create({
    baseURL: "http://localhost:3000", // Make sure this is the correct base URL for your API
  });

  useEffect(() => {
    // Request Interceptor to add the token to headers
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token"); // Fetch token from localStorage
        console.log(token);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`; // Add token to headers if it exists
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response Interceptor to handle errors
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response, // Return the response if successful
      async (error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          await logout(); // Log the user out if unauthorized
          navigate("/login"); // Redirect to login page
          throw error; // Re-throw the error to be handled by the caller
        }
        throw error; // Throw other errors to be handled by the caller
      }
    );

    // Cleanup interceptors on unmount
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [logout, navigate, axiosSecure]);

  return axiosSecure; // Return the axios instance for secure requests
};
