/**
 * =============================================================================
 * JAVASCRIPT API FILE
 * =============================================================================
 * @date created: 16th October 2020
 * @authors: Waqas Rehmani, Cary Jin
 *
 * This file contains the HTTP fetch method used by the methods in the api.
 *
 * =============================================================================
 */

const API = process.env.REACT_APP_SERVER || "http://localhost:3001";

const COMMON_HEADER = {
    "Content-Type": "application/json",
    Accept: "application/json"
};

/**
 * =============================================================================
 * Helper method used to create headers for the HTTP request.
 *
 * @param accessToken
 * @returns JSON object with header.
 */
let createHeader = (accessToken) => {
    if (accessToken) {
        return {
            ...COMMON_HEADER,
            Authorization: `Bearer ${accessToken}`
        };
    } else {
        return COMMON_HEADER;
    }
};
/**
 * =============================================================================
 * Helper method used to create headers for the HTTP request.
 *
 * @param method
 * @param url
 * @param data
 * @param token
 * @returns {Promise<unknown>} - response from the server.
 */
export const sendRequest = async (
    method,
    url,
    data = undefined,
    token = undefined
) => {
    let headers = createHeader(token);

    let fetchOptions = {
        method,
        headers
    };
    if (method === "POST") {
        fetchOptions = { ...fetchOptions, body: JSON.stringify(data) };
    }
    try {
        const response = await fetch(`${API}/${url}`, fetchOptions);
        const status = response.status;
        const data = await response.json();
        return await new Promise((resolve) => {
            resolve([status, data]);
        });
    } catch (error) {
        console.error(error);
    }
};
/**
 * =============================================================================
 * This HTTP request is to findPasswordRequest.
 *
 * @param email
 * @returns {Promise<void>}
 */
export const findPasswordRequest = async (email) => {
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