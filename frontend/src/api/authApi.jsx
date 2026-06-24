import axios from "axios";
// import api from "../services/api";


// const BASE_URL = "http://localhost:3214/api";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const loginUser = async (data) => {
  return axios.post(`${BASE_URL}/api/auth/login`, data);
};

export const verifyLoginOtp = async (data) => {
  return axios.post(`${BASE_URL}/api/auth/verify-login-otp`, data);
};

export const registerUser = async (data) => {
  return axios.post(`${BASE_URL}/auth/register`, data);
};


export const verifyRegisterUser = async (data) => {
  return axios.post(`${BASE_URL}/auth/verify-registration-otp`, data);
};
