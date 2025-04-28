import React, { createContext, useState, useEffect } from "react"
import axios from "axios"

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null); // Thêm state cho lỗi

  const login = async (userData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        userData,
        { withCredentials: true }
      );
      setUser(response.data);
      setIsLoggedIn(true);
      setError(null);
    } catch (err) {
      setError("Đăng nhập thất bại!"); // Cập nhật thông báo lỗi
    }
  };

  const register = async (userData) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/register`, userData);
      setIsLoggedIn(false);
      setError(null);
    } catch (err) {
      setError("Đăng ký thất bại!"); // Cập nhật thông báo lỗi
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/logout`,
        {},
        { withCredentials: true }
      );
      setIsLoggedIn(false);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/check-session`,
          {
            withCredentials: true,
          }
        );
        if (response.data.user) {
          setUser(response.data.user);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("No session found:", error);
      }
    };
    checkSession();
  }, []);

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, register, user, logout, error, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
