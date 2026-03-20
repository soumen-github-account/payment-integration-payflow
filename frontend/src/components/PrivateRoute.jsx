
import React, { useContext } from 'react'
import { AppContext } from '../contexts/AppContext'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
    const {isLoggedIn, loading} = useContext(AppContext)

    if(loading) return <p>Loading...</p>
  return isLoggedIn ? children : <Navigate to="/" />;
}

export default PrivateRoute
