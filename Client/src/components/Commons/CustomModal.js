// Import Libraries.
import React, { useState, useEffect } from "react";
import { Modal, Backdrop, Fade } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

/**
 * =============================================================================
 * REACT COMPONENT CLASS
 * =============================================================================
 * @date created: 20th September 2020
 * @authors: Cary Jin
 *
 * The modal component defines a basic yet customisable modal where users
 * can confirm or cancel their actions
 *
 */

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

////////////////////////////////////////////////////////////////////////////////
////                            Define Component                            ////
////////////////////////////////////////////////////////////////////////////////
const CustomModal = ({
    message,
    onClickCancel,
    onClickConfirm,
    setIsModalVisible,
    isModalVisible
}) => {
    const classes = useStyles();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(isModalVisible);
    }, [isModalVisible]);

    return (
        <Modal
            open={isVisible}
            onClose={() => {
                setIsModalVisible(false);
            }}
            closeAfterTransition
            className={classes.modal}
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={isVisible}>
                <div className="share-modal-container">
                    <h3 className="center-text">{message}</h3>
                    <div className="buttons-container">
                        <button
                            className="button"
                            id="margin-button"
                            onClick={() => {
                                onClickConfirm();
                                setIsModalVisible(false);
                            }}
                        >
                            CONFIRM
                        </button>
                        <button
                            className="button"
                            id="margin-button"
                            onClick={() => {
                                onClickCancel();
                                setIsModalVisible(false);
                            }}
                        >
                            CANCEL
                        </button>
                    </div>
                </div>
            </Fade>
        </Modal>
    );
};

export default CustomModal;
