/**
 * ====================================================================
 * REACT COMPONENT CLASS
 * ====================================================================
 * @date created: 14th May 2020
 * @authors: Jin Chen, Guang Yang
 *
 * The Sidebar component defines our SideBar for the application. This
 * will visible at the top of our application.
 *
 * This file is used to display the Sidebar component
 *
 */

import React from "react";
import {
    Input,
    FormControl,
    InputLabel,
    FormHelperText,
    InputAdornment,
    IconButton,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
} from "@material-ui/core";



// handles rendering of TopContainer in the Clinician page
const EditDescription = (props, { Questionnaire }) => {
    // to modify the questionnaire title in real time.
    const handleQuestionnaireTitleChange = (event) => {
        props.handleQuestionnaireTitleChange(event);
    };
    // to modify the questionnaire description in real time.
    const handleQuestionnaireDescriptionChange = (event) => {
        props.handleQuestionnaireDesChange(event);
    };
    // to modify the questionnaire type change in real time
    const handleQuestionnaireTypeChange = (event) => {
        props.handleQuestionnaireTypeChange(event);
    };
    return (
        <div className="edit-description">
            <h2>Edit Questionnaire</h2>
            <div className="edit-questionnaire-description-form">
                <FormControl margin="dense">
                    <InputLabel>Title</InputLabel>
                    <Input
                        name="username"
                        placeholder="Write the title."
                        value={props.Questionnaire.title}
                        onChange={handleQuestionnaireTitleChange}
                    />
                    <FormHelperText>
                        Write the title of the questionnaire
                    </FormHelperText>
                </FormControl>
                <FormControl margin="dense">
                    <InputLabel>Description</InputLabel>
                    <Input
                        name="username"
                        placeholder="Write the description."
                        value={props.Questionnaire.description}
                        defaultValue={props.Questionnaire.description}
                        onChange={handleQuestionnaireDescriptionChange}
                    />
                    <FormHelperText>
                        Write the description of the questionnaire
                    </FormHelperText>
                </FormControl>

                <FormControl component="fieldset">
                <FormLabel component="legend">SSQ Type</FormLabel>
                <RadioGroup 
                    defaultValue={props.Questionnaire.isSSQ_Ch? "children":"parents"} 
                    aria-label="SSQtype" 
                    name="customized-radios"
                    onChange = {handleQuestionnaireTypeChange}
                >
                    <FormControlLabel value="children" control={<Radio />} label="Children" />
                    <FormControlLabel value="parents" control={<Radio />} label="Parents" />
                </RadioGroup>
                </FormControl>
            </div>
        </div>
    );
};

export default EditDescription;