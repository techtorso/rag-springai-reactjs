import axios from "axios";

const BASE_URL = "http://localhost:3214/api";
export const delApi = async (
    question,
    fileName,
    token
) => {

    const response = await axios.post(
        `${BASE_URL}/rag/documents/?{encodeURIComponent(fileName)}`,
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