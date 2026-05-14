import axios from "axios";

const BASE_URL = "http://localhost:3214";

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