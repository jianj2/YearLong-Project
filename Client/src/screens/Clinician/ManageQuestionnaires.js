// Import Libraries.
import React, { useState, useEffect } from "react";
// Import Utilities.
import * as API from "../../utils/API";
import { useAuth0 } from "../../utils/react-auth0-spa";
// Import Components.
import { CustomModal, QuestionnaireList, Loading } from "../../components/Commons";
import { useAdminAuth } from "../../utils/useAdminAuth";

/**
 * =============================================================================
 * REACT COMPONENT
 * =============================================================================
 * @date created: 17th May 2020
 * @authors: Guang Yang, Jin Chen
 *
 * The content panel will display the content of managing the questionnaire lists
 *
 * This file is used to display the questionnaire lists
 *
 */

////////////////////////////////////////////////////////////////////////////////
////                            Define Component                            ////
////////////////////////////////////////////////////////////////////////////////
const ManageQuestionnaires = () => {
    const QUESTIONNAIRE_LIST_MAX_SIZE = 50;

    const { isAuthenticated, user, token } = useAuth0();

    const [customisedQuestionnaires, setCustomisedQuestionnaires] = useState(
        []
    );
    const [
        standardisedQuestionnaires,
        setStandardisedQuestionnaires,
    ] = useState([]);

    const [loading, setLoading] = useState(false);

    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

    const [deleteQuestionnaireData, setDeleteQuestionnaireData] = useState({
        deleteQuestionnaireID: "",
        deleteQuestionnaireName: "",
    });

    const { isAdminAuthenticated, adminLogout } = useAdminAuth();

    useEffect(() => {
        if (isAdminAuthenticated) {
            adminLogout();
        }
        setLoading(true);

        if (isAuthenticated && token !== "") {
            const retrieveCustomisedQuestionnaires = async () => {
                const [,customisedQuestionnaires] = 
                    await API.getClinicianQuestionnaires(token, user.name);
                setLoading(false);
                const sortedCustomisedQuestionnaires = customisedQuestionnaires.sort(
                    (a, b) => new Date(b.updateDate) - new Date(a.updateDate)
                );
                setCustomisedQuestionnaires(sortedCustomisedQuestionnaires);
                
            };

            const retrieveStandardisedQuestionnaires = async () => {
                const [ statusCode, data] = await API.getStandardisedQuestionnaires();
                if (statusCode === 200) {
                    setStandardisedQuestionnaires(data);
                } else {
                    console.error(data);
                }
            };

            retrieveStandardisedQuestionnaires();
            retrieveCustomisedQuestionnaires();
            
        }
    }, [isAuthenticated, token, adminLogout, isAdminAuthenticated, user]);

    // Function called when Edit is clicked on the QuestionnaireList
    const editQuestionnaire = (questionnaireID) => {
        const edit_url =
            "/clinician/Questionnaire/" + questionnaireID + "/edit";
        window.location.href = edit_url;
    };

    // Function called when Copy is clicked on the QuestionnaireList
    const copyQuestionnaire = async (questionnaire) => {
        if (customisedQuestionnaires.length < QUESTIONNAIRE_LIST_MAX_SIZE) {
            setLoading(true);
            await API.copyQuestionnaire(questionnaire.questionnaireId, user.name, token);
            setLoading(false);
        } else {
            alert("The max number of customised questionnaires exceeded.");
        }
        window.location.reload();
    };

    const viewQuestionnaire = (questionnaireID) => {
        const view_url =
            "/clinician/Questionnaire/" + questionnaireID + "/view";
        window.location.href = view_url;
    };

    // Function called when Delete is clicked on the QuestionnaireList
    const deleteQuestionnaire = (questionnaireId, title) => {
        setDeleteQuestionnaireData({
            deleteQuestionnaireID: questionnaireId,
            deleteQuestionnaireName: title,
        });
        setIsDeleteModalVisible(true);
    };

    // Function called when Add New Button is clicked
    const addNew = async () => {
        setLoading(true);
        if (customisedQuestionnaires.length < QUESTIONNAIRE_LIST_MAX_SIZE) {
            setLoading(true);
            await API.addQuestionnaire(token, user.name);
            setLoading(false);
        } else {
            alert("The max number of customised questionnaires exceeded.");
        }
        setLoading(false);
        window.location.reload();
    };

    // ========================================================================
    // Delete Modal Functions
    // ========================================================================
    const deleteSelectedQuestionnaire = async () => {
        let questionnaireId = deleteQuestionnaireData.deleteQuestionnaireID;
        const arrayCopy = customisedQuestionnaires.filter(
            (q) => q.questionnaireId !== questionnaireId
        );
        setLoading(true);
        await API.deleteQuestionnaire(token, questionnaireId, user.name);
        setLoading(false);
        setCustomisedQuestionnaires(arrayCopy);
    };

    // renders a modal when user chooses to delete a questionnaire
    const renderDeleteModal = () => {
        const message = `Are you sure you want to delete ${deleteQuestionnaireData.deleteQuestionnaireName}?`;

        return (
            <CustomModal
                isModalVisible={isDeleteModalVisible}
                setIsModalVisible={setIsDeleteModalVisible}
                message={message}
                onClickConfirm={deleteSelectedQuestionnaire}
                onClickCancel={() => {}}
            />
        );
    };

    return (
        <div>
            {loading ? <Loading /> : null}
            {renderDeleteModal()}
            <div className="standard-questionnaire-container">
                <div className="SQ-header">
                    <h1>Standard Questionnaires</h1>
                </div>
                <QuestionnaireList
                    questionnaires={standardisedQuestionnaires}
                    listTitle={""}
                    isSelectable={true}
                    onClickQuestion={viewQuestionnaire}
                    canEdit={false}
                    onClickEdit={editQuestionnaire}
                    canCopy={true}
                    onClickCopy={copyQuestionnaire}
                    canDelete={false}
                    onClickDelete={deleteQuestionnaire}
                />
            </div>

            <div className="CQ-header">
                <h1>My Customised Questionnaires</h1>
                <button className="button" onClick={addNew}>
                    A D D &nbsp; N E W
                </button>
            </div>

            <QuestionnaireList
                questionnaires={customisedQuestionnaires}
                listTitle={""}
                isSelectable={true}
                onClickQuestion={viewQuestionnaire}
                canEdit={true}
                onClickEdit={editQuestionnaire}
                canCopy={true}
                onClickCopy={copyQuestionnaire}
                canDelete={true}
                onClickDelete={deleteQuestionnaire}
            />
        </div>
    );
};

export default ManageQuestionnaires;
