/**
 * ====================================================================
 * REACT COMPONENT CLASS
 * ====================================================================
 * @date created: 15th August 2020
 * @authors: Jin Chen Guang Yang
 *
 *
 */

import React from "react";
import TextField from '@material-ui/core/TextField';
import { Modal, Backdrop, Fade } from "@material-ui/core";
import "../../styles/admin.css";
import * as API from "../../utils/api";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
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

// handles rendering of SSQInstructionsContainer in the Admin Page
const SSQInstructionsContainer = ({instructionType}) => {
    const [loading, setLoading] = useState(false);
    const [saveSuccess, setsaveSuccess] = useState(false);
    const [isSaveModalVisible, setIsSaveModalVisible] = useState(false);
    const classes = useStyles();
    const [instruction, setInstruction] = useState({
        title: "",
        content: ""
    });




    const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);

    const getInstruction = (instructionType) => {
        API.getSpecificInstruction(instructionType).then((instruction) =>{
            setInstruction(instruction);

            });
        
    }

    
    useEffect(()=>{getInstruction(instructionType)},[]);

    // ========================================================================
    // Cancel Modal Functions
    // ========================================================================
    const openCancelConfirmation = () => setIsCancelModalVisible(true);
    const closeCancelConfirmation = () => setIsCancelModalVisible(false);

    const CancelInstruction = () => {
        //getInstruction();
        closeCancelConfirmation();
    }

    const renderCancelModal = () => {
        return (
            <Modal
                open={isCancelModalVisible}
                onClose={closeCancelConfirmation}
                closeAfterTransition
                className={classes.modal}
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={isCancelModalVisible}>
                    <div className = "share-modal-container">
                        <h3 class = "center-text">Are you sure you want to cancel the editing?</h3>
                        <div className = "buttons-container">
                            <button className="button" id = "margin-button" onClick={CancelInstruction} >
                                YES
                            </button>
                            <button className="button" id = "margin-button" onClick={closeCancelConfirmation}>
                                NO
                            </button>
                        </div>
                    </div>
                </Fade>
            </Modal>
        );
    };

    // ========================================================================
    // Save Success/Failed Modal Functions
    // ========================================================================
    const openSaveModal = () => setIsSaveModalVisible(true);
    const closeSaveModal = () => setIsSaveModalVisible(false);

    const renderSaveModal = () => {
        return (
            <Modal
                open={isSaveModalVisible}
                onClose={closeSaveModal}
                closeAfterTransition
                className={classes.modal}
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={isSaveModalVisible}>
                    <div className = "share-modal-container">
                        <h3 class = "center-text">{
                            saveSuccess? "Successfully edited!":"Fail to edit, please try again later."
                        }</h3>
                        <div className = "buttons-container">
                            <button className="button" id = "margin-button" onClick={closeSaveModal} >
                                OK
                            </button>
                        </div>
                    </div>
                </Fade>
            </Modal>
        );
    };


    const saveInstruction = (e) =>{
        setLoading(true);
        //TODO send collated instructions
        API.sendInstructions({}).then( res =>{
                setLoading(false);
                if (res.status === 200){
                    setsaveSuccess(true);
                    openSaveModal();
                }
                else{
                    setsaveSuccess(false);
                    openSaveModal();
                }
            }
        )

    }


    return (
        <div className="ssq-instructions-container">
            {renderSaveModal()}
            {renderCancelModal()}
            {loading ? <Loading /> : null}
            <div className = "Instruction-button-group">
                <button id="edit-cancel-button" className="button"
                        onClick = {()=> openCancelConfirmation()}>Cancel</button>
                <button id="edit-save-button" className="button"
                        onClick = {()=> saveInstruction()}>Save</button>
            </div>
            <h1>SSQ Instruction</h1>
            <h2>Instruction Title</h2>
            <TextField
                class = "Instruction-title"
                required
                id="filled-required"
                value = {instruction.title}
                variant="filled"
                onChange = {(e) => {
                    setInstruction({
                        ...instruction,
                        title: e.target.value,
                    });
                }}
            />
            <h2>Instruction Content</h2>
            <TextField
                class = "Instruction-contents"
                required
                id="filled-required"
                value = {instruction.content}
                onChange = {(e) => {
                    setInstruction({
                        ...instruction,
                        content: e.target.value,
                    });
                }}
                variant="filled"
                multiline = "true"
                multiline={true}
                rows = {20}
                rowsMax = {20}
            />
           
        </div>

    );
};


export default SSQInstructionsContainer;