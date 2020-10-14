import React, { Component, useState } from 'react';
import { adminLogin, findPassword } from "../utils/api";
import { useAuth0 } from "../utils/react-auth0-spa";
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
    DialogActions, FormHelperText
} from "@material-ui/core";
import { useForm } from "react-hook-form";


const FindPassword = () => {
    const { register, handleSubmit, errors } = useForm();
    const { loginWithRedirect } = useAuth0();
    const [open, setOpen] = useState(false);

    const [email, setEmail] = useState();

    const findEmail = (email) => {
        findPassword(email);
        // alert(email);
        setOpen(true);
    }

    const handleClose = async () => {
        setOpen(false);
        const domain = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_CLIENT : "http://localhost:3000";
        await loginWithRedirect({

            redirect_uri: `${domain}/clinician`,

        });

    };

    return (
        <div className="find-password">
            <div className="landing-logo">
                <img src={logoComplete} />
            </div>

            <div className="landing-buttons">
                <form className="find-password-form" onSubmit={handleSubmit(findEmail)}>
                    <FormControl margin="normal">
                        <InputLabel>Email</InputLabel>
                        <Input
                            name="email"
                            placeholder="Enter your email"
                            onChange={(event) => { setEmail(event.target.value) }}
                            type="email"
                            required
                        />
                        <FormHelperText>
                            {errors.email
                                ? errors.email
                                : "Please enter the registered email ."}
                        </FormHelperText>
                        <br />
                        <button
                            className={errors.code ? "button-disabled" : "button"}
                        >
                            S U B M I T
                            </button>
                        {errors.code && <span>{errors.code.message}</span>}
                    </FormControl>
                </form>
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