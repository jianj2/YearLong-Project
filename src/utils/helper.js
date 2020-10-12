
export const USER_TYPE_CLINICIAN = "CLINICIAN"
export const USER_TYPE_ADMIN = "ADMIN"
export const USER_TYPE_PARTICIPANT = "PARTICIPANT"


export function formatDate() {
    let d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [day, month, year].join('/');
}