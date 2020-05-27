/**
 * ====================================================================
 * REACT COMPONENT CLASS
 * ====================================================================
 * @date created: 14th May 2020
 * @authors: Jin Chen, Guang Yang
 *
 * The Sidebar component defines our SideBar for the application. This
 * will visible at the top of our application.
 *
 * This file is used to display the Sidebar component
 *
 */

import React from "react";

// Import components.
import QuestionsContainer from "./QuestionsContainer";
import EditDescription from "./EditDescription";

// handles rendering of TopContainer in the Clinician page
const EditQuestionnaire = (props) => {

    return (
        <div className="edit-questionnaire">
            <EditDescription />
            <QuestionsContainer questionTable = {props.questionTable} removeQuestion={props.removeQuestion}/>
        </div>
    );
};


export default EditQuestionnaire;
