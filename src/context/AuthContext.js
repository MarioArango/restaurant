import { createContext, useContext } from "react";

export const contextAuth = createContext();

export const useAuth = () => {
    const data = useContext(contextAuth);
    return data
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