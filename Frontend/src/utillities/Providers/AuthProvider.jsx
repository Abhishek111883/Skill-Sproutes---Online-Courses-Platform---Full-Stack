import React, { createContext, useEffect, useState } from "react";
import { app } from "../../Config/firebase.init";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import axios from "axios";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, Setuser] = useState(null);
  const [Loading, setLoading] = useState(true);
  const [error, seterror] = useState("");

  const auth = getAuth(app);

  //signup for user

  const signup = async (email, password) => {
    try {
      setLoading(true);
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      seterror(error.message);
      throw error;
    }
  };

  //login for user
  const login = async (email, password) => {
    try {
      setLoading(true);
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      seterror(error.message);
      throw error;
    }
  };

  //logout for user
  const logout = async () => {
    try {
      setLoading(true);
      localStorage.removeItem("token");
      return await signOut(auth);
    } catch (error) {
      seterror(error.message);
    }
  };

  //reset password for user
  const resetpassword = async (email) => {
    try {
      setLoading(true);
      return await sendPasswordResetEmail(auth, email);
    } catch (error) {
      seterror(error.message);
    }
  };

  //update user profile
  const updateuser = async (name, photoUrl) => {
    try {
      setLoading(true);
      return await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoUrl,
      });
    } catch (error) {
      seterror(error.message);
    }
  };

  //login with google
  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      return await signInWithPopup(auth, provider);
    } catch (error) {
      seterror(error.message);
    }
  };

  // Auth state observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      Setuser(user);
      if (user) {
        try {
          const response = await axios.post(
            "http://localhost:3000/api/set-token",
            {
              email: user.email,
              name: user.displayName,
            }
          );
          if (response.data) {
            localStorage.setItem("token", response.data);
          }
        } catch (error) {
          console.error("Failed to set token", error);
        }
      } else {
        localStorage.removeItem("token");
      }
      setLoading(false); // Ensure loading is stopped in both cases
    });

    return () => unsubscribe();
  }, []);

  const contextvalue = {
    user,
    signup,
    login,
    logout,
    updateuser,
    resetpassword,
    loginWithGoogle,
    error,
    seterror,
  };

  return (
    <AuthContext.Provider value={contextvalue}>{children}</AuthContext.Provider>
  );
};
