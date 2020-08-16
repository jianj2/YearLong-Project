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
import { Modal, Backdrop, Fade, FormControl, InputLabel, Input, FormHelperText, FormControlLabel, Checkbox } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// Import Utils.
import * as API from "../../utils/api";
import { formatDate } from "../../utils/formatter";
import { useAuth0 } from "../../utils/react-auth0-spa";
// Import styles.
import "../../styles/managequestionnaires.css";
import "../../styles/main.css";
// Import Components.
import QuestionnaireList from "../QuestionnaireList";
import Loading from "../Loading";

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
    const classes = useStyles();
    const { isAuthenticated, loginWithRedirect, user } = useAuth0();
    // console.log("user.name", user.name); //TODO: change that when we have actual clincianId

    const [customisedQuestionnaires, setCustomisedQuestionnaires] = useState([]);
    const [standardisedQuestionnaires, setStandardisedQuestionnaires] = useState([]);

    const [loading, setLoading] = useState(false);

    const [isShareModalVisible, setIsShareModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

    const [shareModalData, setShareModalData] = useState({
        patientEmail: "",
        questionnaireId: "",
        clinicianEmail: user.name,
        message: "",
        readOnly: false
    });

    const [deleteQuestionnaireData, setdeleteQuestionnaireData] = useState({
        deleteQuestionnaireID: "",
        deleteQuestionnaireName: ""
    });

    useEffect(() => {
        setLoading(true);
        async function retrieveCustomisedQuestionnaires() {
            const customisedQuestionnaires = await API.getClinicianQuestionnaires(user.name);
            console.log(customisedQuestionnaires);
            const today = formatDate();
            const customisedQuestionnairesElement = customisedQuestionnaires.map((q) => {
                return { QID: q.questionnaireId, Qname: q.title, Qdescription: q.description, date: today };
            });
            // setQuestionnaires({ customized_Questionnaire: customisedQuestionnairesElement });
            setCustomisedQuestionnaires(customisedQuestionnaires);
            setLoading(false);
        }
        async function retrieveStandardisedQuestionnaires(){

            const response = await API.getStandardisedQuestionnaires();
            if (response.statusCode === 200){
                setStandardisedQuestionnaires(response.data);
            }  
        }
        retrieveStandardisedQuestionnaires();
        retrieveCustomisedQuestionnaires();
    }, [user]);

    // Function called when Edit is clicked on the QuestionnaireList
    const editQuestionnaire = (questionnaireID) => {
        const edit_url = "/clinician/" + questionnaireID + "/edit";
        window.location.href = edit_url;
    };

    const viewQuestionnaire = (questionnaireID) =>{
        const view_url = "/standard/" + questionnaireID + "/view";
        window.location.href = view_url;

    };

    // Function called when Delete is clicked on the QuestionnaireList
    const deleteQuestionnaire = (questionnaireId, title) => {
        console.log("delete ", questionnaireId);
        console.log("delete ", title);
        setdeleteQuestionnaireData(
            {
                deleteQuestionnaireID: questionnaireId,
                deleteQuestionnaireName: title
            }
        )
        openDeleteConfirmation();
        // const arrayCopy = questionnaires.filter((q) => q.questionnaireId !== questionnaireId);
        // setQuestionnaires(arrayCopy);
        // API.deleteQuestionnaire(questionnaireId, user.name);
    };

    // Function called when Share is clicked on the QuestionnaireList
    const shareQuestionnaire = (questionnaireId) => {
        console.log("share Questionnaire ", questionnaireId);
        setShareModalData({
            ...shareModalData,
            questionnaireId,
        });
        openModal();
    };

    // Function called when Add New Button is clicked
    async function AddNew() {
        setLoading(true);
        const uuid = await API.addQuestionnaire(user.name);

        // const today = formatDate();
        const AddedArray = customisedQuestionnaires;
        let newQuestionnaire = {
            questionnaireId: uuid,
            title: "New Questionnaire",
            description: "Please click edit to begin with this questionnaire.",
            sections: [],
            isStandard: false,
        };
        setCustomisedQuestionnaires([newQuestionnaire, ...customisedQuestionnaires]);
        setLoading(false);
        // let edit_url = "/clinician/" + uuid + "/edit";
        // window.location.href = edit_url;
    }

    // ========================================================================
    // Share Modal Functions
    // ========================================================================
    const openModal = () => setIsShareModalVisible(true);
    const closeModal = () => setIsShareModalVisible(false);

    const handleShareSubmit = (e) => {
        e.preventDefault();
        setLoading(true); 
        API.shareQuestionnaire(shareModalData).then( res => {
            console.log("printing the res: ", res);
            setLoading(false); 
            closeModal();
        })
    }

    const renderShareModal = () => {
        return (
            <Modal
                open={isShareModalVisible}
                onClose={closeModal}
                closeAfterTransition
                className={classes.modal}
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={isShareModalVisible}>
                    <form className="share-modal-container" onSubmit={handleShareSubmit}>
                        <h2>Share Details</h2>
                        <FormControl margin="dense">
                            <InputLabel>Patient's Email</InputLabel>
                            <Input
                                onChange={(e) => {
                                    setShareModalData({
                                        ...shareModalData,
                                        patientEmail: e.target.value,
                                    });
                                }}
                                name="patientEmail"
                                type="email"
                                required
                            />
                            <FormHelperText>Please enter patient's email.</FormHelperText>
                        </FormControl>

                        <FormControl margin="dense">
                            <InputLabel>Personalised Message</InputLabel>
                            <Input
                                onChange={(e) => {
                                    setShareModalData({
                                        ...shareModalData,
                                        message: e.target.value,
                                    });
                                }}
                                multiline
                                name="message"
                                type="text"
                            />
                            <FormHelperText>Please enter a personalised Message that you want to send to the patient (optional).</FormHelperText>
                        </FormControl>

                        <FormControl>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={!shareModalData.readOnly}
                                        onChange={() => {
                                            setShareModalData({
                                                ...shareModalData,
                                                readOnly: !shareModalData.readOnly,
                                            });
                                        }}
                                    />
                                }
                                label="Allow parent to complete the questionnaire"
                            />
                            <FormHelperText>
                                If this option is checked, patients can independently complete the questionnaire and the report would be sent to you.
                            </FormHelperText>
                        </FormControl>
                        <button className="button">S H A R E</button>
                    </form>
                </Fade>
            </Modal>
        );
    };



 // ========================================================================
    // Delete Modal Functions
    // ========================================================================
    const openDeleteConfirmation = () => setIsDeleteModalVisible(true);
    const closeDeleteConfirmation = () => setIsDeleteModalVisible(false);

    const deleteSelecctedQuestionnaire = () => {
        let questionnaireId = deleteQuestionnaireData.deleteQuestionnaireID
        const arrayCopy = customisedQuestionnaires.filter((q) => q.questionnaireId !== questionnaireId);
        setCustomisedQuestionnaires(arrayCopy);
        API.deleteQuestionnaire(questionnaireId, user.name);
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
        <div>
            {loading ? <Loading /> : null}
            {renderDeleteModal()}
            {renderShareModal()}

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
                canDelete={false}
                onClickDelete={deleteQuestionnaire}
                canShare={true}
                onClickShare={shareQuestionnaire}
                />
                {/* {standardisedQuestionnaireGenerator("SSQ-P", "SSQ for parents", "17/05/2020")}
                {standardisedQuestionnaireGenerator("SSQ-C", "SSQ for children ", "17/05/2020")} */}
            </div>

            <div className="CQ-header">
                <h1>My Questionnaires</h1>
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
                canDelete={true}
                onClickDelete={deleteQuestionnaire}
                canShare={true}
                onClickShare={shareQuestionnaire}
            />
        </div>
    );
};

export default ManageQuestionnaires;
