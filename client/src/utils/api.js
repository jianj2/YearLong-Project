const api = "http://localhost:3001";

let header = {
    authorization: "fill in l8er",
};



// ================================================
// Admin server calls
// ================================================
export const adminLogin = (loginData) =>
    fetch(`${api}/admin/login`, {
        method: "POST",
        headers: {
            ...header,
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
    }).then((res) => res.json());
 

export const verifyAdminLogin = (username) =>
    fetch(`${api}/admin/verifylogin/${username}`, { ...header })
    .then(res => res.json())