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
import moment from "moment";
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

export default function FormParentDetails({ submitDetails, clinicianAccess, defaultValue, getPersonalDetails, isSSQ_Ch }) {
    const { register, handleSubmit, errors } = useForm();

    const [date, setDate] = useState(defaultValue.date);
    const [name, setName] = useState(defaultValue.name);
    const [rightDeviceType, setRightDeviceType] = useState(defaultValue.rightDeviceType);
    const [leftDeviceType, setLeftDeviceType] = useState(defaultValue.leftDeviceType);
    // const [completedBy, setCompletedBy] = useState(defaultValue.completedBy);

    let [rightDeviceTypeOtherVisible, setRightDeviceTypeOtherVisible] = useState(null);
    let [leftDeviceTypeOtherVisible, setLeftDeviceTypeOtherVisible] = useState(null);
    const [rightDeviceTypeOther, setRightDeviceTypeOther] = useState(defaultValue.rightDeviceTypeOther);
    const [leftDeviceTypeOther, setLeftDeviceTypeOther] = useState(defaultValue.leftDeviceTypeOther);
    let [rightDeviceSubmit, setRightDeviceSubmit] = useState("null");
    let [leftDeviceSubmit, setLeftDeviceSubmit] = useState(null);

    let personalData = {}
    useEffect(() =>{

        if (rightDeviceType === "Other"){
            rightDeviceTypeOtherVisible = true
            setRightDeviceTypeOtherVisible(true)
        }else{
            rightDeviceTypeOtherVisible = false
            setRightDeviceTypeOtherVisible(false)
        }

    },[rightDeviceType])

    useEffect(() =>{

        if (leftDeviceType === "Other"){
            leftDeviceTypeOtherVisible = true
            setLeftDeviceTypeOtherVisible(true)
        }else{
            leftDeviceTypeOtherVisible = false
            setLeftDeviceTypeOtherVisible(false)
        }

    },[leftDeviceType])

    useEffect(() => {

        let completedBy
        if (clinicianAccess){
            completedBy = "clinician"
        }else{
            completedBy = isSSQ_Ch ? "Child" : "Parent"
        }
        if (rightDeviceTypeOtherVisible){
            rightDeviceSubmit = rightDeviceTypeOther
            setRightDeviceSubmit(rightDeviceTypeOther)
        } else {
            rightDeviceSubmit = rightDeviceType
            setRightDeviceSubmit(rightDeviceType)
        }
        if (leftDeviceTypeOtherVisible){
            leftDeviceSubmit = leftDeviceTypeOther
            setLeftDeviceSubmit(leftDeviceTypeOther)
        } else {
            leftDeviceSubmit = leftDeviceType
            setLeftDeviceSubmit(leftDeviceType)
        }


        personalData = {
            name,
            date,
            rightDeviceType:rightDeviceSubmit,
            leftDeviceType:leftDeviceSubmit,
            completedBy
        }



        getPersonalDetails(personalData);
    }, [name,date,rightDeviceType,leftDeviceType, rightDeviceTypeOther, leftDeviceTypeOther])



    const handleButtonPress = () => {
        submitDetails(personalData);
    };

    const maxDate = new Date(new Date().getTime());

    const handleDateChange = (event) => {
        if ( Date.parse("1900-01-01") > Date.parse(event.target.value)  || moment().format("YYYY-MM-DD") < Date.parse(event.target.value)) {
            setDate("")
        }
    };

    return (
        <form onSubmit={handleSubmit(handleButtonPress)} className="parents-detail-form" id="parents-detail-form">
            <div className="parents-detail-container">
                <div className="parents-detail-form-column">
                    <FormControl margin="dense">
                        <InputLabel>Child's Name</InputLabel>
                        <Input
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            // defaultValue={defaultValue.name}
                            name="name"
                            placeholder="Write the child's name"
                            error={errors.name !== undefined}
                            inputRef={register({
                                required: "You have not entered the name.",
                            })}
                        />
                        <FormHelperText>{errors.name ? errors.name.message : "Please enter the child's name."}</FormHelperText>
                    </FormControl>

                    <FormControl margin="dense">
                        <InputLabel>Child's Date of Birth</InputLabel>
                        <Input
                            // defaultValue={defaultValue.date}
                            value={date}
                            onChange={(event) => setDate(event.target.value)}
                            name="date"
                            type="date"
                            required
                            onBlur={handleDateChange}
                            inputProps={{ min: "1900-01-01", max: moment().format("YYYY-MM-DD")  }}
                            error={errors.date !== undefined}
                            inputRef={register({
                                required: "You have not entered the date of birth.",
                            })}
                        />
                        <FormHelperText>{errors.date ? errors.date.message : "Please enter the child's name."}</FormHelperText>
                    </FormControl>

                    {/*    {clinicianAccess ? (*/}
                    {/*        <div></div>*/}
                    {/*    ) : (*/}
                    {/*        <FormControl margin="dense">*/}
                    {/*            <InputLabel>Completed By</InputLabel>*/}
                    {/*            <Select*/}
                    {/*                // defaultValue={defaultValue.completedBy}*/}
                    {/*                value={completedBy}*/}
                    {/*                onChange={(event) => setCompletedBy(event.target.value)}*/}
                    {/*                name="completedBy"*/}
                    {/*                error={errors.completedBy !== undefined}*/}
                    {/*                native*/}
                    {/*                inputRef={register({*/}
                    {/*                    required: "This is required.",*/}
                    {/*                })}*/}
                    {/*            >*/}
                    {/*                <option value="" disabled selected></option>*/}
                    {/*                <option value="parent">Parent</option>*/}
                    {/*                <option value="child">Child</option>*/}
                    {/*            </Select>*/}
                    {/*            <FormHelperText>{errors.completedBy ? errors.completedBy.message : "Please specify who is filling the form."}</FormHelperText>*/}
                    {/*        </FormControl>*/}
                    {/*    )}*/}
                </div>



                <div className="parents-detail-form-column">
                    <FormControl margin="dense">
                        <InputLabel>Right Device Type</InputLabel>
                        <Select id="DeviceOne"
                                value={rightDeviceType}
                                onChange={(event) => setRightDeviceType(event.target.value)}
                            // defaultValue={defaultValue.rightDeviceType}
                                name="rightDeviceType"
                                error={errors.rightDeviceType !== undefined}
                            // required
                                native
                                inputRef={register({
                                    required: "You have not specified the device type.",
                                })}>
                            <option value="" disabled selected></option>
                            <option value="None">None</option>
                            <option value="Hearing Aid">Hearing Aid</option>
                            <option value="Cochlear Implant">Cochlear Implant</option>
                            <option value="Other">Other</option>
                        </Select>

                        <FormHelperText>{errors.rightDeviceType ? errors.rightDeviceType.message : "Please specify the device type."}</FormHelperText>
                    </FormControl>

                    {rightDeviceTypeOtherVisible ? (
                        <FormControl margin="dense">
                        <InputLabel>What sort of device (right)?</InputLabel>
                        <Input
                            // defaultValue={defaultValue.date}
                            value={rightDeviceTypeOther}
                            onChange={(event) => setRightDeviceTypeOther(event.target.value)}
                            name="rightDeviceTypeOther"
                            placeholder="Other device type"
                            required
                            error={errors.name !== undefined}
                            inputRef={register({
                                required: "You have not entered another device type.",
                            })}
                        />
                        <FormHelperText>{errors.rightDeviceTypeOther ? errors.rightDeviceTypeOther.message : "Please enter the device type."}</FormHelperText>
                    </FormControl>
                    ): (null)}


                    <FormControl margin="dense">
                        <InputLabel>Left Device Type</InputLabel>
                        <Select
                            // defaultValue={defaultValue.leftDeviceType}
                            value={leftDeviceType}
                            onChange={(event) => setLeftDeviceType(event.target.value)}
                            name="leftDeviceType"
                            error={errors.leftDeviceType !== undefined}
                            // required
                            native
                            inputRef={register({
                                required: "You have not specified the device type.",
                            })}
                        >
                            <option value="" disabled selected></option>
                            <option value="None">None</option>
                            <option value="Hearing Aid">Hearing Aid</option>
                            <option value="Cochlear Implant">Cochlear Implant</option>
                            <option value="Other">Other</option>
                        </Select>

                        <FormHelperText>{errors.leftDeviceType ? errors.leftDeviceType.message : "Please specify the device type."}</FormHelperText>
                    </FormControl>

                    {leftDeviceTypeOtherVisible ? (
                        <FormControl margin="dense">
                        <InputLabel>What sort of device (left)?</InputLabel>
                        <Input
                            // defaultValue={defaultValue.date}
                            value={leftDeviceTypeOther}
                            onChange={(event) => setLeftDeviceTypeOther(event.target.value)}
                            name="leftDeviceTypeOther"
                            placeholder="Other device type"
                            required
                            error={errors.name !== undefined}
                            inputRef={register({
                                required: "You have not entered another device type.",
                            })}
                        />
                        <FormHelperText>{errors.leftDeviceTypeOther ? errors.leftDeviceTypeOther.message : "Please enter the device type."}</FormHelperText>
                    </FormControl>
                    ): (null)}

                    {/*{clinicianAccess ? (*/}
                    {/*    <div></div>*/}
                    {/*) : (*/}
                    {/*<div className="parents-detail-form-submit-button">*/}
                    {/*    <button id="next" className="button">*/}
                    {/*        N E X T*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                    {/*)}*/}
                </div>
            </div>

                {clinicianAccess ? (
                    <div></div>
                ) : (
                    <div className="parents-detail-form-submit-button">
                        <button id="next" className="button">
                            N E X T
                        </button>
                    </div>
                )}
            {errors.code && <span>{errors.code.message}</span>}
        </form>
    );
}
