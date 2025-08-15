import { createContext, useState } from "react";
import { getUser } from "../utils/auth";
import { useEffect } from "react";
import axios from "axios";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    
    const [user, setUser] = useState( getUser());
    
    return (
        <UserContext.Provider value={{ user, setUser }}>
        {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
