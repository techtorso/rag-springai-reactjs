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
    return !!getToken();
};

const parseJwt = (token) => {
    if (!token) return null;

    try {
        const payload = token.split(".")[1];
        const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
        return JSON.parse(decodeURIComponent(
            decoded
                .split("")
                .map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`)
                .join("")
        ));
    } catch (error) {
        return null;
    }
};

export const getUser = () => {
    const token = getToken();
    return token ? parseJwt(token) : null;
};

export const getUserRole = () => {
    const user = getUser();
    if (!user) return null;

    const roleValue = user.role || user.roles || user.authorities || user.authority;

    if (Array.isArray(roleValue)) {
        return roleValue[0] || null;
    }

    return roleValue || null;
};

export const hasRole = (role) => {
    const currentRole = getUserRole();
    if (!currentRole) return false;

    if (Array.isArray(currentRole)) {
        return currentRole.includes(role) || currentRole.includes(`ROLE_${role}`);
    }

    return currentRole === role || currentRole === `ROLE_${role}`;
};

export const isAdmin = () => hasRole("ADMIN");