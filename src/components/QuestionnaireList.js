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
 * Props:
 *  -questionnaires: (Array):
 *      This would be the array of questionnaire, which will be
 *      displayed.
 *
 *  -listTitle: (String):
 *      This would be title that displays on top of the list.
 *
 *  -isSelectable: (Boolean):
 *      If true, the list items are selectable.
 *
 *  - onClickQuestion: (Function):
 *      Defines what happens when the list item is clicked. Only works
 *      when isSelectable === true. This function returns the
 *      questionnaireId which can be used by the parent component
 *      calling this List to use that ID in any way it wants.
 *
 *  - canEdit: (Boolean):
 *      If true, shows the Edit Button.
 *
 *  - onClickEdit: (Function):
 *      Defines what the edit button must do. Returns the
 *      questionnaireId which can be used by the parent component
 *      calling this List to take the app to the edit questionnaire
 *      page.
 *
 *  - canDelete: (Boolean):
 *      If true, shows the Delete Button.
 *
 *  - onClickDelete: (Function):
 *      Defines what the delete button must do. Returns the
 *      questionnaireId which can be used by the parent component
 *      calling this List to delete the questionnaire.
 *
 *   - canShare: (Boolean):
 *      If true, shows the Share Button.
 *
 *  - onClickShare: (Function):
 *      Defines what the Share button must do. Returns the
 *      questionnaireId which can be used by the parent component
 *      calling this List to Share the questionnaire.
 *
 */

import React from "react";

// Import Utils
import { formatDate } from "../utils/formatter";

// Import Styles
import "../styles/questionnaireList.css";
import { DialogTitle } from "@material-ui/core";

const QuestionnaireList = ({
    questionnaires,
    listTitle,
    isSelectable,
    onClickQuestion,
    canEdit,
    onClickEdit,
    canDelete,
    onClickDelete,
    canShare,
    onClickShare,
}) => {


    const ListItem = ({
        questionnaireId,
        title,
        description,
        date,
        isSelectable,
        onClickQuestion,
        canEdit,
        onClickEdit,
        canDelete,
        onClickDelete,
        canShare,
        onClickShare,
    }) => {
        // var edit_url = "/clinician/" + QID + "/edit";
        return (
            <div
                className={isSelectable ? "questionnaire-list-item questionnaire-list-item-selectable" : "questionnaire-list-item"}
                onClick={() => {
                    if (isSelectable) onClickQuestion(questionnaireId);
                }}
            >
                <div className="q-name">{title}</div>
                <div className="q-description">{description}</div>

                <div className="list-item-footer">
                    <div className="list-item-date">{formatDate()}</div>
                    <div className="questionnaire-list-button-container">
                        {canShare ? (
                            <button className="button" onClick={() => onClickShare(questionnaireId)}>
                                S H A R E
                            </button>
                        ) : null}

                        {canEdit ? (
                            <button className="button" onClick={() => onClickEdit(questionnaireId)}>
                                E D I T
                            </button>
                        ) : null}

                        {canDelete ? (
                            <button className="button" onClick={() => onClickDelete(questionnaireId, title)}>
                                D E L E T E
                            </button>
                        ) : null}
                    </div>
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
                    onClickEdit={onClickEdit}
                    canDelete={canDelete}
                    onClickDelete={onClickDelete}
                    canShare={canShare}
                    onClickShare={onClickShare}
                />
            ))}
        </div>
    );
};

export default QuestionnaireList;
