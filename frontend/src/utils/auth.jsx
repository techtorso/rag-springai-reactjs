export const getToken = () => {
    const token = localStorage.getItem("token");
    return token && token !== "undefined" && token !== "null" ? token : null;
};



export const setToken = (token) => {
    if (!token || token === "undefined" || token === "null") {
        localStorage.removeItem("token");
        return;
    }

    localStorage.setItem("token", token);
};

export const removeToken = () => {
    localStorage.removeItem("token");
};

export const isAuthenticated = () => {
    return !!localStorage.getItem("token");
};