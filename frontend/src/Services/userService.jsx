import axios from "axios";
// import api from "./api";

const BASE_URL = "http://localhost:3214";

const authHeaders = (token) => {
  if (!token) {
    throw new Error("Missing auth token. Please sign in again.");
  }

  return {
    Authorization: `Bearer ${token}`,
  };
};

// const [email, setEmail] = useState("");

export const getUsers = async (token) => {

    const response = await axios.get(
        `${BASE_URL}/api/admin/users`,
        {
            headers: authHeaders(token),
        }
    );

    return response.data;
};

export const createUser = async (
    user,
    token
) => {
    // Normalize payload: backend expects `email`, some UI sends `username`
    const payload = { ...user };
    if (!payload.email && payload.username) {
        payload.email = payload.username;
        delete payload.username;
    }

    const response = await axios.post(
        `${BASE_URL}/api/admin/users`,
        payload,
        {
            headers: authHeaders(token),
        }
    );

    return response.data;
};

export const disableUser = async (
    id,
    token
) => {

    const response = await axios.put(
        `${BASE_URL}/api/admin/users/${id}/disable`,
        {},
        {
            headers: authHeaders(token),
        }
    );

    return response.data;
};

export const enableUser = async (
    id,
    token
) => {

    const response = await axios.put(
        `${BASE_URL}/api/admin/users/${id}/enable`,
        {},
        {
            headers: authHeaders(token),
        }
    );

    return response.data;
};

export const deleteUser = async (
    id,
    token
) => {

    const response = await axios.delete(
        `${BASE_URL}/api/admin/users/${id}`,
        {
            headers: authHeaders(token),
        }
    );

    return response.data;
};

export const updateRole = async (
    id,
    role,
    token
) => {

    const response = await axios.put(
        `${BASE_URL}/api/admin/users/${id}/role`,
        { role },
        {
            headers: authHeaders(token),
        }
    );

    return response.data;
};