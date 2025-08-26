import api from "./config.js";

//  Register User
export const registerUser = async (userData) => {
  try {
    const res = await api.post("/auth/register", userData);
    return res.data;
  } catch (error) {
    console.error("Register error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Something went wrong" };
  }
};

//  Login User
export const loginUser = async (credentials) => {
  try {
    const res = await api.post("/auth/login", credentials);
    return res.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Something went wrong" };
  }
};

//  Logout User
export const logoutUser = async () => {
  try {
    const res = await api.post("/auth/logout");
    return res.data;
  } catch (error) {
    console.error("Logout error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Something went wrong" };
  }
};

//  Refresh Token
export const refreshTokenApi = async () => {
  try {
    const res = await api.post("/auth/refresh-token");
    return res.data;
  } catch (error) {
    console.error("Refresh token error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Something went wrong" };
  }
};

// educator routes
export const getEducatorProfile = async () => {
  try {
    const res = await api.get("/auth/educator/profile");
    return res.data;
  } catch (error) {
    console.error("Get educator profile error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Something went wrong" };
  }
};