/**
 * ====================================================================
 * REACT COMPONENT CLASS
 * ====================================================================
 * @date created: 15th August 2020
 * @authors: Jin Chen
 *
 *
 */

import React, {useEffect, useState} from "react";

// Components
import Loading from "../Loading";
import QuestionnaireList from "../QuestionnaireList";

//style
import "../../styles/questionnaireList.css";

// utils

import * as API from "../../utils/api";

// handles rendering of SSQInstructionsContainer in the Admin Page
const AdminManageQuestionnaires = () => {
    const [loading, setLoading] = useState(false);
    const [standardisedQuestionnaires, setStandardisedQuestionnaires] = useState([]);

    const viewQuestionnaire = (questionnaireID) =>{
        const view_url = "/admin/standard/" + questionnaireID + "/view";
        window.location.href = view_url;

    };

    const editQuestionnaire = (questionnaireID) => {
        const edit_url = "/admin/" + questionnaireID + "/edit";
        window.location.href = edit_url;
    };

    useEffect(()=>{
        setLoading(true);
        async function retrieveStandardisedQuestionnaires(){
            const response = await API.getStandardisedQuestionnaireForAdmin();
            console.log(response);
            setStandardisedQuestionnaires(response); // cause the structure is not the same with cary's
            setLoading(false);
        }
        retrieveStandardisedQuestionnaires();
    },[])

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
            {loading ? <Loading/> :
                <div className="standard-questionnaire-container">
                    <div className="SQ-header">
                        <h1>Standard questionnaires</h1>
                    </div>
                    <QuestionnaireList
                        questionnaires={standardisedQuestionnaires}
                        listTitle={""}
                        isSelectable={true}
                        onClickQuestion={viewQuestionnaire}
                        canEdit={true}
                        onClickEdit={editQuestionnaire}
                    />
                </div>
            }
        </div>
    );
};


export default AdminManageQuestionnaires;