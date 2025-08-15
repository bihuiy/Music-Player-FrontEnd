import { createContext, useState } from "react";
import { getUser } from "../utils/auth";
import { useEffect } from "react";
import axios from "axios";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    const t = localStorage.getItem("token");
    if (t) {
        axios.defaults.headers.common.Authorization = `Bearer ${t}`
    } else {
        delete axios.defaults.headers.common.Authorization
    }
    const [user, setUser] = useState(t ? getUser() : null);
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        setUser(getUser());
        } else {
        delete axios.defaults.headers.common.Authorization;
        setUser(null);
        }
    }, []);
    return (
        <UserContext.Provider value={{ user, setUser }}>
        {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
