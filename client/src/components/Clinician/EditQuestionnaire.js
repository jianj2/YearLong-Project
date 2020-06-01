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
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// Import components.
import QuestionsContainer from "./QuestionsContainer";
import EditDescription from "./EditDescription";

import "../../styles/clinician.css"

import * as API from "../../utils/api";
// handles rendering of TopContainer in the Clinician page
const EditQuestionnaire = (props) => {
    const {Questionnaire,removeQuestion,changeToRangeQuestion,
        changeToMCQQuestion,addAnswerToMCQQuestion,deleteAnswerToMCQQuestion,addQuestion,
        handleQuestionnaireTitleChange,handleQuestionnaireDesChange,handleMultiAnsChange,
        handleMultiChoiceDesChange} = props;

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    var manage_questionnaire_url = "/clinician"

    return (
        <div className="edit-questionnaire">


            {/*<button style={{width:'12%',marginLeft:'10px', marginRight:'80px'}}*/}
            {/*        onClick = {(event)=> {event.preventDefault(); window.location.href = manage_questionnaire_url}}>CANCEL</button>*/}
            {/*<button style={{width:'12%',marginRight:'10px'}}*/}
            {/*        onClick = {(event)=> {*/}
            {/*            event.preventDefault();*/}
            {/*            API.editQuestionnaire(Questionnaire);*/}
            {/*            // window.location.href = manage_questionnaire_url;*/}
            {/*        }}> SAVE </button>*/}

            <Button variant="outlined" color="primary"
                    style={{width:'12%',marginLeft:'10px', marginRight:'80px'}}
                    onClick={(event)=>{event.preventDefault();window.location.href = manage_questionnaire_url}}>
                Cancel
            </Button>

            <Button variant="outlined" color="primary"
                    style={{width:'12%',marginLeft:'10px', marginRight:'80px'}}
                    onClick={handleClickOpen}>
                Save
            </Button>

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
                    <Button onClick={() => {
                        handleClose();
                        API.editQuestionnaire(Questionnaire);
                        window.location.href = manage_questionnaire_url;
                    }} color="primary" autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>

            <EditDescription Questionnaire={Questionnaire}
                             handleQuestionnaireTitleChange={handleQuestionnaireTitleChange}
                             handleQuestionnaireDesChange={handleQuestionnaireDesChange}/>

            <QuestionsContainer questionnaire={Questionnaire} removeQuestion={removeQuestion}
                                changeToRangeQuestion={changeToRangeQuestion} changeToMCQQuestion={changeToMCQQuestion}
                                addAnswerToMCQQuestion={addAnswerToMCQQuestion} deleteAnswerToMCQQuestion={deleteAnswerToMCQQuestion}
                                handleMultiChoiceDesChange={handleMultiChoiceDesChange} handleMultiAnsChange={handleMultiAnsChange} />

            <button onClick={(event)=>{event.preventDefault(); return addQuestion()}}> ADD NEW QUESTION </button>
        </div>
    );
};


export default EditQuestionnaire;
