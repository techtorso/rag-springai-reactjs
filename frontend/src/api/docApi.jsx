import axios from "axios";
// import api from "../services/api";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// const BASE_URL = "http://localhost:3214/api";

export const uploadDocument = async (file) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();

  formData.append("file", file);

  return axios.post(
    `${BASE_URL}/api/docs/upload`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
};