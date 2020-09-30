const api = process.env.REACT_APP_SERVER || "http://localhost:3001";

//const api = "https://d1iiwjsw1v8g79.cloudfront.net/";

const header = {
    "Content-Type": "application/json",
    Accept: "application/json",
};

let createHeader = (accessToken) => {
    return {
        Authorization: `Bearer ${accessToken}`,
    };
};

const sendRequest = async (
    method,
    url,
    data = undefined,
    token = undefined
) => {
    let headers = header;
    if (token) {
        headers = {
            ...header,
            ...createHeader(token),
        };
    }
    let fetchOptions = {
        method,
        headers,
    };
    if (method === "POST") {
        fetchOptions = { ...fetchOptions, body: JSON.stringify(data) };
    }
    try {
        const response = await fetch(`${api}/${url}`, fetchOptions);
        const status = response.status;
        const data = await response.json();
        const result = await new Promise((resolve, reject) => {
            resolve([status, data]);
        });
        return result;
    } catch (error) {
        console.error(error);
    }
};

// ================================================
// Admin server calls
// ================================================

export const findPassword = (email) => {
    const url = `https://ssq.au.auth0.com/dbconnections/change_password`
    const data = {
        client_id: 'cFvWQEJAqVjpvvvaz3WVkFsAilRxl8jo',
        email: email,
        connection: 'Username-Password-Authentication'
    }
    return await sendRequest("POST", url, data);
}

export const adminLogin = (loginData) =>{
    const url = `${api}/admin/login`;
    return await sendRequest("POST", url, loginData);
}

export const verifyAdminLogin = (token) => {
    const url = `${api}/admin/verifylogin/${token}`;
    return await sendRequest("GET", url);
}

export const sendQuestionnaireData = (data, shareId) =>{
    const url = `${api}/share/submit/${shareId}`;
    return await sendRequest("POST", url, data);
}

// ================================================
// Clinician server calls
// ================================================
export const completeQuestionnaire = async (token, data) => {
    const url =`${api}/clinician/complete-questionnaire/`;
    return await sendRequest("POST", url, data,token);
};

// ================================================
// Managing Questionnaire server calls
// ================================================
// add new questionnaire

// export const getQuestionnaire = async (questionnaireID) =>{
//     const url = `questionnaire/${questionnaireID}`
//     return await sendRequest("GET", url);
// }

export const addQuestionnaire = async (token, clinicianId) => {
    const url = "questionnaire/add";
    const data = {
        clinicianId,
        isStandard: false,
    };
    return await sendRequest("POST", url, data, token);
};

export const addStandardQuestionnaire = async () => {
    const url = "questionnaire/addStandard";
    return await sendRequest("POST", url);
};

// delete customised questionnaire
export const deleteQuestionnaire = async (token, CQid, clinicianId) => {
    const url = "questionnaire/delete";
    const data = {
        CQid,
        clinicianId,
    };
    return await sendRequest("POST", url, data, token);
};

//edit questionnaire

export const editQuestionnaire = async (token, questionnaire) => {
    const url = "questionnaire/edit";
    const data = {
        questionnaire,
    };
    return await sendRequest("POST", url, data, token);
};

//edit standard questionnaire

export const editStandardQuestionnaire = async (questionnaire) => {
    const url = "questionnaire/editStandard";
    const data = {
        questionnaire,
    };
    return await sendRequest("POST", url, data);
};

//COPY questionnaire
export const copyQuestionnaire = async (questionnaire, clinicianId) => {
    const url = "questionnaire/copy";
    const data = {
        clinicianId,
        copyToCustomisedQuestionnaire: true,
        questionnaire,
    };
    return await sendRequest("POST", url, data);
};

//admin COPY questionnaire
export const adminCopyQuestionnaire = async (questionnaire) => {
    const url = "questionnaire/copy";
    const data = {
        copyToCustomisedQuestionnaire: false,
        questionnaire,
    };
    return await sendRequest("POST", url, data);
};

// get specific questionnaire

export const getQuestionnaireById = async (Id) => {
    const url = `questionnaire/${Id}`;
    return await sendRequest("GET", url);
};

// get clinician questionnaire list

export const getClinicianQuestionnaires = async (accessToken, clinicianId) => {
    const url = `questionnaire/clinician?clinicianId=${clinicianId}`;
    return await sendRequest("GET", url, undefined, accessToken);
};

// get standardised questionnaires
export const getStandardisedQuestionnaires = async () => {
    const url = `questionnaire/standardised`;
    return await sendRequest("GET", url);
};

export const deleteStandardQuestionnaire = async (questionnaireID) => {
    const url = "questionnaire/deleteStandard";
    const data = {
        questionnaireID,
    };
    return await sendRequest("POST", url, data);
};

// ================================================
// Managing Share server calls
// ================================================
// get questionnaire ID using the Share ID.
export const getShareDetails = (shareId) =>
    fetch(`${api}/share/${shareId}`, {
        header,
    }).then((res) => res.json());

// Used to share a questionnaire.
export const shareQuestionnaire = async (token, data) =>
    fetch(`${api}/clinician/share/`, {
        method: "POST",
        headers: {
            ...header,
            ...createHeader(token),
        },
        body: JSON.stringify(data),
    }).then((res) => res.json());

// get Instruction
export const getInstruction = async () => {
    const url = `${api}/admin/instruction`;
    let response = await fetch(url, {
        headers: header,
    });
    let json = await response.json();

    return json;
};

// get instructions
export const getSpecificInstruction = async (instructionType) => {
    const url = `${api}/admin/specificInstruction/${instructionType}`;
    let response = await fetch(url, {
        headers: header,
    });
    let json = await response.json();
    return json;
};

// get instructions summary including title and type

export const getInstructionsSummary = async () => {
    const url = `${api}/admin/instructionsSummary`;
    let response = await fetch(url, {
        headers: header,
    });
    let json = await response.json();
    return json;
};

// send Instructions
export const sendInstructions = (data) =>
    fetch(`${api}/admin/instruction`, {
        method: "POST",
        headers: header,
        body: JSON.stringify(data),
    }).then((res) => res);

// update instruction by type
export const updateInstruction = (type, data) =>
fetch(`${api}/admin/instruction/${type}`, {
    method: "POST",
    headers: header,
    body: JSON.stringify(data),
}).then((res) => res);

// get organisations
export const getOrganisations = async () => {
    const url = `${api}/admin/organisation`;
    let response = await fetch(url, {
        headers: header,
    });
    let json = await response.json();

    return json;
};

// get organisation's clinicians
export const getOrganisationClinicians = async (organisationName) => {
    const url = `${api}/admin/organisation/${organisationName}`;
    let response = await fetch(url, {
        headers: header
    });
    let json = await response.json();
    return json;
};
