const api = "http://localhost:3001";

const header = {
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


// ================================================
// Managing Questionnaire server calls
// ================================================
// add new questionnaire
export const addQuestionnaire = async () => {
    const url = api + "/questionnaire/add";

    const headers = {
        ...header,
        "Content-Type": "application/json",
        Accept: "application/json",
    };

    const data = {
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

//edit questionnaire
// TODO: get CQid and entire edited questionaire from UI
export const editQuestionnaire = async () => {
    const url = api + "/questionnaire/edit";

    const headers = {
        ...header,
        "Content-Type": "application/json",
        Accept: "application/json",
    };

    const data = {
        questionnaireId: 'e6bc8ad0-9fe3-11ea-a404-bf73c4e43df1', // TODO to be chanegd later
       
    };

    
    
    try {
        console.log("editing", data);
        let response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data),
        });
        let json = await response.json();
   
    } catch (e) {
        console.error(
            "An error has occurred while adding questionnaire",
            e
        );
    }

}
