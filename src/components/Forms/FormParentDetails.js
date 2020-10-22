// Import Libraries.
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import {
    Input,
    FormControl,
    InputLabel,
    FormHelperText,
    Select
} from "@material-ui/core";
// Import Utilities
import { deviceTypeOption, completedByRelationshipOptions } from '../../utils/helper'
import { Loading } from "../Commons";

/**
 * =============================================================================
 * REACT COMPONENT FUNCTION
 * =============================================================================
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

////////////////////////////////////////////////////////////////////////////////
////                            Define Component                            ////
////////////////////////////////////////////////////////////////////////////////
const FormParentDetails = ({
    submitDetails,
    clinicianAccess,
    defaultValue,
    getPersonalDetails,
    isSSQ_Ch,
    loading
}) => {
    const { register, handleSubmit, errors } = useForm();

    const [date, setDate] = useState(defaultValue.date);
    const [name, setName] = useState(defaultValue.name);
    const [rightDeviceType, setRightDeviceType] = useState(defaultValue.rightDeviceType);
    const [leftDeviceType, setLeftDeviceType] = useState(defaultValue.leftDeviceType);
    const [rightDeviceTypeOtherVisible, setRightDeviceTypeOtherVisible] = useState(null);
    const [leftDeviceTypeOtherVisible, setLeftDeviceTypeOtherVisible] = useState(null);
    const [rightDeviceTypeOther, setRightDeviceTypeOther] = useState(defaultValue.rightDeviceType);
    const [leftDeviceTypeOther, setLeftDeviceTypeOther] = useState(defaultValue.leftDeviceType);
    const [rightDeviceSubmit, setRightDeviceSubmit] = useState(null);
    const [leftDeviceSubmit, setLeftDeviceSubmit] = useState(null);
    const [completedByRelationshipSubmit, setCompletedByRelationshipSubmit] = useState(null);
    const [completedByRelationship, setCompletedByRelationship] = useState(defaultValue.completedByRelationship);
    const [completedByName, setCompletedByName] = useState(defaultValue.completedByName);
    const [completedByRelationshipOther, setCompletedByRelationshipOther] = useState(defaultValue.completedByRelationship);
    const [completedByRelationshipOtherVisible,setCompletedByRelationshipOtherVisible ] = useState(false);

    let personalData = {};

    useEffect(() => {
        if (completedByRelationship === "Other" || (completedByRelationshipOptions.indexOf(completedByRelationship) === -1) ) {
            setCompletedByRelationshipOtherVisible(true);
        } else {
            setCompletedByRelationshipOtherVisible(false);
        }

    }, [completedByRelationship]);

    useEffect(() => {
        if (rightDeviceType === "Other" || (deviceTypeOption.indexOf(rightDeviceType) === -1)) {
            setRightDeviceTypeOtherVisible(true);
        } else {
            setRightDeviceTypeOtherVisible(false);
        }

    }, [rightDeviceType, deviceTypeOption]);

    useEffect(() => {
        if (leftDeviceType === "Other" || (deviceTypeOption.indexOf(leftDeviceType) === -1)) {
            setLeftDeviceTypeOtherVisible(true);
        } else {
            setLeftDeviceTypeOtherVisible(false);
        }

    }, [leftDeviceType, deviceTypeOption]);

    useEffect(() => {

        let completedBy;
        if (clinicianAccess) {
            completedBy = "clinician";
        } else {
            completedBy = isSSQ_Ch ? "Child" : "Parent";
        }
        if (rightDeviceTypeOtherVisible) {
            setRightDeviceSubmit(rightDeviceTypeOther);
        } else {
            setRightDeviceSubmit(rightDeviceType);
        }
        if (leftDeviceTypeOtherVisible) {
            setLeftDeviceSubmit(leftDeviceTypeOther);
        } else {
            setLeftDeviceSubmit(leftDeviceType);
        }

        if (completedByRelationshipOtherVisible){
            setCompletedByRelationshipSubmit(completedByRelationshipOther)
        }else{
            setCompletedByRelationshipSubmit(completedByRelationship)
        }

        personalData = {
            name,
            date,
            rightDeviceType: rightDeviceSubmit,
            leftDeviceType: leftDeviceSubmit,
            completedBy,
            completedByRelationship: completedByRelationshipSubmit,
            completedByName: completedByName
        };

        getPersonalDetails(personalData);
    }, [name, date, rightDeviceType, leftDeviceType, rightDeviceTypeOther, leftDeviceTypeOther, completedByRelationshipOther, completedByRelationship, completedByName]);

    const handleButtonPress = () => {
        submitDetails(personalData);
    };

    const handleDateChange = (event) => {
        if (Date.parse("1900-01-01") > Date.parse(event.target.value) || moment().format("YYYY-MM-DD") < Date.parse(event.target.value)) {
            setDate("");
        }
    };

    if (loading){
        return <Loading/>
    }
    return (
        <form onSubmit={handleSubmit(handleButtonPress)}
              className="parents-detail-form" id="parents-detail-form">
            <div className="parents-detail-container">
                <div className="parents-detail-form-column">
                    <FormControl margin="dense">
                        <InputLabel>Child's Name</InputLabel>
                        <Input
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            name="name"
                            placeholder="Write the child's name"
                            error={errors.name !== undefined}
                            inputRef={register({
                                required: "You have not entered the name."
                            })}
                        />
                        <FormHelperText>{errors.name ? errors.name.message : "Please enter the child's name."}</FormHelperText>
                    </FormControl>


                    <FormControl margin="dense">
                        <InputLabel>Right Device Type</InputLabel>
                        <Select id="DeviceOne"
                                defaultValue=""
                                value={deviceTypeOption.indexOf(rightDeviceType) === -1 ? "Other" : rightDeviceType}
                                onChange={(event) => setRightDeviceType(event.target.value)}
                                name="rightDeviceType"
                                error={errors.rightDeviceType !== undefined}
                                native
                                inputRef={register({
                                    required: "You have not specified the device type."
                                })}>
                            <option value="" disabled></option>
                            <option value="None">None</option>
                            <option value="Hearing Aid">Hearing Aid</option>
                            <option value="Cochlear Implant">Cochlear Implant
                            </option>
                            <option value="Other">Other</option>
                        </Select>

                        <FormHelperText>{errors.rightDeviceType ? errors.rightDeviceType.message : "Please specify the device type."}</FormHelperText>
                    </FormControl>

                    {rightDeviceTypeOtherVisible ? (
                        <FormControl margin="dense">
                            <InputLabel>What sort of device
                                (right)?</InputLabel>
                            <Input
                                value={rightDeviceTypeOther}
                                onChange={(event) => setRightDeviceTypeOther(event.target.value)}
                                name="rightDeviceTypeOther"
                                placeholder="Other device type"
                                required
                                error={errors.name !== undefined}
                                inputRef={register({
                                    required: "You have not entered another device type."
                                })}
                            />
                            <FormHelperText>{errors.rightDeviceTypeOther ? errors.rightDeviceTypeOther.message : "Please enter the device type."}</FormHelperText>
                        </FormControl>
                    ) : (<div></div>)}

                    {isSSQ_Ch? (null) :(
                    <FormControl margin="dense">
                        <InputLabel>Completed by (Name)</InputLabel>
                        <Input
                            value={completedByName}
                            onChange={(event) => setCompletedByName(event.target.value)}
                            // defaultValue={defaultValue.name}
                            name="completedBy"
                            placeholder="Write the name of the person who completed this questionnaire."
                            error={errors.completedByName !== undefined}
                            inputRef={register({
                                required: "You have not entered the name."
                            })}
                        />
                        <FormHelperText>{errors.completedByName ? errors.completedByName.message : "Please enter the name of the person who completed this questionnaire."}</FormHelperText>
                    </FormControl>
                        )}
                </div>


                <div className="parents-detail-form-column">


                    <FormControl margin="dense">
                        <InputLabel>Child's Date of Birth</InputLabel>
                        <Input
                            value={date}
                            onChange={(event) => setDate(event.target.value)}
                            name="date"
                            type="date"
                            required
                            onBlur={handleDateChange}
                            inputProps={{
                                min: "1900-01-01",
                                max: moment().format("YYYY-MM-DD")
                            }}
                            error={errors.date !== undefined}
                            inputRef={register({
                                required: "You have not entered the date of birth."
                            })}
                        />
                        <FormHelperText>{errors.date ? errors.date.message : "Please enter the child's name."}</FormHelperText>
                    </FormControl>


                    <FormControl margin="dense">
                        <InputLabel>Left Device Type</InputLabel>
                        <Select
                            defaultValue=""
                            value={deviceTypeOption.indexOf(leftDeviceType) === -1 ? "Other" : leftDeviceType}
                            onChange={(event) => setLeftDeviceType(event.target.value)}
                            name="leftDeviceType"
                            error={errors.leftDeviceType !== undefined}

                            native
                            inputRef={register({
                                required: "You have not specified the device type."
                            })}
                        >
                            <option value="" disabled></option>
                            <option value="None">None</option>
                            <option value="Hearing Aid">Hearing Aid</option>
                            <option value="Cochlear Implant">Cochlear Implant
                            </option>
                            <option value="Other">Other</option>
                        </Select>

                        <FormHelperText>{errors.leftDeviceType ? errors.leftDeviceType.message : "Please specify the device type."}</FormHelperText>
                    </FormControl>

                    {leftDeviceTypeOtherVisible ? (
                        <FormControl margin="dense">
                            <InputLabel>What sort of device (left)?</InputLabel>
                            <Input
                                value={leftDeviceTypeOther}
                                onChange={(event) => setLeftDeviceTypeOther(event.target.value)}
                                name="leftDeviceTypeOther"
                                placeholder="Other device type"
                                required
                                error={errors.name !== undefined}
                                inputRef={register({
                                    required: "You have not entered another device type."
                                })}
                            />
                            <FormHelperText>{errors.leftDeviceTypeOther ? errors.leftDeviceTypeOther.message : "Please enter the device type."}</FormHelperText>
                        </FormControl>
                    ) : null}



                    {isSSQ_Ch ? (null) :(

                    <FormControl margin="dense">
                        <InputLabel>Completed by (Relationship)</InputLabel>
                        <Select
                            // defaultValue={defaultValue.leftDeviceType}
                            value={completedByRelationshipOptions.indexOf(completedByRelationship) === -1 ? "Other" : completedByRelationship}
                            onChange={(event) => setCompletedByRelationship(event.target.value)}
                            name="completedByTypeOption"
                            error={errors.completedByRelationship !== undefined}
                            // required
                            native
                            inputRef={register({
                                required: "You have not entered who completed the questionnaire."
                            })}
                        >
                            <option value="" disabled selected></option>
                            <option value="Mother">Mother</option>
                            <option value="Father">Father</option>
                            <option value="Guardian">Guardian</option>
                            <option value="Other">Other</option>
                        </Select>

                        <FormHelperText>{errors.completedByRelationship ? errors.completedByRelationship.message : "Please specify who completed the questionnaire."}</FormHelperText>
                    </FormControl>

                    )}

                    {completedByRelationshipOtherVisible && !isSSQ_Ch ? (
                        <FormControl margin="dense">
                            <InputLabel>Completed by (Relationship), please specify</InputLabel>
                            <Input
                                // defaultValue={defaultValue.date}
                                value={completedByRelationshipOther}
                                onChange={(event) => setCompletedByRelationshipOther(event.target.value)}
                                name="completedByRelationshipOther"
                                placeholder="e.g. Aunt, Uncle"
                                required
                                error={errors.completedByRelationshipOther !== undefined}
                                inputRef={register({
                                    required: "You have not entered who completed the questionnaire(relationship)."
                                })}
                            />
                            <FormHelperText>{errors.completedByRelationshipOther ? errors.completedByRelationshipOther.message : "Please specify who completed the questionnaire(relationship)."}</FormHelperText>
                        </FormControl>
                    ) : null}
                </div>
            </div>

            {clinicianAccess ? null : (
                <div className="parents-detail-form-submit-button">
                    <button id="next" className="button">
                        N E X T
                    </button>
                </div>
            )}
            {errors.code && <span>{errors.code.message}</span>}
        </form>
    );
};

export default FormParentDetails;
