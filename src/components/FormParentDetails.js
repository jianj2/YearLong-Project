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
    Select,
    MenuItem,
    TextField,
} from "@material-ui/core";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

// Import styles.
// import "../styles/parents.css";

export default function FormParentDetails({ submitDetails }) {
    const { register, handleSubmit, errors } = useForm(); 

    const handleButtonPress = (data) => {
        console.log(data);
        submitDetails(data);
    };
 

    return (
        <form
            onSubmit={handleSubmit(handleButtonPress)}
            className="parents-detail-form"
        >
            <div className="parents-detail-form-column">
                <FormControl margin="dense">
                    <InputLabel>Child's Name</InputLabel>
                    <Input
                        name="name"
                        placeholder="Write the child's name"
                        error={errors.name !== undefined}
                        inputRef={register({
                            required: "You have not entered the name.",
                        })}
                    />
                    <FormHelperText>
                        {errors.name
                            ? errors.name.message
                            : "Please enter the child's name."}
                    </FormHelperText>
                </FormControl>

                <FormControl margin="dense">
                    <InputLabel>Child's Date of Birth</InputLabel>
                    <Input
                        name="date"
                        type="date"
                        required
                        error={errors.date !== undefined}
                        inputRef={register({
                            required: "You have not entered the date of birth.",
                        })}
                    />
                    <FormHelperText>
                        {errors.date
                            ? errors.date.message
                            : "Please enter the child's name."}
                    </FormHelperText>
                </FormControl>

                <FormControl margin="dense">
                    <InputLabel>Completed By</InputLabel>
                    <Select
                        name="completedBy"
                        error={errors.completedBy !== undefined}
                        native
                        inputRef={register({
                            required: "This is required.",
                        })}
                    >
                        <option value="" disabled selected></option>
                        <option value="parent">Parent</option>
                        <option value="child">Child</option>
                    </Select>
                    <FormHelperText>
                        {errors.completedBy
                            ? errors.completedBy.message
                            : "Please specify who is filling the form."}
                    </FormHelperText>
                </FormControl>
            </div>

            <div className="parents-detail-form-column">
                <FormControl margin="dense">
                    <InputLabel>Right Device Type</InputLabel>
                    <Select
                        name="rightDeviceType"
                        error={errors.rightDeviceType !== undefined}
                        // required
                        native
                        inputRef={register({
                            required: "You have not specified the device type.",
                        })}
                    >
                        <option value="" disabled selected></option>
                        <option value="deviceA">Device A</option>
                        <option value="deviceB">Device B</option>
                    </Select>
                    <FormHelperText>
                        {errors.rightDeviceType
                            ? errors.rightDeviceType.message
                            : "Please specify the device type."}
                    </FormHelperText>
                </FormControl>

                <FormControl margin="dense">
                    <InputLabel>Left Device Type</InputLabel>
                    <Select
                        name="leftDeviceType"
                        error={errors.leftDeviceType !== undefined}
                        // required
                        native
                        inputRef={register({
                            required: "You have not specified the device type.",
                        })}
                    >
                        <option value="" disabled selected></option>
                        <option value="deviceA">Device A</option>
                        <option value="deviceB">Device B</option>
                    </Select>
                    <FormHelperText>
                        {errors.leftDeviceType
                            ? errors.leftDeviceType.message
                            : "Please specify the device type."}
                    </FormHelperText>
                </FormControl>

                <div className="parents-detail-form-submit-button">
                    <button id="next" className="button">N E X T</button>
                </div>
            </div>

            {errors.code && <span>{errors.code.message}</span>}
        </form>
    );
}
