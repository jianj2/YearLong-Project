/**
 * ====================================================================
 * REACT COMPONENT
 * ====================================================================
 * @date created: 17th May 2020
 * @authors: Guang Yang, Jin Chen
 *
 * The content panel will display the content of managing the questionnaire lists
 *
 * This file is used to display the questionnaire lists
 *
 */

import React, { useState, useEffect } from "react";

// Import styles.
import "../../styles/managequestionnaires.css";
import "../../styles/main.css";
import * as API from "../../utils/api";
import { formatDate } from "../../utils/formatter";
import { useAuth0 } from "../../utils/react-auth0-spa";
import QuestionnaireList from "../QuestionnaireList";

const ManageQuestionnaires = (props) => {
    const { loading, isAuthenticated, loginWithRedirect, user } = useAuth0();
    console.log(user.name); //TODO: change that when we have actual clincianId

    const [Questionnaires, setQuestionnaires] = useState({
        customized_Questionnaire: [],
    });

    const [customQuestionnaires, setCustomQuestionnaires] = useState([]);

    useEffect(() => {
        async function retrieveQuestionnaires() {
            const customisedQuestionnaires = await API.getClinicianQuestionnaires(user.name);
            console.log(customisedQuestionnaires);
            const today = formatDate();
            const customisedQuestionnairesElement = customisedQuestionnaires.map((q) => {
                return { QID: q.questionnaireId, Qname: q.title, Qdescription: q.description, date: today };
            });
            setQuestionnaires({ customized_Questionnaire: customisedQuestionnairesElement });
            setCustomQuestionnaires(customisedQuestionnaires);
        }
        retrieveQuestionnaires();
    }, []);

    function SQgenerator(Qname, Qdescription, date) {
        return (
            <div className="q-frame">
                <div className="q-name">{Qname}</div>
                <div className="q-description">{Qdescription}</div>
                <div className="date">{date}</div>
            </div>
        );
    }

    function CQlist() {
        var customized_Questionnaire_list = [];
        var q;
        for (q of Questionnaires.customized_Questionnaire) {
            customized_Questionnaire_list.push(CQgenerator(q.QID, q.Qname, q.Qdescription, q.date));
        }
        return customized_Questionnaire_list;
    }

    // Function called when Edit is clicked on the QuestionnaireList
    const editQuestionnaire = (questionnaireID) => {
        let edit_url = "/clinician/" + questionnaireID + "/edit";
        window.location.href = edit_url;
    }

    // Function called when Delete is clicked on the QuestionnaireList
    const deleteQuestionnaire = (questionnaireID) => {
        const arrayCopy = Questionnaires.customized_Questionnaire.filter((q) => q.QID !== questionnaireID);
        setQuestionnaires({ customized_Questionnaire: arrayCopy });
        API.deleteQuestionnaire(questionnaireID, user.name);
    }

    // Function called when Share is clicked on the QuestionnaireList
    const shareQuestionnaire = (questionnaireID) => {
        
    }

    async function AddNew() {
        const uuid = await API.addQuestionnaire(user.name);
        const today = formatDate();
        const AddedArray = Questionnaires.customized_Questionnaire;
        AddedArray.push({
            QID: uuid,
            Qname: "New custom questionnaire",
            Qdescription: "Provide some description for this questionnaire.",
            date: today,
        });
        setQuestionnaires({ customized_Questionnaire: AddedArray });

        // let edit_url = "/clinician/" + uuid + "/edit";
        // window.location.href = edit_url;
    }

    function CQgenerator(QID, Qname, Qdescription, date) {
        // var edit_url = "/clinician/" + QID + "/edit";
        return (
            <div className="q-frame" key={QID}>
                <div className="q-name">{Qname}</div>
                <div className="q-description">{Qdescription}</div>
                <div className="date">{date}</div>
                <div className="btns-container">
                    <button className="edit-btn" onClick={(e) => editQuestionnaire(QID, e)}>
                        Edit
                    </button>
                    <button className="delete-btn" onClick={(e) => deleteQuestionnaire(QID, e)}>
                        Delete
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="standard-questionnaire-container">
                <div className="SQ-header">
                    <h1>Standard questionnaires</h1>
                </div>
                {SQgenerator("SSQ-P", "SSQ for parents", "17/05/2020")}
                {SQgenerator("SSQ-C", "SSQ for children ", "17/05/2020")}
            </div>
            {/* <div className="customized-questionnaire-container">
                <div className="CQ-header">
                    <h1>My Custom Questionnaires</h1>
                    <button className="Add-btn" onClick={AddNew}>
                        Add New
                    </button>
                </div>
                
                <CQlist />
            </div> */}

            <QuestionnaireList
                questionnaires={customQuestionnaires}
                listTitle={"My Questionnaires"}
                isSelectable={false}
                onClickQuestion={() => {}}
                canEdit={true}
                onClickEdit={editQuestionnaire}
                canDelete={true}
                onClickDelete={deleteQuestionnaire}
                canShare={true}
                onClickShare={shareQuestionnaire}
            />
        </div>
    );
};

export default ManageQuestionnaires;
