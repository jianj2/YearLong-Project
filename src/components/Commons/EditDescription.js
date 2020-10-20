// Import Libraries.
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
    Radio
} from "@material-ui/core";

/**
 * =============================================================================
 * REACT COMPONENT CLASS
 * =============================================================================
 * @date created: 14th May 2020
 * @authors: Jin Chen, Guang Yang
 *
 * The EditDescription component handles the rendering of edit questionnaire
 * description box for clinicians.
 *
 */


////////////////////////////////////////////////////////////////////////////////
////                            Define Component                            ////
////////////////////////////////////////////////////////////////////////////////
const EditDescription = ({
    questionnaire,
    handleQuestionnaireTitleChange,
    handleQuestionnaireDesChange,
    handleQuestionnaireTypeChange
}) => {
    return (
        <div className="edit-description">
            <h2>Edit Questionnaire</h2>
            <div className="edit-questionnaire-description-form">
                <FormControl margin="dense">
                    <InputLabel>Title</InputLabel>
                    <Input
                        name="username"
                        placeholder="Write the title."
                        value={questionnaire.title}
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
                        value={questionnaire.description}
                        defaultValue={questionnaire.description}
                        onChange={handleQuestionnaireDesChange}
                    />
                    <FormHelperText>
                        Write the description of the questionnaire
                    </FormHelperText>
                </FormControl>

                <FormControl component="fieldset">
                    <FormLabel component="legend">SSQ Type</FormLabel>
                    <RadioGroup
                        defaultValue={questionnaire.isSSQ_Ch ? "children" : "parents"}
                        aria-label="SSQtype"
                        name="customized-radios"
                        onChange={handleQuestionnaireTypeChange}
                    >
                        <FormControlLabel value="children" control={<Radio/>}
                                          label="Children"/>
                        <FormControlLabel value="parents" control={<Radio/>}
                                          label="Parents"/>
                    </RadioGroup>
                </FormControl>
            </div>
        </div>
    );
};

export default EditDescription;
