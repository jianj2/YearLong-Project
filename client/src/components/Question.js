/**
 * ====================================================================
 * REACT COMPONENT FUNCTION
 * ====================================================================
 * @date created: 10th May 2020
 * @authors: Waqas Rehmani, Cary Jin, SaiEr Ding
 *
 * The LoginParent component defines the login form for the parents
 * and children. This will visible when the user selects the parents/
 * children option at the landing page.
 *
 * This file is used to display the login form.
 *
 */


import React from 'react';
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

    const onSubmit = (data) => {
        console.log(data)
    }

    if (isMCQ) {
        return(
            <form onSubmit={handleSubmit(onSubmit)} className="question-container">
                <p>
                    <h2>Question:</h2> This is an MCQ quesiton.
                </p>

                <RadioGroup name="gender1" onChange={() => {}}>
                    {
                        mcqOptions.map(item => <FormControlLabel value={item} control={<Radio />} label={item} />)
                    }
                </RadioGroup>


            </form>
        )
    } else {
        return (
            <form onSubmit={handleSubmit(onSubmit)} className="question-container">
                <p>
                    This is a Slider quesiton.
                </p>
                <Slider
                    defaultValue={2}
                    color='secondary'
                    step={0.1}
                    min={0}
                    max={10}
                    valueLabelDisplay="auto"
                />
                <div className='slider-labels'>
                    <label>{rangeOptions[0]}</label>
                    <label>{rangeOptions[1]}</label>
                </div>


                <FormControl  >
                    <FormLabel >Assign responsibility</FormLabel>
                    <FormGroup className='slider-checkboxes'>
                        <FormControlLabel
                            control={<Checkbox  name="gilad" />}
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

                {
                    isParentFilling
                    ? <div>PArent filling</div>
                    : null
                }


            </form>
        );
    }


}