/*
 * ============================================
 * DEFINING API Utils
 * ============================================
 * @date created: 10 May 2020
 * @authors: Cary
 *
 * This file contains functions that help process API calls. 
 *
 */
const sendJSONResponse = (res, data, error, errorCode) => {
    if (data != null && !error) {
        res.status(200).json(data);
    } else {
        res.status(errorCode).json(error.message);
        console.log(error.message);
    }
};

module.exports.sendJSONResponse = sendJSONResponse;