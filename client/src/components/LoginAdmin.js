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

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
    Input,
    FormControl,
    InputLabel,
    FormHelperText,
    InputAdornment,
    IconButton, 
} from "@material-ui/core";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

// Import styles.
import "../styles/admin.css";

export default function LoginAdmin({ adminLogin }) {
    const { register, handleSubmit, errors } = useForm();
    const [ showPassword, setShowPassword ] = useState(false);

    const onSubmit = (data) => {
        console.log(data);

        adminLogin(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="parents-admin">
            <FormControl margin="dense">
                <InputLabel>Username</InputLabel>
                <Input
                    name="username"
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
