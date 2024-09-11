import React from "react";
import { UseAuth } from "./UseAuth";
import { UseAxiosSecure } from "./UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";

export const UseUser = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const {
    data: currentuser,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user", user?.uid],
    queryFn: async () => {
      try {
        const response = await axiosSecure.get(`/users/${user?.email}`);
        return response.data;
      } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
      }
    },
    enabled: !!user?.email && !!localStorage.getItem("token"),
  });
  console.log("User from UseAuth:", user);
  console.log("Current User:", currentuser);

  return { currentuser, isLoading, refetch };
};
