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

export const verifyAdminLogin = (token) =>
    fetch(`${api}/admin/verifylogin/${token}`, {
        ...header,
    }).then((res) => res.json());

export const getQuestionnaires = () =>
    fetch(`${api}/questionnaire/`, { header }).then((res) => res.json());

export const addQuestionnaire = () => {
    
    const url = api + '/questionnaire/add';

var headers = { ...header,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
 
};

var data = {
  a: 1,
  questionnaireId: "abcdef"
};

fetch(url, { method: 'POST', headers: headers, body: JSON.stringify(data)})
  .then((res) => {
    console.log("receiving res");
    console.log(res);
     
});
}

