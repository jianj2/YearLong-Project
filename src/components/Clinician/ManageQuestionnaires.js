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


// Import Utils.
import * as API from "../../utils/api";
import { formatDate } from "../../utils/formatter";
import { useAuth0 } from "../../utils/react-auth0-spa";
// Import styles.
import "../../styles/managequestionnaires.css";
import "../../styles/main.css";
// Import Components.
import QuestionnaireList from "../QuestionnaireList";
import Loading from "../Loading";

const ManageQuestionnaires = (props) => {
    const { isAuthenticated, loginWithRedirect, user } = useAuth0();
    console.log(user.name); //TODO: change that when we have actual clincianId


    const [questionnaires, setQuestionnaires] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        async function retrieveQuestionnaires() {
            const customisedQuestionnaires = await API.getClinicianQuestionnaires(user.name);
            console.log(customisedQuestionnaires);
            const today = formatDate();
            const customisedQuestionnairesElement = customisedQuestionnaires.map((q) => {
                return { QID: q.questionnaireId, Qname: q.title, Qdescription: q.description, date: today };
            });
            // setQuestionnaires({ customized_Questionnaire: customisedQuestionnairesElement });
            setQuestionnaires(customisedQuestionnaires);
            setLoading(false);
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

    // function CQlist() {
    //     var customized_Questionnaire_list = [];
    //     var q;
    //     for (q of Questionnaires.customized_Questionnaire) {
    //         customized_Questionnaire_list.push(CQgenerator(q.QID, q.Qname, q.Qdescription, q.date));
    //     }
    //     return customized_Questionnaire_list;
    // }

    // Function called when Edit is clicked on the QuestionnaireList
    const editQuestionnaire = (questionnaireID) => {
        let edit_url = "/clinician/" + questionnaireID + "/edit";
        window.location.href = edit_url;
    }

    // Function called when Delete is clicked on the QuestionnaireList
    const deleteQuestionnaire = (questionnaireId) => {
        console.log("delete ", questionnaireId);
        const arrayCopy = questionnaires.filter((q) => q.questionnaireId !== questionnaireId);
        setQuestionnaires(arrayCopy);
        API.deleteQuestionnaire(questionnaireId, user.name);
    };

    // Function called when Share is clicked on the QuestionnaireList
    const shareQuestionnaire = (questionnaireID) => {

    }

    // Function called when Add New Button is clicked
    async function AddNew() {
        setLoading(true);
        const uuid = await API.addQuestionnaire(user.name);
        
        // const today = formatDate();
        const AddedArray = questionnaires;
        let newQuestionnaire = {
            questionnaireId: uuid,
            title: "New Questionnaire",
            description: "Please click edit to begin with this questionnaire.",
            sections: [],
            isStandard: false,
        }; 
        setQuestionnaires([newQuestionnaire, ...questionnaires]);
        setLoading(false);
        // let edit_url = "/clinician/" + uuid + "/edit";
        // window.location.href = edit_url;
    }
 

    return (
        <div>
            {loading ? <Loading /> : null}

            <div className="standard-questionnaire-container">
                <div className="SQ-header">
                    <h1>Standard questionnaires</h1>
                </div>
                {SQgenerator("SSQ-P", "SSQ for parents", "17/05/2020")}
                {SQgenerator("SSQ-C", "SSQ for children ", "17/05/2020")}
            </div>

            <div className="CQ-header">
                <h1>My Questionnaires</h1>
                <button className="button" onClick={AddNew}>
                    A D D &nbsp; N E W
                </button>
            </div> 

            <QuestionnaireList
                questionnaires={questionnaires}
                listTitle={""}
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
