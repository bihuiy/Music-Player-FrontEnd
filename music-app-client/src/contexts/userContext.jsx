import {createContext, useState} from 'react'
import { getUser } from '../utils/auth'
import { useEffect } from 'react'

const UserContext = createContext(null)

const UserProvider = ({children}) =>{
    const t = localStorage.getItem('token')
    const [user, setUser] = useState(t ? getUser() : null)
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            setUser(null)
            localStorage.removeItem("user")
            return
        }
}, [])
    return(
        <UserContext.Provider value = {{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
        
    
}

export {UserContext, UserProvider}