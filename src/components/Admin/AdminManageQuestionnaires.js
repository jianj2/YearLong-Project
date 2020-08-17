/**
 * ====================================================================
 * REACT COMPONENT CLASS
 * ====================================================================
 * @date created: 15th August 2020
 * @authors: Jin Chen
 *
 *
 */

import React, {useState} from "react";

// Components
import Loading from "../Loading";
import "../../styles/questionnaireList.css";

// handles rendering of SSQInstructionsContainer in the Admin Page
const AdminManageQuestionnaires = () => {
    // const [loading, setLoading] = useState(false);

    function standardisedQuestionnaireGenerator(Qname, Qdescription, date) {
        return (
            <div className="q-frame">
                <div className="q-name">{Qname}</div>
                <div className="q-description">{Qdescription}</div>
                <div className="date">{date}</div>
                <div className="admin-standard-questionnaireList-footer">
                    <div className="questionnaire-list-button-container">
                        <button className="button">View</button>
                        <button className="button">Edit</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-manage-questionnaires">
            <div className="standard-questionnaire-container">
                <div className="SQ-header">
                    <h1>Standard questionnaires</h1>
                </div>
                {standardisedQuestionnaireGenerator("SSQ-P", "SSQ for parents", "17/05/2020")}
                {standardisedQuestionnaireGenerator("SSQ-C", "SSQ for children ", "17/05/2020")}
            </div>
        </div>
    );
};


export default AdminManageQuestionnaires;