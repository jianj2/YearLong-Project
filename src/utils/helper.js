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

// create marks on the slider.
export const createMarks = () => {
    let mymarks = [
        {
            value: 0,
            label: "0"
        }, {
            value: 1,
            label: "1"
        }, {
            value: 2,
            label: "2"
        }, {
            value: 3,
            label: "3"
        }, {
            value: 4,
            label: "4"
        }, {
            value: 5,
            label: "5"
        }, {
            value: 6,
            label: "6"
        }, {
            value: 7,
            label: "7"
        }, {
            value: 8,
            label: "8"
        }, {
            value: 9,
            label: "9"
        },
        {
            value: 10,
            label: "10"
        }
    ];
    let i;
    for (i = 0; i <= 10; i += 0.1) {
        if (i % 1 !== 0) {
            let temp = { value: i, style: { color: "blue" } };
            mymarks.push(temp);
        }
    }
    return mymarks;
};

export const romeNumber = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x"];

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