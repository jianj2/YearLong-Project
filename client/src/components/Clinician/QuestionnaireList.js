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

import React, { useEffect, useState } from "react";

import "../../styles/questionnaireList.css";

const QuestionnaireList = ({
    questionnaires,
    listTitle,
    isSelectable,
    onClickQuestion,
    canEdit,
    canDelete,
}) => {
    const ListItem = ({
        questionnaireId,
        title,
        description,
        date,
        isSelectable,
        onClickQuestion,
        canEdit,
        canDelete,
    }) => {
        // var edit_url = "/clinician/" + QID + "/edit";
        return (
            <div
                className={
                    isSelectable
                        ? "questionnaire-list-item questionnaire-list-item-selectable"
                        : "questionnaire-list-item"
                }
                onClick={() => {
                    if (isSelectable) onClickQuestion(questionnaireId)
                }}
            >
                <div className="q-name">{title}</div>
                <div className="q-description">{description}</div>
                <div className="date">{Date.now()}</div>
                <div className="btns-container">
                    {canEdit ? (
                        <button className="edit-btn">Edit</button>
                    ) : null}

                    {canDelete ? (
                        <button className="delete-btn">Delete</button>
                    ) : null}
                </div>
            </div>
        );
    };
    return (
        <div className="questionnaire-list-container">
            <h1>{listTitle}</h1>
            {questionnaires.map((question, index) => (
                <ListItem
                    key={index}
                    questionnaireId={question.questionnaireId}
                    title={question.title}
                    description={question.description}
                    isSelectable={isSelectable}
                    onClickQuestion={onClickQuestion}
                    canEdit={canEdit}
                    canDelete={canDelete}
                />
            ))}
        </div>
    );
};

export default QuestionnaireList;
