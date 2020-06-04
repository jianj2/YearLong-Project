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

import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

// Import components.
import QuestionsContainer from "./QuestionsContainer";
import EditDescription from "./EditDescription";
import Loading from "../Loading";

import "../../styles/clinician.css";

import * as API from "../../utils/api";
import SectionsContainer from "./SectionsContainer";
// handles rendering of TopContainer in the Clinician page
const EditQuestionnaire = ({
                               Questionnaire,
                               removeQuestion,
                               changeToRangeQuestion,
                               changeToMCQQuestion,
                               addAnswerToMCQQuestion,
                               deleteAnswerFromMCQQuestion,
                               addQuestion,
                               addScenario,removeScenario,
                               handleQuestionnaireTitleChange,
                               handleQuestionnaireDesChange,
                               handleQuestionDesChange,
                               handleQuestionOptsChange,
                               handleSecTitleChange,
                               handleSceDesChange
                           } ) => {

    const [saveDialogOpen, setSaveDialogOpen] = React.useState(false);
    
    const [cancelDialogOpen, setCancelDialogOpen] = React.useState(false);

    const handleSaveOpen = () => {
        setSaveDialogOpen(true);
    };

    const handleSaveClose = () => {
        setSaveDialogOpen(false);
    };

    const handleCancelOpen = () => {
        setCancelDialogOpen(true);
    };

    
    const handleCancelClose = () => {
        setCancelDialogOpen(false);
    };


    var manage_questionnaire_url = "/clinician";

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
                            handleCancelOpen();
                            
                        }}
                    >
                        Cancel
                    </button>

                    <button
                        id="edit-save-button"
                        className="button"
                        onClick={(event)=>{
                            event.preventDefault();
                            handleSaveOpen();
                            }}
                    >
                        Save
                    </button>
                </div>

                <Dialog
                    open={saveDialogOpen}
                    onClose={handleSaveClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Save"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to save this questionnaire?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button
                            onClick={() => {
                                handleSaveClose();
                                API.editQuestionnaire(Questionnaire);
                                window.location.href = manage_questionnaire_url;
                            }}
                            color="primary"
                            autoFocus
                        >
                            Yes
                        </Button>
                        <Button onClick={handleSaveClose} color="primary">
                            No
                        </Button>
                        
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={cancelDialogOpen}
                    onClose={handleCancelClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Save"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Your changes will not be saved. Are you sure you want to cancel editing this questionnaire? 
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button
                            onClick={() => {
                                handleCancelClose();
                                window.location.href = manage_questionnaire_url;
                               
                            }}
                            color="primary"
                            autoFocus
                        >
                            Yes
                        </Button>
                        <Button onClick={handleCancelClose} color="primary">
                            No
                        </Button>
                        
                    </DialogActions>
                </Dialog>

                <EditDescription
                    Questionnaire={Questionnaire}
                    handleQuestionnaireTitleChange={
                        handleQuestionnaireTitleChange
                    }
                    handleQuestionnaireDesChange={handleQuestionnaireDesChange}
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
                    handleSceDesChange={handleSceDesChange}/>
            </div>
        );
    }
};

export default EditQuestionnaire;
