import axios from "axios";

const BASE_URL = "http://localhost:3214/api";

export const loginUser = async (data) => {
  return axios.post(`${BASE_URL}/auth/login`, data);
};

export const verifyLoginOtp = async (data) => {
  return axios.post(`${BASE_URL}/auth/verify-login-otp`, data);
};

export const registerUser = async (data) => {
  return axios.post(`${BASE_URL}/auth/register`, data);
};


export const verifyRegisterUser = async (data) => {
  return axios.post(`${BASE_URL}/auth/verify-registration-otp`, data);
};
