// import axios from "axios";
import api from "../services/api";

const BASE_URL = "http://localhost:3214/api";
export const askQuestion = async (
    question,
    fileName,
    token
) => {

    const response = await api.post(
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