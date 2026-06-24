import axios from "axios";
import { getToken } from "../utils/auth";

// const BASE_URL = "http://localhost:3214";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const getDocuments = async (token) => {
    const response = await axios.get(
        `${BASE_URL}/documents`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const deleteDocument = async (fileName, token) => {
    const response = await axios.delete(
        `${BASE_URL}/api/rag/documents/${encodeURIComponent(fileName)}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    
    return response.data;
};




// const BASE_URL_DELETE = "http://localhost:3214/api/docs/documents/";

