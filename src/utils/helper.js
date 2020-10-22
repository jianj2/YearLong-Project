/**
 * =============================================================================
 * JAVASCRIPT HELPER FILE
 * =============================================================================
 * @date created: 12th October 2020
 * @authors: Team PS
 *
 * This file contains helper variables, constants and functions used throughout
 * the application.
 *
 * =============================================================================
 */

// Helper Constants
export const USER_TYPE_CLINICIAN = "CLINICIAN";
export const USER_TYPE_ADMIN = "ADMIN";
export const USER_TYPE_PARTICIPANT = "PARTICIPANT";

export const deviceTypeOption = ["None", "Hearing Aid", "Cochlear Implant", "Other", ""];
export const filledByTypeOptions = ["Mother", "Father", "Guardian", "Other", ""];

export const HELPER_SORT = {
    "PERFORMANCE": "PERFORMANCE",
    "IMPORTANCE": "IMPORTANCE",
}

// Helper Function
export const formatDate = () => {
    let d = new Date(),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = "0" + month;
    if (day.length < 2)
        day = "0" + day;

    return [day, month, year].join("/");
};