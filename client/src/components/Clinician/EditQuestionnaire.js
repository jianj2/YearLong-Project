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

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
                            window.location.href = manage_questionnaire_url;
                        }}
                    >
                        Cancel
                    </button>

                    <button
                        id="edit-save-button"
                        className="button"
                        onClick={(event)=>{
                            event.preventDefault();
                            handleClickOpen()
                            }}
                    >
                        Save
                    </button>
                </div>

                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Save"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure to save this questionnaire?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Disagree
                        </Button>
                        <Button
                            onClick={() => {
                                handleClose();
                                API.editQuestionnaire(Questionnaire);
                                window.location.href = manage_questionnaire_url;
                            }}
                            color="primary"
                            autoFocus
                        >
                            Agree
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
