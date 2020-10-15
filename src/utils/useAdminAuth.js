/**
 * =============================================================================
 * JAVASCRIPT HELPER FILE
 * =============================================================================
 * @date created: 18th May  2020
 * @authors:  Waqas Rehmani
 *
 * This file defines the context for admin authentication.
 *
 * =============================================================================
 */

// Import Libraries.
import React, { useState, useEffect, useContext } from "react";

// Import Utilities.
import * as API from "./api";

export const AdminAuthContext = React.createContext();
export const useAdminAuth = () => useContext(AdminAuthContext);
export const AdminAuthProvider = ({ children }) => {
    const [isAdminAuthenticated, setAuthenticated] = useState(false);
    const [adminToken, setAdminToken] = useState("");
    const [loading, setLoading] = useState(true);

    const verifyAdminLoginFun = async (previousAuth) => {  //this is for shortly redirect to the admin login page(bug)
        const [statusCode, response] = await API.verifyAdminLogin(previousAuth.token);
            if (statusCode === 200 && response.auth) {
                setAuthenticated(true);
                setLoading(false);
                setAdminToken(previousAuth.token);
            } else {
                setLoading(false);
            }
       
    }

    useEffect(() => {
        let previousAuth = JSON.parse(
            localStorage.getItem("adminAuthentication")
        );
        if ( previousAuth && previousAuth.token !== "") {
            verifyAdminLoginFun(previousAuth);
        } else {
            // If the previousAuth is null (not have previousAuth in
            // localStorage), the loading will disappear.
            setLoading(false);
        }
    }, []);

    const adminLogin = async (loginData) => {
        const [statusCode, response] = await API.adminLogin(loginData);
        if (statusCode === 200) {
            setAuthenticated(response.message.auth);
            setAdminToken(response.message.token);
            localStorage.setItem(
                "adminAuthentication",
                JSON.stringify({
                    token: response.message.token,
                })
            );
        }else {
            let errorMessage = document.getElementById('error-message-login');
            errorMessage.innerHTML = "Login information is wrong.";
            console.error(response);
            errorMessage.style.display = 'block';
        }
    
    };

    const adminLogout = () => {
       
        localStorage.setItem(
            "adminAuthentication",
            JSON.stringify({
                token: "",
            })
        );
        window.location.href = "/"
        setAuthenticated(false);
        setAdminToken("");
    };
   
    return (
        <AdminAuthContext.Provider
            value={{
                isAdminAuthenticated,
                adminToken,
                loading,
                adminLogin,
                adminLogout,
            }}
        >
            {children}
        </AdminAuthContext.Provider>
    );
};
