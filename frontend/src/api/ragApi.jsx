import axios from "axios";
// import api from "../services/api";


const BASE_URL = import.meta.env.VITE_API_BASE_URL/api;
// const BASE_URL = "http://localhost:3214/api";
export const askQuestion = async (
    question,
    fileName,
    token
) => {

    const response = await axios.post(
        `${BASE_URL}/rag/ask`,
        {
            question,
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