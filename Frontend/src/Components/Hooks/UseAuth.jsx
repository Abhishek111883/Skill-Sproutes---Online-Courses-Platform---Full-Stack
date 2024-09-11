import React, { useContext } from "react";
import { AuthContext } from "../../utillities/Providers/AuthProvider";

export const UseAuth = () => {
  const Auth = useContext(AuthContext);
  return Auth;
};
