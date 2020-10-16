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

const COMMON_HEADER = {
    "Content-Type": "application/json",
    Accept: "application/json"
};

let createHeader = (accessToken) => {
    if (accessToken){
        return COMMON_HEADER;
    }
    return {
        ...COMMON_HEADER,
        Authorization: `Bearer ${accessToken}`
    };
};

const sendRequest = async (
    method,
    url,
    data = undefined,
    token = undefined
) => {

    let headers =  createHeader(token);

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
////                              QUESTIONNAIRE                             ////
////////////////////////////////////////////////////////////////////////////////
/**
 * Gets a specific questionnaire by Id.
 *
 * @params Id
 * @returns {Promise} ~ response from the server.
 */
export const getQuestionnaireById = async (Id) => {
    const url = `questionnaire/${Id}`;
    return await sendRequest("GET", url);
};

/**
 * Gets all standardised questionnaires
 *
 * @returns {Promise} ~ response from the server.
 */
export const getStandardisedQuestionnaires = async () => {
    const url = `questionnaire/standardised`;
    return await sendRequest("GET", url);
};

////////////////////////////////////////////////////////////////////////////////
////                         ADMIN & QUESTIONNAIRE                          ////
////////////////////////////////////////////////////////////////////////////////
/**
 * Creates a standardised questionnaire.
 *
 * @returns {Promise} ~ response from the server.
 */
export const addStandardQuestionnaire = async () => {
    const url = "questionnaire/addStandard";
    return await sendRequest("POST", url, undefined, getToken());
};
/**
 * Edits a standard questionnaire
 *
 * @params questionnaireData
 * @returns {Promise} ~ response from the server.
 */
export const editStandardQuestionnaire = async (questionnaireData) => {
    const url = "questionnaire/editStandard";
    const data = {
        questionnaireData
    };
    return await sendRequest("POST", url, data, getToken());
};
/**
 * Copies the questionnaire
 *
 * @params questionnaireData
 * @returns {Promise} ~ response from the server.
 */
export const adminCopyQuestionnaire = async (questionnaireData) => {
    const url = "questionnaire/copy";
    const data = {
        copyToCustomisedQuestionnaire: false,
        questionnaireData
    };
    return await sendRequest("POST", url, data);
};
/**
 * Deletes the standard questionnaire.
 *
 * @params questionnaireId
 * @returns {Promise} ~ response from the server.
 */
export const deleteStandardQuestionnaire = async (questionnaireId) => {
    const url = "questionnaire/deleteStandard";
    const data = {
        questionnaireId
    };
    return await sendRequest("POST", url, data, getToken());
};

////////////////////////////////////////////////////////////////////////////////
////                        CLINICIAN & QUESTIONNAIRE                       ////
////////////////////////////////////////////////////////////////////////////////
/**
 * Clinician creates a custom questionnaire.
 *
 * @params accessToken, clinicianId
 * @returns {Promise} ~ response from the server.
 */
export const addQuestionnaire = async (accessToken, clinicianId) => {
    const url = "questionnaire/add";
    const data = {
        clinicianId,
        isStandard: false
    };
    return await sendRequest("POST", url, data, accessToken);
};
/**
 * Gets all clinician's questionnaires.
 *
 * @params accessToken, clinicianId
 * @returns {Promise} ~ response from the server.
 */
export const getClinicianQuestionnaires = async (accessToken, clinicianId) => {
    const url = `questionnaire/clinician?clinicianId=${clinicianId}`;
    return await sendRequest("GET", url, undefined, accessToken);
};

/**
 * Clinician edits a custom questionnaire.
 *
 * @params accessToken, questionnaireData
 * @returns {Promise} ~ response from the server.
 */
export const editQuestionnaire = async (accessToken, questionnaireData) => {
    const url = "questionnaire/edit";
    const data = {
        questionnaireData
    };
    return await sendRequest("POST", url, data, accessToken);
};

/**
 * Clinician copies a custom questionnaire.
 *
 * @params questionnaireData, clinicianId
 * @returns {Promise} ~ response from the server.
 */
export const copyQuestionnaire = async (questionnaireData, clinicianId) => {
    const url = "questionnaire/copy";
    const data = {
        clinicianId,
        copyToCustomisedQuestionnaire: true,
        questionnaireData
    };
    return await sendRequest("POST", url, data);
};
/**
 * Deletes a clinician's questionnaire.
 *
 * @params accessToken, CQid, clinicianId
 * @returns {Promise} ~ response from the server.
 */
export const deleteQuestionnaire = async (accessToken, CQid, clinicianId) => {
    const url = "questionnaire/delete";
    const data = {
        CQid,
        clinicianId
    };
    return await sendRequest("POST", url, data, accessToken);
};
/**
 * Clinician completes a questionnaire.
 *
 * @params accessToken, data
 * @returns {Promise} ~ response from the server.
 */
export const completeQuestionnaire = async (accessToken, data) => {
    const url = `clinician/complete-questionnaire/`;
    return await sendRequest("POST", url, data, accessToken);
};

////////////////////////////////////////////////////////////////////////////////
////                                   ADMIN                                ////
////////////////////////////////////////////////////////////////////////////////
/**
 * Find password for admin.
 *
 * @params email
 * @returns {Promise} ~ response from the server.
 */
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
        headers: COMMON_HEADER,
        body: JSON.stringify(data)
    };
    await fetch(url, fetchOptions);
};

