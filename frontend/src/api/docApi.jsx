import axios from "axios";

const BASE_URL = "http://localhost:3214/api";

export const uploadDocument = async (file) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();

  formData.append("file", file);

  return axios.post(
    `${BASE_URL}/docs/upload`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
};