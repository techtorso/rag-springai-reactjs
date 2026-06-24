import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
// const BASE_URL = "http://localhost:3214/api";
export const delApi = async (
    question,
    fileName,
    token
) => {

    const response = await axios.post(
        `${BASE_URL}/api/rag/documents/?{encodeURIComponent(fileName)}`,
        {
            fileName
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};