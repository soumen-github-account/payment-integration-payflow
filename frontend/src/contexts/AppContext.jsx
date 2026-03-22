import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.withCredentials = true

export const AppContext = createContext()

export const AppContextProvider = (props) =>{

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [chatData, setChatData] = useState(null)
    const [chatScreenLoading, setChatScreenLoading] = useState(false);
    const [transactions, setTransactions] = useState([])
    const [getTransactionsLoading, setGetTransactionsLoading] = useState(false);

    const checkAuth = async() => {
        try {
            const {data} = await axios.get(`${backendUrl}/api/user/profile`);
            setIsLoggedIn(true);
            console.log(data)
            setUser(data)
        } catch (error) {
            setIsLoggedIn(false);
        } finally{
            setLoading(false);
        }
    }
    useEffect(() => {
        checkAuth();
    }, [])

    const getChatScreenDetails = async(myMobile, otherMobile) => {
        setChatScreenLoading(true)
        try {
            const {data} = await axios.get(`${backendUrl}/api/account/chat`,
                {
                    params:{
                        myMobile: myMobile,
                        otherMobile: otherMobile,
                    }
                }
            )
            console.log(data)
            setChatData(data);
            setChatScreenLoading(false)
        } catch (error) {
            console.log(error);
            setChatScreenLoading(false)
        }
    }

    const getAllTransactions = async() => {
        setGetTransactionsLoading(true)
        try {
            const {data} = await axios.get(`${backendUrl}/api/account/transactions/${user.mobileNumber}`);
            setTransactions(data);
            setGetTransactionsLoading(false)
            console.log(data)
        } catch (error) {
            console.log(error);
            setGetTransactionsLoading(false)
        }
    }
    

    const value = {
        backendUrl,
        isLoggedIn, setIsLoggedIn, loading,
        user,
        getChatScreenDetails, chatData, chatScreenLoading,
        getAllTransactions, transactions, getTransactionsLoading
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}