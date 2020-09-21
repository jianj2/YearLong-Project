import React, { useState, useEffect, useContext } from "react";
import * as API from "./api";


export const AdminAuthContext = React.createContext();
export const useAdminAuth = () => useContext(AdminAuthContext);
export const AdminAuthProvider = ({ children }) => {
    
    const [isAdminAuthenticated, setAuthenticated] = useState(false);
    const [adminToken, setAdminToken] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let previousAuth = JSON.parse(
            localStorage.getItem("adminAuthentication")
        );
        console.log("previousAuth", previousAuth);
        if (previousAuth) {
            API.verifyAdminLogin(previousAuth.token).then((res) => {
                console.log("VERYIFY LOGIN in CUSTOM HOOK", res);
                if (res.auth) {
                    setAuthenticated(true);
                    setAdminToken(previousAuth.token);
                }
            });
        }
        setLoading(false);
    }, []);

    const adminLogin = (loginData) => {
        API.adminLogin(loginData).then((res) => {
            console.log("response from login", res);
            if (res.code === 3) {
                setAuthenticated(res.message.auth);
                setAdminToken(res.message.token);
                localStorage.setItem(
                    "adminAuthentication",
                    JSON.stringify({
                        token: res.message.token,
                    })
                );
            }else if (res.code===4){
                let errorMessage = document.getElementById('error-message-login');
                errorMessage.innerHTML = "Login information is wrong";
                errorMessage.style.display = 'block';
            }
        });
    };

    const adminLogout = () => {
        localStorage.setItem(
            "adminAuthentication",
            JSON.stringify({
                token: "",
            })
        );
        setAuthenticated(false);
        setAdminToken("");
        console.log("logout admin");
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

    // return { isAdminAuthenticated, adminToken, adminLogin, adminLogout };
};