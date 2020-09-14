import React, {Component, useState} from 'react';
import {adminLogin, findPassword} from "../utils/api";

import logoComplete from "../assets/logo_complete.png";
import {
    Input,
    InputLabel,
    Button,
    FormControl,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from "@material-ui/core";
import {useForm} from "react-hook-form";

import "../styles/clinician.css"

const FindPassword = () => {
    const { register, handleSubmit, errors } = useForm();

    const [open, setOpen] = useState(false);

    const [email, setEmail] = useState();

    const findEmail = (email)=>{
        findPassword(email);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        // window.location.href = 'https://pediatric-scale.au.auth0.com/login/';
    };

        return (
            <div className="find-password">
                <div className="landing-logo">
                    <img src={logoComplete} />
                </div>

                <div className="landing-buttons">
                    <div className="find-password-form">
                        <FormControl margin="normal">
                            <InputLabel>Email</InputLabel>
                            <Input
                                name="email"
                                placeholder="Write the admin username"
                                onChange={(event)=>{setEmail(event.target.value)}}
                            />
                            <br />
                            <button
                                className={errors.code ? "button-disabled" : "button"}
                                onClick={() => {findEmail(email)}}>
                                E N T E R
                            </button>
                            {errors.code && <span>{errors.code.message}</span>}
                        </FormControl>
                    </div>
                </div>

                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Prompt"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Request sent successfully!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary" autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

export default FindPassword;