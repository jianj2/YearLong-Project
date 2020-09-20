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
import EditDescription from "./EditDescription";
import Loading from "../Loading";
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
                               addScenario,removeScenario,
                               handleQuestionnaireTitleChange,
                               handleQuestionnaireTypeChange,
                               handleQuestionnaireDesChange,
                               handleQuestionDesChange,
                               handleQuestionOptsChange,
                               handleSecTitleChange,
                               handleSceDesChange,
                               redirectURL
                           } ) => {

    const [saveDialogOpen, setSaveDialogOpen] = React.useState(false);
    
    const [cancelDialogOpen, setCancelDialogOpen] = React.useState(false);

    const {token } = useAuth0();

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

    const  handleSaveQuestionnaire = async() =>{
        handleSaveClose();
     
        if(manage_questionnaire_url === "/clinician"){
            await API.editQuestionnaire(token, Questionnaire);
        }else{
            await API.editStandardQuestionnaire(Questionnaire);
        }
        
    
        window.location.href = manage_questionnaire_url;
    }

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
                                handleSaveQuestionnaire();
                                
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
                    handleQuestionnaireTypeChange = {handleQuestionnaireTypeChange}
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
