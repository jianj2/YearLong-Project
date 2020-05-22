/**
 * ====================================================================
 * REACT COMPONENT FUNCTION
 * ====================================================================
 * @date created: 17th May 2020
 * @authors: Uvin Abeysinghe, Waqas Rehmani, Ashley Curtis, Mayank Sharma, Jian Jiao
 *
 * The Question component defines the question form for questionnaires. These
 * will be visible in questionnaires when the questionnaires are fillable.
 *
 */


import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    Slider,
    FormControl,
    FormLabel,
    FormControlLabel,
    Radio,
    RadioGroup,
    Checkbox,
    FormGroup,
    FormHelperText
} from '@material-ui/core';


import "../styles/questionnaire.css";
import '../styles/main.css'

export default function Question({ isMCQ, isParentFilling, rangeOptions, mcqOptions }) {
    const { register, handleSubmit, errors } = useForm();
    const [ extraQuestion, setExtraQuestion ] = useState('');


    const onSubmit = (data) => {
        console.log(data)
    }

    // If it is an MCQ question.
    if (isMCQ) {
        return(
            <form onSubmit={handleSubmit(onSubmit)} className="question-container">
                <p>
                    <h4>Question:</h4> This is an MCQ quesiton.
                </p>

                <RadioGroup name="gender1" onChange={() => {}}>
                    {
                        mcqOptions.map(item => <FormControlLabel value={item} control={<Radio />} label={item} />)
                    }
                </RadioGroup>


            </form>
        )
    //    If it is a rnage question.
    } else {
        return (
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="question-container"
            >
                <p>This is a Slider quesiton.</p>
                <Slider
                    defaultValue={2}
                    color="secondary"
                    step={0.1}
                    min={0}
                    max={10}
                    valueLabelDisplay="auto"
                />
                <div className="slider-labels">
                    <label>{rangeOptions[0]}</label>
                    <label>{rangeOptions[1]}</label>
                </div>

                <RadioGroup name="gender1" onChange={() => {}}>
                    {mcqOptions.map((item) => (
                        <FormControlLabel
                            value={item}
                            control={<Radio />}
                            label={item}
                        />
                    ))}
                </RadioGroup>

                <FormControl color="secondary" margin="dense">
                    <FormLabel component="legend">
                        Please select one of the options
                    </FormLabel>
                    <RadioGroup name="extra" value={extraQuestion}>
                        <FormControlLabel
                            value=""
                            control={
                                <Radio
                                    onClick={() => setExtraQuestion("Band")}
                                />
                            }
                            label="Band"
                        />
                        <FormControlLabel
                            value="Production House"
                            control={
                                <Radio
                                    onClick={() =>
                                        setExtraQuestion("Production House")
                                    }
                                />
                            }
                            label="Production House"
                        />
                        <FormControlLabel
                            value="Dance Crew"
                            control={
                                <Radio
                                    onClick={() =>
                                        setExtraQuestion("Dance Crew")
                                    }
                                />
                            }
                            label="Dance Crew"
                        />
                    </RadioGroup>
                    <FormHelperText>
                        {errors.collectiveKind
                            ? errors.collectiveKind.message
                            : "Please specify what kind of collective this is."}
                    </FormHelperText>
                </FormControl>

                <FormControl>
                    <FormLabel>Assign responsibility</FormLabel>
                    <FormGroup className="slider-checkboxes">
                        <FormControlLabel
                            control={<Checkbox name="gilad" />}
                            label="Would not hear it."
                        />
                        <FormControlLabel
                            control={<Checkbox name="jason" />}
                            label="Do not know."
                        />
                        <FormControlLabel
                            control={<Checkbox name="antoine" />}
                            label="Not applicable."
                        />
                    </FormGroup>
                    <FormHelperText>Be careful</FormHelperText>
                </FormControl>

                {isParentFilling ? <div>PArent filling</div> : null}
            </form>
        );
    }


}