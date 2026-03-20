import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";

const PublicRoute = ({ children }) => {
    const { isLoggedIn, loading } = useContext(AppContext);

    if (loading) return <p>Loading...</p>;

    return !isLoggedIn ? children : <Navigate to="/main" />;
};

export default PublicRoute;