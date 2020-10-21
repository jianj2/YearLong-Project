// Import Libraries.
import React from "react";
// Import Utilities.
import Chip from "@material-ui/core/Chip";
import { Avatar } from "@material-ui/core";

/**
 * =============================================================================
 * REACT COMPONENT CLASS
 * =============================================================================
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

////////////////////////////////////////////////////////////////////////////////
////                            Define Component                            ////
////////////////////////////////////////////////////////////////////////////////
const QuestionnaireList = ({
    questionnaires,
    listTitle,
    isSelectable,
    onClickQuestion,
    canEdit,
    onClickCopy,
    canCopy,
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
        isSSQ_Ch,
        date,
        isSelectable,
        onClickQuestion,
        canEdit,
        questionnaire,
        onClickCopy,
        canCopy,
        onClickEdit,
        canDelete,
        onClickDelete,
        canShare,
        onClickShare,
        sectionNames,
        isStandard,
    }) => {
        return (
            <div
                className={
                    isSelectable
                        ? "questionnaire-list-item questionnaire-list-item-selectable"
                        : "questionnaire-list-item"
                }
                onClick={() => {
                    if (isSelectable) onClickQuestion(questionnaireId);
                }}
            >
                <div className="q-name">
                    {canDelete ? (
                        isSSQ_Ch ? (
                            <Chip
                                id="SSQtype"
                                variant="outlined"
                                size="small"
                                avatar={<Avatar>Ch</Avatar>}
                                label="SSQ-FOR-CHILDERN"
                            />
                        ) : (
                            <Chip
                                id="SSQtype"
                                variant="outlined"
                                size="small"
                                avatar={<Avatar>P</Avatar>}
                                label="SSQ-FOR-PARENTS"
                            />
                        )
                    ) : null}

                    {title}
                </div>

                <div className="q-description">{description}</div>

                <div className="list-item-footer">
                    <div className="list-item-date">{date}</div>
                    <div className="questionnaire-list-button-container">
                        {canShare ? (
                            <button
                                className="button"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    onClickShare(questionnaireId, isStandard, sectionNames);
                                }}
                            >
                                S H A R E
                            </button>
                        ) : null}

                        {canEdit ? (
                            <button
                                className="button"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    onClickEdit(questionnaireId);
                                }}
                            >
                                E D I T
                            </button>
                        ) : null}

                        {canCopy ?(
                            <button
                                className="button"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    onClickCopy(questionnaire);
                                }}
                            >
                                C O P Y
                            </button>
                        ):null}

                        {canDelete ? (
                            <button
                                className="button"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    onClickDelete(questionnaireId, title);
                                }}
                            >
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
            {questionnaires.map((questionnaire, index) => (
                <ListItem
                    key={index}
                    questionnaireId={questionnaire.questionnaireId}
                    title={questionnaire.title}
                    description={questionnaire.description}
                    isSSQ_Ch={questionnaire.isSSQ_Ch}
                    isSelectable={isSelectable}
                    onClickQuestion={onClickQuestion}
                    canEdit={canEdit}
                    onClickCopy={onClickCopy}
                    canCopy={canCopy}
                    onClickEdit={onClickEdit}
                    canDelete={canDelete}
                    onClickDelete={onClickDelete}
                    canShare={canShare}
                    onClickShare={onClickShare}
                    sectionNames={questionnaire.sectionNames}
                    questionnaire={questionnaire}
                    date={questionnaire.updateDate}
                    isStandard={questionnaire.isStandard}
                />
            ))}
        </div>
    );
};

export default QuestionnaireList;
