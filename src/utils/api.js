/**
 * =============================================================================
 * JAVASCRIPT API FILE
 * =============================================================================
 * @date created: 12th October 2020
 * @authors: Waqas Rehmani, Uvin Abeysinghe, Cary Jin
 *
 * This file contains all the requests made by the client to the server.
 *
 * =============================================================================
 */

import { getToken } from "./useAdminAuth";

const api = process.env.REACT_APP_SERVER || "http://localhost:3001";

//const api = "https://d1iiwjsw1v8g79.cloudfront.net/";

const header = {
    "Content-Type": "application/json",
    Accept: "application/json"
};

let createHeader = (accessToken) => {
    return {
        Authorization: `Bearer ${accessToken}`
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
            ...createHeader(token)
        };
    }
    let fetchOptions = {
        method,
        headers
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

////////////////////////////////////////////////////////////////////////////////
////                                   SHARE                                ////
////////////////////////////////////////////////////////////////////////////////
export const sendQuestionnaireData = async (data, shareId) => {
    const url = `share/submit/${shareId}`;
    return await sendRequest("POST", url, data);
};

////////////////////////////////////////////////////////////////////////////////
////                              QUESTIONNAIRE                             ////
////////////////////////////////////////////////////////////////////////////////
// get specific questionnaire
export const getQuestionnaireById = async (Id) => {
    const url = `questionnaire/${Id}`;
    return await sendRequest("GET", url);
};

// get standardised questionnaires
export const getStandardisedQuestionnaires = async () => {
    const url = `questionnaire/standardised`;
    return await sendRequest("GET", url);
};

////////////////////////////////////////////////////////////////////////////////
////                         ADMIN & QUESTIONNAIRE                          ////
////////////////////////////////////////////////////////////////////////////////

export const addStandardQuestionnaire = async () => {
    const url = "questionnaire/addStandard";
    return await sendRequest("POST", url, undefined, getToken());
};

//edit standard questionnaire
export const editStandardQuestionnaire = async (questionnaire) => {
    const url = "questionnaire/editStandard";
    const data = {
        questionnaire
    };
    return await sendRequest("POST", url, data, getToken());
};

export const adminCopyQuestionnaire = async (questionnaire) => {
    const url = "questionnaire/copy";
    const data = {
        copyToCustomisedQuestionnaire: false,
        questionnaire
    };
    return await sendRequest("POST", url, data);
};

export const deleteStandardQuestionnaire = async (questionnaireID) => {
    const url = "questionnaire/deleteStandard";
    const data = {
        questionnaireID
    };
    return await sendRequest("POST", url, data, getToken());
};

////////////////////////////////////////////////////////////////////////////////
////                        CLINICIAN & QUESTIONNAIRE                       ////
////////////////////////////////////////////////////////////////////////////////

export const addQuestionnaire = async (token, clinicianId) => {
    const url = "questionnaire/add";
    const data = {
        clinicianId,
        isStandard: false
    };
    return await sendRequest("POST", url, data, token);
};

// get clinician questionnaire list
export const getClinicianQuestionnaires = async (accessToken, clinicianId) => {
    const url = `questionnaire/clinician?clinicianId=${clinicianId}`;
    return await sendRequest("GET", url, undefined, accessToken);
};

// Edit questionnaire.
export const editQuestionnaire = async (token, questionnaire) => {
    const url = "questionnaire/edit";
    const data = {
        questionnaire
    };
    return await sendRequest("POST", url, data, token);
};

//COPY questionnaire
export const copyQuestionnaire = async (questionnaire, clinicianId) => {
    const url = "questionnaire/copy";
    const data = {
        clinicianId,
        copyToCustomisedQuestionnaire: true,
        questionnaire
    };
    return await sendRequest("POST", url, data);
};

// Delete customised questionnaire.
export const deleteQuestionnaire = async (token, CQid, clinicianId) => {
    const url = "questionnaire/delete";
    const data = {
        CQid,
        clinicianId
    };
    return await sendRequest("POST", url, data, token);
};

export const completeQuestionnaire = async (token, data) => {
    const url = `clinician/complete-questionnaire/`;
    return await sendRequest("POST", url, data, token);
};

////////////////////////////////////////////////////////////////////////////////
////                                   ADMIN                                ////
////////////////////////////////////////////////////////////////////////////////
export const findPassword = async (email) => {
    const url =
        process.env.NODE_ENV === "production"
            ? "https://ssq.au.auth0.com/dbconnections/change_password"
            : "https://pediatric-scale.au.auth0.com/dbconnections/change_password";
    const client_id =
        process.env.NODE_ENV === "production"
            ? "cFvWQEJAqVjpvvvaz3WVkFsAilRxl8jo"
            : "ko5IIugoRXQf2uCpqRclocwbhrbqAYx4";
    const data = {
        client_id: client_id,
        email: email,
        connection: "Username-Password-Authentication"
    };
    const fetchOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    };
    await fetch(url, fetchOptions);
};

export const adminLogin = async (loginData) => {
    const url = `admin/login`;
    return await sendRequest("POST", url, loginData);
};

export const verifyAdminLogin = async (token) => {
    const url = `admin/verifylogin/${token}`;
    return await sendRequest("GET", url);
};


// get instruction based on type
export const getSpecificInstruction = async (instructionType) => {
    const url = `admin/specificInstruction/${instructionType}`;
    return await sendRequest("GET", url, undefined, getToken());
};

// get instructions summary including title and type
export const getInstructionsSummary = async () => {
    const url = `admin/instructionsSummary`;
    return await sendRequest("GET", url, undefined, getToken());
};

// update instruction by type
export const updateInstruction = async (type, data) => {
    const url = `admin/instruction/${type}`;
    return await sendRequest("POST", url, data, getToken());
};

//get countries
export const getCountries = async () => {
    const url = `admin/country`;
    return await sendRequest("GET", url, undefined, getToken());
};

// get organisations
export const getOrganisations = async (countryName) => {
    const url = `admin/country/organisation/${countryName}`;
    return await sendRequest("GET", url, undefined, getToken());
};

// get organisation's clinicians
export const getOrganisationClinicians = async (organisationName) => {
    const url = `admin/organisation/clinician/${organisationName}`;
    return await sendRequest("GET", url, undefined, getToken());
};



////////////////////////////////////////////////////////////////////////////////
////                                   SHARE                                ////
////////////////////////////////////////////////////////////////////////////////
export const getShareDetails = async (shareId) => {
    const url = `share/${shareId}`;
    return await sendRequest("GET", url);
};

// Used to share a questionnaire.
export const shareQuestionnaire = async (token, data) => {
    const url = `clinician/share/`;
    return await sendRequest("POST", url, data, token);
};
