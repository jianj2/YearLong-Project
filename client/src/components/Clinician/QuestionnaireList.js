/**
 * ====================================================================
 * REACT COMPONENT CLASS
 * ====================================================================
 * @date created: 3rd June 2020
 * @authors: Waqas Rehmani
 *
 * The QuestionnaireList component displays the list of the 
 * questionnaires. This would be used in many places:
 *      1. Clinician doing The Test 
 *      2. Viewing All Questionnaires by the Clinician.
 *      3. Viewing All Questionnaires by the Admin.
 * 
 * This file is used to display the Sidebar component
 *
 */

import React, { useEffect, useState } from 'react';

import "../../styles/questionnaireList.css";

const QuestionnaireList = ({ questionnaires, listTitle }) => {
    

    const ListItem = ({ questionnaireId, title, description, date }) => {
        // var edit_url = "/clinician/" + QID + "/edit";
        return (
            <div className="questionnaire-list-item" >
                <div className="q-name">{title}</div>
                <div className="q-description">{description}</div>
                <div className="date">{Date.now()}</div>
            </div>
        );
    }
    return (
        <div className="questionnaire-list-container">
            <h1>{listTitle}</h1>
            {questionnaires.map((question, index) => (
                <ListItem
                    key={index}
                    questionnaireId={question.questionnaireId}
                    title={question.title}
                    description={question.description}
                />
            ))}
        </div>
    );
}

export default QuestionnaireList;