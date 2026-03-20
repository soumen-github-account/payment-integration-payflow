import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.withCredentials = true

export const AppContext = createContext()

export const AppContextProvider = (props) =>{

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    const checkAuth = async() => {
        try {
            await axios.get(`${backendUrl}/api/user/profile`);
            setIsLoggedIn(true);
        } catch (error) {
            setIsLoggedIn(false);
        } finally{
            setLoading(false);
        }
    }
    useEffect(() => {
        checkAuth();
    }, [])

    const value = {
        backendUrl,
        isLoggedIn, setIsLoggedIn, loading
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}