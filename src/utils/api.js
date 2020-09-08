import { Cookies } from 'react-cookie';


const api = "http://localhost:3001";

//const api = "https://d1iiwjsw1v8g79.cloudfront.net/";




const cookies = new Cookies();
let authToken = cookies.get("accessToken");
let header = {

    "Authorization": `Bearer ${authToken}`
}
console.log("here is the header", header);


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

export const getQuestionnaire = (questionnaireID) =>
    fetch(`${api}/questionnaire/${questionnaireID}`, {
        header,
    }).then((res) => res.json());

export const sendQuestionnaireData = (data, shareId) =>
    fetch(`${api}/share/submit/${shareId}`, {
        method: "POST",
        headers: {
            ...header,

            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((res) => res.json());

// ================================================
// Clinician server calls
// ================================================
export const completeQuestionnaire = (data) =>
    fetch(`${api}/clinician/complete-questionnaire/`, {
        method: "POST",
        headers: {
            ...header,
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((res) => res.json());

// ================================================
// Managing Questionnaire server calls
// ================================================
// add new questionnaire
export const addQuestionnaire = async (clinicianId) => {
    const url = api + "/questionnaire/add";

    const headers = {
        ...header,
        "Content-Type": "application/json",
        Accept: "application/json",
    };

    const data = {
        clinicianId,
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



export const addStandardQuestionnaire = async () => {
    const url = api + "/questionnaire/addStandard";

    const headers = {
        ...header,
        "Content-Type": "application/json",
        Accept: "application/json",
    };
 
    return new Promise(async (resolve) => {
        try {
            let response = await fetch(url, {
                method: "POST",
                headers: headers,
                
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

// delete customised questionnaire
export const deleteQuestionnaire = (CQid, clinicianId) => {
    // console.log(CQid, clinicianId);
    const data = {
        CQid,
        clinicianId,
    };
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
// TODO: get CQid and entire edited questionnaire from UI
export const editQuestionnaire = async (questionnaire) => {
    const url = api + "/questionnaire/edit";
    const headers = {
        ...header,
        "Content-Type": "application/json",
        Accept: "application/json",
    };

    const data = {
        questionnaire,
    };

    try {
        let response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data),
        });
        let json = await response.json();
    } catch (e) {
        console.error(
            "An error has occurred while saving the edited questionnaire",
            e
        );
    }
};

// get specific questionnaire
// TODO: get CQid and entire edited questionnaire from UI
export const getAndSetSpecificQuestionnaire = async (CQid, setState) => {
    let res = await fetch(`${api}/questionnaire/getQuestionnaire/${CQid}`, {
        method: "GET",
        headers: {
            ...header,
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });
    let json = await res.json();
    setState(json);
    return json;
};

// get clinician questionnaire list

export const getClinicianQuestionnaires = async (clinicianId) => {
    const url = `${api}/questionnaire/clinician?clinicianId=${clinicianId}`;
    let response = await fetch(url, {
        headers: header,
    });
    let json = await response.json();

    return json;
};

// get standardised questionnaires
export const getStandardisedQuestionnaires = async () => {
    const url = `${api}/questionnaire/standardised`;
    let response = await fetch(url, {
        headers: header,
    });
    let json = await response.json();

    return json;
};

//get standardised questionnaires(admin)
export const getStandardisedQuestionnaireForAdmin = async () => {
    const url = `${api}/admin/getStandardisedQuestionnaire`;
    let response = await fetch(url, {
        headers: header,
    });
    let json = await response.json();
    return json;
};

export const deleteStandardQuestionnaire = async (questionnaireID) => {
    const data = {
        questionnaireID,
    };

    let response = await fetch(`${api}/questionnaire/deleteStandard`, {
        method: "POST",
        headers: {
            ...header,
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    let json = await response.json();
    return json;
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
export const shareQuestionnaire = (data) =>
    fetch(`${api}/clinician/share/`, {
        method: "POST",
        headers: {
            ...header,

            Accept: "application/json",
            "Content-Type": "application/json",
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
        headers: header
    });
    let json = await response.json();
    return json;
};

// get instructions summary including title and type

export const getInstructionsSummary = async () => {
    const url = `${api}/admin/instructionsSummary`;
    let response = await fetch(url, {
        headers: header
    });
    let json = await response.json();
    console.log("inss", json);
    return json;
};

// send Instructions
export const sendInstructions = (data) =>
    fetch(`${api}/admin/instruction`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((res) => res);

// update instruction by type
export const updateInstruction = (type, data) =>
fetch(`${api}/admin/instruction/${type}`, {
    method: "POST",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
}).then((res) => res);

export const getSecret = async () =>{
  
    let response = await fetch(`${api}/admin/secret/`, {
        method: "GET",
        headers: header
          
        
    });
    let json = await response.json();
    return json;

}
