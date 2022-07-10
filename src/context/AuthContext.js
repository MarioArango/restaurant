import { createContext, useContext } from "react";

export const contextAuth = createContext();

export const useAuth = () => {
    const auth = useContext(contextAuth);
    return auth;
}

export const AuthProvider = ({ children }) => {
    const user = {
        login: true
    }
    return (
        <contextAuth.Provider value={user}>
            { children }
        </contextAuth.Provider>
    )
}