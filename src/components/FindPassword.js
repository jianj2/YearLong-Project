import React, {Component, useState} from 'react';
import {adminLogin, findPassword} from "../utils/api";

import logoComplete from "../assets/logo_complete.png";
import {Input, InputLabel} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {useForm} from "react-hook-form";
import FormControl from "@material-ui/core/FormControl";

import "../styles/clinician.css"

const FindPassword = () => {
    const { register, handleSubmit, errors } = useForm();

    const [email, setEmail] = useState();

    const findEmail = (email)=>{
        findPassword(email);
        alert(email);
    }
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
            </div>
        );
    }

export default FindPassword;