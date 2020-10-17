// Import Libraries.
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
// Import Utilities.
import * as API from "../../utils/api";
import {
    addStandardQuestionnaire,
    getStandardisedQuestionnaires,
    deleteStandardQuestionnaire
} from "../../utils/api";
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

// Styling
const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
    }
}));

////////////////////////////////////////////////////////////////////////////////
////                            Define Component                            ////
////////////////////////////////////////////////////////////////////////////////
const AdminManageQuestionnaires = () => {
    const classes = useStyles();
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
        const view_url = "/admin/standard/" + questionnaireID + "/view";
        window.location.href = view_url;
    };

    const editQuestionnaire = (questionnaireID) => {
        const edit_url = "/admin/standard/" + questionnaireID + "/edit";
        window.location.href = edit_url;
    };

    const copyQuestionnaire = async (questionnaire) => {
        await API.adminCopyQuestionnaire(questionnaire);
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

                let sortedResponse = response.sort(function (a, b) {
                    let dateA = new Date(a.updateDate),
                        dateB = new Date(b.updateDate);
                    return dateB - dateA;
                });
                setStandardisedQuestionnaires(sortedResponse);
                setLoading(false);
            }
        }

        retrieveStandardisedQuestionnaires();
    }, []);

    // function for adding new standardised questionnaire
    async function AddNew() {
        const [_, uuid] = await addStandardQuestionnaire();
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
        const [_, message] = await deleteStandardQuestionnaire(questionnaireId);
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
                    <button className="button" onClick={AddNew}>
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
