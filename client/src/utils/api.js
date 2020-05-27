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

// add new questionnaire
export const addQuestionnaire = async () => {
    const url = api + "/questionnaire/add";

    var headers = {
        ...header,
        "Content-Type": "application/json",
        Accept: "application/json",
    };

    var data = {
        isStandard: false,
    };

    return new Promise(async (resolve) => {
        try {
            let response = await fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(data),
            });
            let json = await response.json();
            resolve(json.uuid);
        } catch (e) {
            console.error(
                "An error has occurred while adding questionnaire",
                e
            );
        }
    });
};

// delete questionnaire
export const deleteQuestionnaire = (CQid) => {
    const data = { questionnaireId: CQid };
    fetch(`${api}/questionnaire/delete`, {
        method: "POST",
        headers: {
            ...header,
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((res) => res.json());
};
