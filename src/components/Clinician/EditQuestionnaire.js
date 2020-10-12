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

import React, { useState } from "react";
import { CustomModal } from "../Commons";

// Import components.
import EditDescription from "./EditDescription";
import { Loading } from "../Commons";
import SectionsContainer from "./SectionsContainer";
//style
import "../../styles/clinician.css";

//utils
import * as API from "../../utils/api";

//Auth0
import { useAuth0 } from "../../utils/react-auth0-spa";

// handles rendering of the edit questionnaire page for clinicians
const EditQuestionnaire = ({
    Questionnaire,
    removeQuestion,
    changeToRangeQuestion,
    changeToMCQQuestion,
    addAnswerToMCQQuestion,
    deleteAnswerFromMCQQuestion,
    addQuestion,
    addScenario,
    removeScenario,
    handleQuestionnaireTitleChange,
    handleQuestionnaireTypeChange,
    handleQuestionnaireDesChange,
    handleQuestionDesChange,
    handleQuestionOptsChange,
    handleSecTitleChange,
    handleSceDesChange,
    redirectURL,
}) => {
    const [isSaveModalVisible, setIsSaveModalVisible] = useState(false);

    const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);

    const { token } = useAuth0();

    const handleSaveQuestionnaire = async () => {
        if (manage_questionnaire_url === "/clinician") {
            await API.editQuestionnaire(token, Questionnaire);
        } else {
            await API.editStandardQuestionnaire(Questionnaire);
        }

        window.location.href = manage_questionnaire_url;
    };

    // renders a modal when user wants to save changes while editing questionnaire
    const renderSaveModal = () => {
        const message =
            "Are you sure you want to save your changes to this questionnaire?";
        return (
            <CustomModal
                isModalVisible={isSaveModalVisible}
                setIsModalVisible={setIsSaveModalVisible}
                message={message}
                onClickConfirm={handleSaveQuestionnaire}
                onClickCancel={() => {}}
            />
        );
    };

    // renders a modal when user wants to discard changes made while editing questionnaire
    const renderCancelModal = () => {
        const message =
            "Your changes will not be saved. Are you sure you want to cancel editing this questionnaire?";
        return (
            <CustomModal
                isModalVisible={isCancelModalVisible}
                setIsModalVisible={setIsCancelModalVisible}
                message={message}
                onClickConfirm={() => {
                    window.location.href = manage_questionnaire_url;
                }}
                onClickCancel={() => {}}
            />
        );
    };

    const manage_questionnaire_url = redirectURL;

    if (!Questionnaire) {
        return <Loading />;
    } else {
        return (
            <div className="edit-questionnaire">
                <div className="edit-questionnaire-header">
                    <button
                        id="edit-cancel-button"
                        className="button"
                        onClick={(event) => {
                            event.preventDefault();
                            setIsCancelModalVisible(true);
                        }}
                    >
                        Cancel
                    </button>

                    <button
                        id="edit-save-button"
                        className="button"
                        onClick={(event) => {
                            event.preventDefault();
                            setIsSaveModalVisible(true);
                        }}
                    >
                        Save
                    </button>
                </div>

                {renderSaveModal()}
                {renderCancelModal()}

                <EditDescription
                    Questionnaire={Questionnaire}
                    handleQuestionnaireTitleChange={
                        handleQuestionnaireTitleChange
                    }
                    handleQuestionnaireDesChange={handleQuestionnaireDesChange}
                    handleQuestionnaireTypeChange={
                        handleQuestionnaireTypeChange
                    }
                />

                <SectionsContainer
                    sections={Questionnaire.sections}
                    addQuestion={addQuestion}
                    removeQuestion={removeQuestion}
                    addScenario={addScenario}
                    removeScenario={removeScenario}
                    changeToRangeQuestion={changeToRangeQuestion}
                    changeToMCQQuestion={changeToMCQQuestion}
                    addAnswerToMCQQuestion={addAnswerToMCQQuestion}
                    deleteAnswerFromMCQQuestion={deleteAnswerFromMCQQuestion}
                    handleQuestionDesChange={handleQuestionDesChange}
                    handleQuestionOptsChange={handleQuestionOptsChange}
                    handleSecTitleChange={handleSecTitleChange}
                    handleSceDesChange={handleSceDesChange}
                />
            </div>
        );
    }
};

export default EditQuestionnaire;
