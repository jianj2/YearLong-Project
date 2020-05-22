/**
 * ====================================================================
 * REACT COMPONENT
 * ====================================================================
 * @date created: 17th May 2020
 * @authors: Guang Yang
 *
 * The content panel will display the content of managing the questionnaire lists
 *
 * This file is used to display the questionnaire lists
 *
 */

import React, {useState} from "react";

// Import styles.
import "../../styles/managequestionnaires.css";
import "../../styles/main.css"

var CQid = 2
const ManageQuestionnaires = (props) => {
     const [Questionnaires, setQuestionnaires] 
     = useState({
        customized_Questionnaire:[
            {
                QID:1, Qname:"First custom questionnaire", Qdescription:"Details about it", date: "17/05/2020"
            },
            {
                QID:2, Qname:"Second custom questionnaire", Qdescription:"Details about it", date: "17/05/2020"
            }
        ]
        });

    function SQgenerator(Qname, Qdescription, date){
        return (
                <div className = "q-frame">
                    <div className = "q-name">{Qname}</div>
                    <div className = "q-description">{Qdescription}</div>
                    <div className = "date">{date}</div>
                </div>
            )
    }

    function CQlist(){
        var customized_Questionnaire_list = [];
        var q;
        for(q of Questionnaires.customized_Questionnaire){
            customized_Questionnaire_list.push(  
                CQgenerator(q.QID,q.Qname,q.Qdescription, q.date)
            )
        }
        return(
            customized_Questionnaire_list
        )
    }


    function Delete(questionnaireID){
        const arrayCopy = Questionnaires.customized_Questionnaire.filter((q)=> q.QID !== questionnaireID);
        setQuestionnaires({customized_Questionnaire:arrayCopy});
    }
    
    function AddNew(){
        CQid ++;
        const AddedArray = Questionnaires.customized_Questionnaire
        AddedArray.push(
            {
                QID:CQid, Qname:"New custom questionnaire", Qdescription:"Details about it", date: "17/05/2020"
            }
        )
        setQuestionnaires({customized_Questionnaire:AddedArray})
    }

    function CQgenerator(QID, Qname, Qdescription, date){
        var edit_url = "/clinician/"+QID+"/edit"
        return (
            <div className = "q-frame" key = {QID}>
                <div className = "q-name">{Qname}</div>
                <div className = "q-description">{Qdescription}</div>
                <div className = "date">{date}</div>
                <div className = "btns-container">
                    <button className = "edit-btn" 
                    onClick = {()=> (window.location.href = edit_url) }>
                        Edit
                    </button>
                    <button className = "delete-btn" onClick = {(e) => Delete(QID,e)} >Delete</button>
                </div>
            </div>
            )
    }

    return(
        <div>
            <div className = "standard-questionnaire-container">
                <div className = "SQ-header">Standard questionnaires</div>
                {SQgenerator("Q1","blabla", "17/05/2020")}
                {SQgenerator("Q2","blabla", "17/05/2020")}
            </div> 
            <div className = "customized-questionnaire-container">
                <div className = "CQ-header">
                    My Custome Questionnaires
                    <button className = "Add-btn" onClick = {AddNew}>Add New</button>
                </div>
                <CQlist/>
            </div>
        </div>
    )
};


export default ManageQuestionnaires;
