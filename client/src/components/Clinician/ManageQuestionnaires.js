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
import {formatDate} from "../../utils/formatter"
import { useAuth0 } from "../../utils/react-auth0-spa";


const ManageQuestionnaires = (props) => {
    const { loading, isAuthenticated, loginWithRedirect, user } = useAuth0();
    console.log(user.name); //TODO: change that when we have actual clincianId

    const [Questionnaires, setQuestionnaires] = useState({
        // customized_Questionnaire: [
        //     {
        //         QID: 1,
        //         Qname: "First custom questionnaire",
        //         Qdescription: "Details about it",
        //         date: "17/05/2020",
        //     },
        //     {
        //         QID: 2,
        //         Qname: "Second custom questionnaire",
        //         Qdescription: "Details about it",
        //         date: "17/05/2020",
        //     },
        // ],
         customized_Questionnaire: []
        
    });
     useEffect( () => {
        async function retrieveQuestionnaires(){const customisedQuestionnaires = await API.getClinicianQuestionnaires(user.name);
            console.log(customisedQuestionnaires);
            const today = formatDate();
            const customisedQuestionnairesElement = customisedQuestionnaires.map((q)=> {return {QID:q.questionnaireId, Qname:q.title, Qdescription:q.description, date:today} });
            setQuestionnaires({customized_Questionnaire: customisedQuestionnairesElement});
        };
        retrieveQuestionnaires();
    
    },[]);
   


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
            customized_Questionnaire_list.push(
                CQgenerator(q.QID, q.Qname, q.Qdescription, q.date)
            );
        }
        return customized_Questionnaire_list;
    }

    function Edit(questionnaireID) {
        let edit_url = "/clinician/" + questionnaireID + "/edit";
        window.location.href = edit_url;
    }

    function Delete(questionnaireID) {
        const arrayCopy = Questionnaires.customized_Questionnaire.filter(
            (q) => q.QID !== questionnaireID
        );
        setQuestionnaires({ customized_Questionnaire: arrayCopy });
        API.deleteQuestionnaire(questionnaireID);
    }

    async function AddNew() {

        const uuid = await API.addQuestionnaire();
        const AddedArray = Questionnaires.customized_Questionnaire;
        AddedArray.push({
            QID: uuid,
            Qname: "New custom questionnaire",
            Qdescription: "Details about it",
            date: "17/05/2020",
        });
        setQuestionnaires({ customized_Questionnaire: AddedArray });
    }

   

    function CQgenerator(QID, Qname, Qdescription, date) {
        // var edit_url = "/clinician/" + QID + "/edit";
        return (
            <div className="q-frame" key={QID}>
                <div className="q-name">{Qname}</div>
                <div className="q-description">{Qdescription}</div>
                <div className="date">{date}</div>
                <div className="btns-container">
                    <button
                        className="edit-btn"
                        onClick={(e) => Edit(QID,e)}
                    >
                        Edit
                    </button>
                    <button
                        className="delete-btn"
                        onClick={(e) => Delete(QID, e)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="standard-questionnaire-container">
                <div className="SQ-header">Standard questionnaires</div>
                {SQgenerator("Q1", "blabla", "17/05/2020")}
                {SQgenerator("Q2", "blabla", "17/05/2020")}
            </div>
            <div className="customized-questionnaire-container">
                <div className="CQ-header">
                    My Custome Questionnaires
                    <button className="Add-btn" onClick={AddNew}>
                        Add New
                    </button>
                </div>
                <CQlist />
            </div>
        </div>
    );
};

export default ManageQuestionnaires;
