import React, { useEffect } from "react";
import axios from "axios";

export const UseAxiosFetch = () => {
  const axiosIntance = axios.create({
    baseURL: "http://localhost:3000/",
  });

  useEffect(() => {
    const RequestIntercept = axios.interceptors.request.use(
      function (config) {
        // Do something before request is sent
        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );

    const ResponseIntercept = axios.interceptors.response.use(
      function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      },
      function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
      }
    );

    return () => {
      axiosIntance.interceptors.request.eject(RequestIntercept);
      axiosIntance.interceptors.response.eject(ResponseIntercept);
    };
  }, [axiosIntance]);

  return axiosIntance;
};
