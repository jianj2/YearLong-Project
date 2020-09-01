/**
 * ====================================================================
 * REACT COMPONENT CLASS
 * ====================================================================
 * @date created: 15th August 2020
 * @authors: Jin Chen
 *
 *
 */

import React, {useEffect, useState} from "react";

// Components
import Loading from "../Loading";
import QuestionnaireList from "../QuestionnaireList";
import { Modal, Backdrop, Fade }  from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

//style
import "../../styles/questionnaireList.css";

// utils

import {getStandardisedQuestionnaireForAdmin, deleteStandardQuestionnaire} from "../../utils/api";

//Styling
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

// handles rendering of SSQInstructionsContainer in the Admin Page
const AdminManageQuestionnaires = () => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [standardisedQuestionnaires, setStandardisedQuestionnaires] = useState([]);
    const [deleteQuestionnaireData, setdeleteQuestionnaireData] = useState({
        deleteQuestionnaireID: "",
        deleteQuestionnaireName: ""
    });
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);



    const viewQuestionnaire = (questionnaireID) =>{
        const view_url = "/admin/standard/" + questionnaireID + "/view";
        window.location.href = view_url;

    };

    const editQuestionnaire = (questionnaireID) => {
        const edit_url = "/admin/" + questionnaireID + "/edit";
        window.location.href = edit_url;
    };

    const deleteQuestionnaire = (questionnaireId, title) => {
        setdeleteQuestionnaireData(
            {
                deleteQuestionnaireID: questionnaireId,
                deleteQuestionnaireName: title
            }
        )
        openDeleteConfirmation();
        
    };

    useEffect(()=>{
        setLoading(true);
        async function retrieveStandardisedQuestionnaires(){
            const response = await getStandardisedQuestionnaireForAdmin();
            console.log(response);
            setStandardisedQuestionnaires(response); // cause the structure is not the same with cary's
            setLoading(false);
        }
        retrieveStandardisedQuestionnaires();
    },[])


     // function for adding new standardised questionnaire
     async function AddNew() {
        setLoading(true);
        //const uuid = await API.addStandardQuestionnaire();

        const AddedArray = standardisedQuestionnaires;
        let newQuestionnaire = {
            //questionnaireId: uuid,
            title: "New Standard Questionnaire",
            description: "Please click edit to begin with this questionnaire.",
            sections: [],
            isStandard: true,
            isSSQ_Ch: true,
        };
        setStandardisedQuestionnaires([newQuestionnaire, ...standardisedQuestionnaires]);
        setLoading(false);
        // let edit_url = "/clinician/" + uuid + "/edit";
        // window.location.href = edit_url;
    }


    // ========================================================================
    // Delete Modal Functions
    // ========================================================================
    const openDeleteConfirmation = () => setIsDeleteModalVisible(true);
    const closeDeleteConfirmation = () => setIsDeleteModalVisible(false);

    const deleteSelecctedQuestionnaire = () => {
        let questionnaireId = deleteQuestionnaireData.deleteQuestionnaireID
        const filteredQuestionnaires = standardisedQuestionnaires.filter((q) => q.questionnaireId !== questionnaireId);
        setStandardisedQuestionnaires(filteredQuestionnaires);
        deleteStandardQuestionnaire(questionnaireId);
        closeDeleteConfirmation();
    }

    const renderDeleteModal = () => {
        return (
            <Modal
                open={isDeleteModalVisible}
                onClose={closeDeleteConfirmation}
                closeAfterTransition
                className={classes.modal}
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={isDeleteModalVisible}>
                    <div className = "share-modal-container">
                        <h3 class = "center-text">Are you sure you want to delete {deleteQuestionnaireData.deleteQuestionnaireName}?</h3>
                        <div className = "buttons-container">
                            <button className="button" id = "margin-button" onClick={deleteSelecctedQuestionnaire} >
                                CONFIRM
                            </button>
                            <button className="button" id = "margin-button" onClick={closeDeleteConfirmation}>
                                CANCEL
                            </button>
                        </div>
                    </div>
                </Fade>
            </Modal>
        );
    };



    return (
        <div className="admin-manage-questionnaires">
            {loading ? <Loading/> : null}

                {renderDeleteModal()}
                <button className="button" onClick={AddNew}>
                    A D D &nbsp; N E W
                </button>
                <div className="standard-questionnaire-container">
                    <div className="SQ-header">
                        <h1>Standard questionnaires</h1>
                    </div>
                    <QuestionnaireList
                        questionnaires={standardisedQuestionnaires}
                        listTitle={""}
                        isSelectable={true}
                        onClickQuestion={viewQuestionnaire}
                        canEdit={true}
                        onClickEdit={editQuestionnaire}
                        canDelete = {true}
                        onClickDelete = {deleteQuestionnaire}
                    />
                </div>
            
        </div>
    );
};


export default AdminManageQuestionnaires;