/**
 * Admin Login
 *
 * @params loginData
 * @returns {Promise} ~ response from the server.
 */
export const adminLogin = async (loginData) => {
    const url = `admin/login`;
    return await sendRequest("POST", url, loginData);
};

/**
 * Verify admin Login
 *
 * @params accessToken
 * @returns {Promise} ~ response from the server.
 */
export const verifyAdminLogin = async (accessToken) => {
    const url = `admin/verifylogin/${accessToken}`;
    return await sendRequest("GET", url);
};

/**
 * Get specific instruction for admin
 *
 * @params instructionType
 * @returns {Promise} ~ response from the server.
 */
export const getSpecificInstruction = async (instructionType) => {
    const url = `admin/specificInstruction/${instructionType}`;
    return await sendRequest("GET", url, undefined, getToken());
};

/**
 * Get all instructions.
 *
 * @returns {Promise} ~ response from the server.
 */
export const getInstructionsSummary = async () => {
    const url = `admin/instructionsSummary`;
    return await sendRequest("GET", url, undefined, getToken());
};
/**
 * Update specific instruction for admin
 *
 * @params instructionType, data
 * @returns {Promise} ~ response from the server.
 */
export const updateInstruction = async (instructionType, data) => {
    const url = `admin/instruction/${instructionType}`;
    return await sendRequest("POST", url, data, getToken());
};

//get countries

/**
 * Get all countries
 *
 * @returns {Promise} ~ response from the server.
 */
export const getCountries = async () => {
    const url = `admin/country`;
    return await sendRequest("GET", url, undefined, getToken());
};
/**
 * Get all organisations in a country.
 *
 * @params countryName
 * @returns {Promise} ~ response from the server.
 */
export const getOrganisations = async (countryName) => {
    const url = `admin/country/organisation/${countryName}`;
    return await sendRequest("GET", url, undefined, getToken());
};

/**
 * Get all clinicians in an organisations.
 *
 * @params organisationName
 * @returns {Promise} ~ response from the server.
 */
export const getOrganisationClinicians = async (organisationName) => {
    const url = `admin/organisation/clinician/${organisationName}`;
    return await sendRequest("GET", url, undefined, getToken());
};

////////////////////////////////////////////////////////////////////////////////
////                                   SHARE                                ////
////////////////////////////////////////////////////////////////////////////////

/**
 * Send questionnaire data after filling out the questionnaire
 *
 * @params data, shareId
 * @returns {Promise} ~ response from the server.
 */
export const sendQuestionnaireData = async (data, shareId) => {
    const url = `share/submit/${shareId}`;
    return await sendRequest("POST", url, data);
};

/**
 * Get share details.
 *
 * @params shareId
 * @returns {Promise} ~ response from the server.
 */
export const getShareDetails = async (shareId) => {
    const url = `share/${shareId}`;
    return await sendRequest("GET", url);
};

/**
 * Create a share data.
 *
 * @returns {Promise} ~ response from the server.
 */
export const shareQuestionnaire = async (accessToken, data) => {
    const url = `clinician/share/`;
    return await sendRequest("POST", url, data, accessToken);
};
