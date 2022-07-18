/**
 * ----------------------------
 * LOCAL STORAGE AUTHENTICATION
 * ----------------------------
 */

export const setAuth = (tokenUser) => {
    localStorage.setItem("auth", JSON.stringify(tokenUser));
}

export const useAuth = () => {
    let auth = localStorage.getItem("auth");
    auth = auth? JSON.parse(auth) : null;
    return auth;
}

export const clearAuth = () => {
    localStorage.removeItem("auth");
}
