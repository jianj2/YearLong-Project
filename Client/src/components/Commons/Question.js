// Import Libraries.
import React, { useState, useEffect } from "react";
import {
    Slider,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    withStyles
} from "@material-ui/core";
// Import Utilities.
import { createMarks, romeNumber } from '../../utils/helper'

/**
 * =============================================================================
 * REACT COMPONENT FUNCTION
 * =============================================================================
 * @date created: 17th May 2020
 * @authors:    Uvin Abeysinghe, Waqas Rehmani, Ashley Curtis,
 *              Mayank Sharma, Jian Jiao
 *
 * The Question component defines the question form for questionnaires. These
 * will be visible in questionnaires when the questionnaires are fillable.
 *
 *
 * -----------------------------------------------------------------------------
 *                                  N O T E
 * -----------------------------------------------------------------------------
 *  -   Each question's answer has two values which are "value" and
 *      "supplementaryValue". This can be seen in the state. The idea behind the
 *      supplementaryValue is that the slider question always holds a
 *      supplementary MCQ question so in order to tackle that, I came up with
 *      this structure. ~ @waqas
 *
 */


// Create a new slider with a custom style.
const SliderWithTicks = withStyles({
    mark: {
        backgroundColor: "rgba(245, 0, 87, 0.7)",
        height: 12,
        width: 1.5,
        marginTop: -3,
        marginLeft: -1
    },
    markActive: {
        opacity: 1,
        backgroundColor: "rgba(255,255,255, 0.3)"
    },
    markLabelActive: {
        opacity: 1,
        color: "rgba(255,255,255, 0.3)"
    }
})(Slider);

const marks = createMarks();

////////////////////////////////////////////////////////////////////////////////
////                            Define Component                            ////
////////////////////////////////////////////////////////////////////////////////
const Question = ({
    readOnly,
    questionIndex,
    sectionIndex,
    scenarioIndex,
    isMCQ,
    rangeOptions,
    MCQOptions,
    description,
    onQuestionChange,
    data,
    isNotApplicable
}) => {
    
    if (data.value === "" && data.supplementaryValue === "") {
        data.value = undefined;
    }
    //change to data, in order to make the data reload to the page, when click the back button from the viewSubmission
    const [answered, setAnswered] = useState(data);

    useEffect(() => {
        onQuestionChange(sectionIndex, scenarioIndex, questionIndex, answered);
    }, [answered]);

    // if it becomes not applicable, disable the next mcq question.
    useEffect(() => {
        if (isNotApplicable === true && isMCQ) {
            setAnswered({ ...answered, value: "" });
            data.value = "";
        }
    }, [isNotApplicable]);

    // If it is an MCQ question.
    if (isMCQ) {
        return (
            <div
                className="question-container"
                style={(readOnly || isNotApplicable) ? {color:"#aaa"} : {}}
            >
                <FormControl color="secondary" margin="dense">
                    <p>{"("}{romeNumber[questionIndex]}{")"} {description}</p>
                    <RadioGroup name="frequency" value={data.value}>
                        {MCQOptions.map((item, index) => (
                            <FormControlLabel
                                key={index}
                                value={item}
                                control={
                                    <Radio
                                        disabled={readOnly || isNotApplicable}
                                        onClick={() => setAnswered(
                                            {
                                                ...answered,
                                                value: item
                                            })}/>
                                }
                                label={item}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            </div>
        );
    } else {
        return (
            <div className="question-container">
                <p>{description}</p>

                <div className="slider-labels">
                    <label>{rangeOptions[0]}</label> 
                    <label>{rangeOptions[1]}</label>
                </div>
                <SliderWithTicks
                    value={data.value}
                    color="secondary"
                    step={0.1}
                    onChange={(e, val) => {
                        setAnswered({
                            ...answered,
                            value: val,
                            supplementaryValue: ""
                        });
                    }
                    }
                    marks={marks}
                    min={0}
                    max={10}
                    disabled={readOnly}
                    valueLabelDisplay="auto"
                    name="slider"
                />
                <div className="slider-labels">
                    <label>Minimum</label>
                    <label
                        className="slider-value">{data.value === "" || data.value === undefined ? "??" : data.value}</label>
                    <label>Maximum</label>
                </div>
                <p>{"("}{romeNumber[questionIndex]}{")"}</p>
                <FormControl color="secondary" margin="dense">
                    <RadioGroup name="frequency" value={data.supplementaryValue}
                                className="slider-checkboxes">
                        <FormControlLabel
                            value="Would not hear it."
                            control={
                                <Radio
                                    disabled={readOnly}
                                    onClick={() => {
                                        setAnswered({
                                            ...answered,
                                            supplementaryValue: "Would not hear it.",
                                            value: ""
                                        });
                                    }
                                    }
                                />
                            }
                            label="Would not hear it."
                        />
                        <FormControlLabel
                            value="Do not know."
                            control={
                                <Radio
                                    disabled={readOnly}
                                    onClick={() => {
                                        setAnswered({
                                            ...answered,
                                            supplementaryValue: "Do not know.",
                                            value: ""
                                        });
                                    }
                                    }
                                />
                            }
                            label="Do not know."
                        />
                        <FormControlLabel
                            value="Not applicable."
                            control={
                                <Radio
                                    disabled={readOnly}
                                    onClick={() => {
                                        setAnswered({
                                            ...answered,
                                            supplementaryValue: "Not applicable.",
                                            value: ""
                                        });
                                    }
                                    }
                                />
                            }
                            label="Not applicable."
                        />
                    </RadioGroup>
                </FormControl>
            </div>
        );
    }
}

export default Question;