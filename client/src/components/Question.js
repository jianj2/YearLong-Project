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

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
    Slider,
    FormControl,
    FormLabel,
    FormControlLabel,
    Radio,
    RadioGroup,
    Checkbox,
    FormGroup,
    FormHelperText,
} from "@material-ui/core";

import "../styles/questionnaire.css";
import "../styles/main.css";

export default function Question({
    questionIndex,
    sectionIndex,
    isMCQ,
    isParentFilling,
    rangeOptions,
    mcqOptions,
    description,
    onQuestionChange,
}) {
    // const { register, handleSubmit, errors } = useForm();
    const [extraQuestion, setExtraQuestion] = useState("");
    const [sliderValue, setSliderValue] = useState(0);
    const [frequencyValue, setFrequencyValue] = useState("");
    const [importanceValue, setImportanceValue] = useState("");

    useEffect(() => {
        let quesionResponseData = {
            sliderValue,
            extraQuestion,
            frequencyValue,
            importanceValue,
        };
        onQuestionChange(sectionIndex, questionIndex, quesionResponseData);
    }, [sliderValue, extraQuestion, frequencyValue, importanceValue]);

    const onSubmit = (data) => {
        console.log(data);
    };
 

    // If it is an MCQ question.
    // if (isMCQ) {
    //     return (
    //         <form
    //             onSubmit={handleSubmit(onSubmit)}
    //             className="question-container"
    //         >
    //             <p>
    //                 <b>Question:</b> This is an MCQ quesiton.
    //             </p>

    //             <RadioGroup name="gender1" onChange={() => {}}>
    //                 {mcqOptions.map((item) => (
    //                     <FormControlLabel
    //                         value={item}
    //                         control={<Radio />}
    //                         label={item}
    //                     />
    //                 ))}
    //             </RadioGroup>
    //         </form>
    //     );
    // } else {
    return (
        <div className="question-container">
            <p>{description}</p>
            <Slider
                value={sliderValue}
                color="secondary"
                step={0.1}
                onChange={(e, val) => setSliderValue(val)}
                min={0}
                max={10}
                valueLabelDisplay="auto"
                name="slider"
            />
            <div className="slider-labels">
                <label>{rangeOptions[0]}</label>
                <label className="slider-value">{sliderValue}</label>
                <label>{rangeOptions[1]}</label>
            </div>

            <FormControl color="secondary" margin="dense">
                <RadioGroup
                    name="frequency"
                    value={extraQuestion}
                    className="slider-checkboxes" 
                >
                    <FormControlLabel
                        value="Would not hear it."
                        control={
                            <Radio
                                onClick={() =>
                                    setExtraQuestion("Would not hear it.")
                                }
                            />
                        }
                        label="Would not hear it."
                    />
                    <FormControlLabel
                        value="Do not know."
                        control={
                            <Radio
                                onClick={() => setExtraQuestion("Do not know.")}
                            />
                        }
                        label="Do not know."
                    />
                    <FormControlLabel
                        value="Not applicable."
                        control={
                            <Radio
                                onClick={() =>
                                    setExtraQuestion("Not applicable.")
                                }
                            />
                        }
                        label="Not applicable."
                    />
                </RadioGroup>
            </FormControl>

            <div className="subquestion-container">
                <FormControl color="secondary" margin="dense">
                    <p >
                        How often does this type of situation occur for your
                        child, in which he/she is trying tofollow someone
                        speaking from this distance?
                    </p>
                    <RadioGroup
                        name="frequency"
                        value={frequencyValue} 
                    >
                        <FormControlLabel
                            value="Very often (4 or more times in a week)."
                            control={
                                <Radio
                                    onClick={() =>
                                        setFrequencyValue(
                                            "Very often (4 or more times in a week)."
                                        )
                                    }
                                />
                            }
                            label="Very often (4 or more times in a week)."
                        />

                        <FormControlLabel
                            value="Often (1 to 3 times in a week)."
                            control={
                                <Radio
                                    onClick={() =>
                                        setFrequencyValue(
                                            "Often (1 to 3 times in a week)."
                                        )
                                    }
                                />
                            }
                            label="Often (1 to 3 times in a week)."
                        />
                        <FormControlLabel
                            value="Not often (1 to 2 times in a month)."
                            control={
                                <Radio
                                    onClick={() =>
                                        setFrequencyValue(
                                            "Not often (1 to 2 times in a month)."
                                        )
                                    }
                                />
                            }
                            label="Not often (1 to 2 times in a month)."
                        />
                    </RadioGroup>
                </FormControl>
            </div>

            <div className="subquestion-container">
                <FormControl color="secondary" margin="dense">
                    <p >
                        How important do you think it is for your child to have,
                        or to develop, the listening skillsrequired in this type
                        of situation?
                    </p>
                    <RadioGroup
                        name="importance"
                        value={importanceValue} 
                    >
                        <FormControlLabel
                            value="Very important."
                            control={
                                <Radio
                                    onClick={() =>
                                        setImportanceValue("Very important.")
                                    }
                                />
                            }
                            label="Very important."
                        />
                        <FormControlLabel
                            value="Important."
                            control={
                                <Radio
                                    onClick={() =>
                                        setImportanceValue("Important.")
                                    }
                                />
                            }
                            label="Important."
                        />
                        <FormControlLabel
                            value="Only a little bit important."
                            control={
                                <Radio
                                    onClick={() =>
                                        setImportanceValue(
                                            "Only a little bit important."
                                        )
                                    }
                                />
                            }
                            label="Only a little bit important."
                        />
                        <FormControlLabel
                            value="Not important."
                            control={
                                <Radio
                                    onClick={() =>
                                        setImportanceValue("Not important.")
                                    }
                                />
                            }
                            label="Not important."
                        />
                    </RadioGroup>
                </FormControl>
            </div>
        </div>
    );
    // }
}
