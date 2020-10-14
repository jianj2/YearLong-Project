/**
 * =============================================================================
 * REACT COMPONENT CLASS
 * =============================================================================
 * @date created: 15th August 2020
 * @authors: Jin Chen Guang Yang
 *
 *
 */

import React from "react";
import TextField from '@material-ui/core/TextField';
import { Modal, Backdrop, Fade } from "@material-ui/core";

import * as API from "../../utils/api";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Loading } from "../../components/Commons";

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
        content: "",
        type: instructionType
    });

    const getInstruction = async (instructionType) => {
        const [statusCode, instruction] = await API.getSpecificInstruction(instructionType); 
        if (statusCode === 200){
            setInstruction(instruction);
        }    
        
            
        
    }
    
    useEffect(()=>{getInstruction(instructionType)},[]);

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


    const saveInstruction = async (e) =>{
        setLoading(true);
      
        const [statusCode, ] = await API.updateInstruction(instructionType, {instruction});
            setLoading(false);
            if (statusCode === 200){
                setsaveSuccess(true);
                openSaveModal();
            }
            else{
                setsaveSuccess(false);
                openSaveModal();
            }
        
        

    }


    return (
        <div className="ssq-instructions-container">
            {renderSaveModal()}
    
            {loading ? <Loading /> : null}
            <div className = "Instruction-button-group">
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