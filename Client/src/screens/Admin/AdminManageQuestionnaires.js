// Import Libraries.
import React, { useEffect, useState } from "react";
// Import Utilities.
import {
    adminCopyQuestionnaire
} from "../../utils/API";
import {
    addStandardQuestionnaire,
    getStandardisedQuestionnaires,
    deleteStandardQuestionnaire
} from "../../utils/API";
// Import Components.
import {
    Loading,
    QuestionnaireList,
    CustomModal
} from "../../components/Commons";

/**
 * =============================================================================
 * REACT COMPONENT CLASS
 * =============================================================================
 * @date created: 15th August 2020
 * @authors: Jin Chen
 *
 * The AdminManageQuestionnaires handles the rendering  of
 * SSQInstructionsContainer in the Admin Page
 *
 */

////////////////////////////////////////////////////////////////////////////////
////                            Define Component                            ////
////////////////////////////////////////////////////////////////////////////////
const AdminManageQuestionnaires = () => {
    const [loading, setLoading] = useState(false);
    const [
        standardisedQuestionnaires,
        setStandardisedQuestionnaires
    ] = useState([]);
    const [deleteQuestionnaireData, setdeleteQuestionnaireData] = useState({
        deleteQuestionnaireID: "",
        deleteQuestionnaireName: ""
    });
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

    const viewQuestionnaire = (questionnaireID) => {
        const view_url = "/admin/Questionnaire/standard/" + questionnaireID + "/view";
        window.location.href = view_url;
    };

    const editQuestionnaire = (questionnaireID) => {
        const edit_url = "/admin/Questionnaire/standard/" + questionnaireID + "/edit";
        window.location.href = edit_url;
    };

    const copyQuestionnaire = async (questionnaire) => {
        await adminCopyQuestionnaire(questionnaire.questionnaireId);
        window.location.reload(false);
    };

    const deleteQuestionnaire = (questionnaireId, title) => {
        setdeleteQuestionnaireData({
            deleteQuestionnaireID: questionnaireId,
            deleteQuestionnaireName: title
        });
        openDeleteConfirmation();
    };

    useEffect(() => {
        setLoading(true);

        async function retrieveStandardisedQuestionnaires() {
            const [
                statusCode,
                response
            ] = await getStandardisedQuestionnaires();
            if (statusCode === 200) {

                let sortedResponse = response.sort((a, b) => new Date(b.updateDate) - new Date(a.updateDate));

                setStandardisedQuestionnaires(sortedResponse);
                setLoading(false);
            }
        }

        retrieveStandardisedQuestionnaires();
    }, []);

    // function for adding new standardised questionnaire
    const addNew = async () => {
        await addStandardQuestionnaire();
        window.location.reload(false);
    }

    // ========================================================================
    // Delete Modal Functions
    // ========================================================================
    const openDeleteConfirmation = () => setIsDeleteModalVisible(true);
    const closeDeleteConfirmation = () => setIsDeleteModalVisible(false);

    const deleteSelecctedQuestionnaire = async () => {
        let questionnaireId = deleteQuestionnaireData.deleteQuestionnaireID;
        const filteredQuestionnaires = standardisedQuestionnaires.filter(
            (q) => q.questionnaireId !== questionnaireId
        );
        setStandardisedQuestionnaires(filteredQuestionnaires);
        await deleteStandardQuestionnaire(questionnaireId);
        closeDeleteConfirmation();
    };

    const renderDeleteModal = () => {
        const message = `Are you sure you want to delete ${deleteQuestionnaireData.deleteQuestionnaireName}?`;

        return (
            <CustomModal
                isModalVisible={isDeleteModalVisible}
                setIsModalVisible={setIsDeleteModalVisible}
                message={message}
                onClickConfirm={deleteSelecctedQuestionnaire}
                onClickCancel={() => {
                }}
            />
        );
    };

    return (
        <div className="admin-manage-questionnaires">
            {loading ? <Loading/> : null}

            {renderDeleteModal()}

            <div className="standard-questionnaire-container">
                <div className="SQ-header">
                    <h1>Standard questionnaires</h1>
                    <button className="button" onClick={addNew}>
                        A D D &nbsp; N E W
                    </button>
                </div>
                <QuestionnaireList
                    questionnaires={standardisedQuestionnaires}
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
        </div>
    );
};

export default AdminManageQuestionnaires;
