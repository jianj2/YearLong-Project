/**
 * ====================================================================
 * REACT COMPONENT FUNCTION
 * ====================================================================
 * @date created: 18th May 2020
 * @authors: Waqas Rehmani
 *
 * The LoginAdmin component defines the login form for the admin. This
 * will visible when the user selects the admin option at the
 * landing page.
 *
 * This file is used to display the login form.
 *
 */
import { Modal, Backdrop, Fade} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import {
    Input,
    FormControl,
    InputLabel,
    FormHelperText,
    InputAdornment,
    IconButton, 
} from "@material-ui/core";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useAuth0 } from "../utils/react-auth0-spa";

// Import styles.
import "../styles/admin.css";

export default function FormLoginAdmin({ adminLogin }) {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
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
    const classes = useStyles();

    const [ adminName, setAdminName] = useState("");
    const [ adminPsw, setAdminPsw] = useState("");
    const { register, handleSubmit, errors } = useForm();
    const [ showPassword, setShowPassword ] = useState(false);

    const onSubmit = () => {
        let data = {username:adminName, password:adminPsw}
        if(isAuthenticated){
            showConfirmation(data)
        } 
        else{
            adminLogin(data);
        }
        
        
    };
    
    const testdata = {username: "AdminUser1", password: "pw1234"}
    const [isPopupVisible, setisPopupVisible] = useState(false);

    const showConfirmation = ( ) => {
        setisPopupVisible(true);
        console.log();
    }

    const closeConfirmation = () =>{
        setisPopupVisible(false);
    }

    const confirmLogout=(data) => {
        logout();
        window.location.href = "/admin/"
        console.log(data)
        adminLogin(data);
        
    }

    const renderPopup = () => {
        return (
            <Modal
                open={isPopupVisible}
                onClose={closeConfirmation}
                closeAfterTransition
                className={classes.modal}
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={isPopupVisible}>
                    <div className = "share-modal-container">
                        <h3 className = "center-text">Login as Admin will automatically logout your clinician account. Would you like to continue?</h3>
                        <div className = "buttons-container">
                            <button className="button" id = "margin-button" onClick={confirmLogout} >
                                YES
                            </button>
                            <button className="button" id = "margin-button" onClick={closeConfirmation}>
                                NO
                            </button>
                        </div>
                    </div>
                </Fade>
            </Modal>
        );
    };

    const setUserName = (event) => {
        setAdminName(event.target.value)
    }
    const setPassword = (event) => {
        setAdminPsw(event.target.value)
    }
    return (
            <form onSubmit={handleSubmit(onSubmit)} className="admin-form">
                {renderPopup()}
                <FormControl margin="dense">
                    <InputLabel>Username</InputLabel>
                    <Input
                        name="username"
                        onChange = {setUserName}
                        placeholder="Write the admin username"
                        error={errors.username}
                        inputRef={register({
                            required: "You have not entered the username.",
                        })}
                    />
                    <FormHelperText>
                        {errors.username
                            ? errors.username.message
                            : "Please enter the admin username."}
                    </FormHelperText>
                </FormControl>

                <FormControl margin="dense">
                    <InputLabel>Password</InputLabel>
                    <Input
                        name="password"
                        onChange = {setPassword}
                        placeholder="Write the admin password"
                        error={errors.password}
                        inputRef={register({
                            required: "Please enter the admin password.",
                        })}
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    // onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? (
                                        <MdVisibility />
                                    ) : (
                                        <MdVisibilityOff />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <FormHelperText>
                        {errors.password
                            ? errors.password.message
                            : "Please enter the admin password."}
                    </FormHelperText>
                </FormControl>

                <br />

                <button className={errors.code ? "button-disabled" : "button"}>
                    E N T E R
                </button>
                {errors.code && <span>{errors.code.message}</span>}


            </form>
    );
}
