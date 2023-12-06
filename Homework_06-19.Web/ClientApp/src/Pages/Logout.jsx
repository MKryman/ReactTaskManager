import React, { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {

    const { setUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const logoutUser = async () => {
            await axios.post('/api/account/logout');
            setUser(null);
            navigate('/login');
        }

        logoutUser();
        
    }, []);

    return (
       <></>
    );
}

export default Logout;