/**
 * ====================================================================
 * REACT COMPONENT
 * ====================================================================
 * @date created: 17th May 2020
 * @authors: Guang Yang, Jin Chen
 *
 * The content panel will display the content of managing the questionnaire lists
 *
 * This file is used to display the questionnaire lists
 *
 */

import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

// Import Utils.
import * as API from "../../utils/api";
import { CustomModal } from "../../components/Commons";
import { useAuth0 } from "../../utils/react-auth0-spa";
// Import styles.
import "../../styles/managequestionnaires.css";
import "../../styles/main.css";
// Import Components.
import { QuestionnaireList } from "../../components/Commons";
import { Loading } from "../../components/Commons";
import { useAdminAuth } from "../../utils/useAdminAuth";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const ManageQuestionnaires = (props) => {
    const { isAuthenticated, user, token } = useAuth0();
    // console.log("user.name", user.name); //TODO: change that when we have actual clincianId

    const [customisedQuestionnaires, setCustomisedQuestionnaires] = useState(
        []
    );
    const [
        standardisedQuestionnaires,
        setStandardisedQuestionnaires,
    ] = useState([]);

    const [loading, setLoading] = useState(false);

    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

    const [deleteQuestionnaireData, setdeleteQuestionnaireData] = useState({
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
            async function retrieveCustomisedQuestionnaires() {
                const [
                    _,
                    customisedQuestionnaires,
                ] = await API.getClinicianQuestionnaires(token, user.name);
                console.log(customisedQuestionnaires);
                const sortedCustomisedQuestionnaires = customisedQuestionnaires.sort(function(a,b){
                    let dateA = new Date(a.updateDate), dateB = new Date(b.updateDate);
                    return dateB - dateA ;
                })
                // setQuestionnaires({ customized_Questionnaire: customisedQuestionnairesElement });
                setCustomisedQuestionnaires(sortedCustomisedQuestionnaires);
                setLoading(false);
            }
            async function retrieveStandardisedQuestionnaires() {
                const [
                    statusCode,
                    data,
                ] = await API.getStandardisedQuestionnaires();
                if (statusCode === 200) {
                    setStandardisedQuestionnaires(data);
                } else {
                    console.error(data);
                }
            }
            retrieveStandardisedQuestionnaires();
            retrieveCustomisedQuestionnaires();
        }
    }, [isAuthenticated, token]);

    // Function called when Edit is clicked on the QuestionnaireList
    const editQuestionnaire = (questionnaireID) => {
        const edit_url = "/clinician/" + questionnaireID + "/edit";
        window.location.href = edit_url;
    };

    // Function called when Copy is clicked on the QuestionnaireList
    const copyQuestionnaire = (questionnaire) => {
        console.log(questionnaire);
        API.copyQuestionnaire(questionnaire, user.name);
        window.location.reload(false);
    };

    const viewQuestionnaire = (questionnaireID) => {
        const view_url = "/standard/" + questionnaireID + "/view";
        window.location.href = view_url;
    };

    // Function called when Delete is clicked on the QuestionnaireList
    const deleteQuestionnaire = (questionnaireId, title) => {
        console.log("delete ", questionnaireId);
        console.log("delete ", title);
        setdeleteQuestionnaireData({
            deleteQuestionnaireID: questionnaireId,
            deleteQuestionnaireName: title,
        });
        setIsDeleteModalVisible(true);
    };

    // Function called when Add New Button is clicked
    async function AddNew() {
        setLoading(true);
        const [_,uuid] = await API.addQuestionnaire(token, user.name);
        setLoading(false);
        window.location.reload(false);
        // let edit_url = "/clinician/" + uuid + "/edit";
        // window.location.href = edit_url;
    }

    // ========================================================================
    // Delete Modal Functions
    // ========================================================================
    //const openDeleteConfirmation = () => setIsDeleteModalVisible(true);
    //const closeDeleteConfirmation = () => setIsDeleteModalVisible(false);

    const deleteSelecctedQuestionnaire = () => {
        let questionnaireId = deleteQuestionnaireData.deleteQuestionnaireID;
        const arrayCopy = customisedQuestionnaires.filter(
            (q) => q.questionnaireId !== questionnaireId
        );
        setCustomisedQuestionnaires(arrayCopy);
        API.deleteQuestionnaire(token, questionnaireId, user.name);
    };
    
    // renders a modal when user chooses to delete a questionnaire
    const renderDeleteModal = () => {
        const message = `Are you sure you want to delete ${deleteQuestionnaireData.deleteQuestionnaireName}?`;

        return (
            <CustomModal
                isModalVisible={isDeleteModalVisible}
                setIsModalVisible={setIsDeleteModalVisible}
                message={message}
                onClickConfirm={deleteSelecctedQuestionnaire}
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
                <button className="button" onClick={AddNew}>
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
