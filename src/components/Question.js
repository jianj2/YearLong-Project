/**
 * ====================================================================
 * REACT COMPONENT FUNCTION
 * ====================================================================
 * @date created: 17th May 2020
 * @authors:    Uvin Abeysinghe, Waqas Rehmani, Ashley Curtis,
 *              Mayank Sharma, Jian Jiao
 *
 * The Question component defines the question form for questionnaires. These
 * will be visible in questionnaires when the questionnaires are fillable.
 * 
 * 
 * --------------------------------------------------------------------------------------------
 *                                          N O T E
 * --------------------------------------------------------------------------------------------
 *  -   Each question's answer has two values which are "value" and "supplementaryValue".
 *      This can be seen in the state. The idea behind the supplementaryValue is that 
 *      the slider question always holds a supplementary MCQ question so in order to tackle
 *      that, I came up with this structure. ~ @waqas
 * 
 */

import React, { useState, useEffect } from "react";

// Import Material-UI components.
import { Slider, FormControl, FormLabel, FormControlLabel, Radio, RadioGroup, Checkbox, FormGroup, FormHelperText, withStyles } from "@material-ui/core";

// Import styles.
import "../styles/questionnaire.css";
import "../styles/main.css";

// Create a new slider with a custom style.
const SliderWithTicks = withStyles({
    mark: {
        backgroundColor: "rgba(245, 0, 87, 0.7)",
        height: 12,
        width: 1.5,
        marginTop: -3,
        marginLeft:-1
    },
    markActive: {
        opacity: 1,
        backgroundColor: "rgba(255,255,255, 0.3)"
    },
    markLabelActive:{
        opacity: 1,
        color: "rgba(255,255,255, 0.3)"
    }
})(Slider);


// create marks on the slider.
const createMarks = function (){
    let mymarks = [
        {
            value: 0,
            label: '0',
        }, {
            value: 1,
            label: '1',
        },{
            value: 2,
            label: '2',
        },{
            value: 3,
            label: '3',
        },{
            value: 4,
            label: '4',
        },{
            value: 5,
            label: '5',
        },{
            value: 6,
            label: '6',
        },{
            value: 7,
            label: '7',
        },{
            value: 8,
            label: '8',
        },{
            value: 9,
            label: '9',
        },
        ,{
            value: 10,
            label: '10',
        },
    ];
    let i;
    for ( i = 0; i<=10; i+=0.1 ){
        if ( i % 1 != 0){
            let temp = {value: i, style:{color:'blue'}}
            mymarks.push(temp)
        }
    }
    return mymarks;
}

const marks = createMarks();



export default function Question({
    readOnly,
    questionIndex,
    sectionIndex,
    scenarioIndex,
    isMCQ,
    isParentFilling,
    rangeOptions,
    MCQOptions,
    description,
    onQuestionChange,
    data,
    isNotApplicable,
}) {

    const [extraQuestion, setExtraQuestion] = useState(data.extraQuestion);
    const [sliderValue, setSliderValue] = useState(data.sliderValue);
    const [frequencyValue, setFrequencyValue] = useState(data.frequencyValue);
    const [importanceValue, setImportanceValue] = useState(data.importanceValue);

    // const [answered, setAnswered] = useState({
    //     value: undefined,
    //     supplementaryValue: "",
    // });
    // revert number to rome number
    let romeNumber = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x']

    if(data.value === "" && data.supplementaryValue === ""){
        data.value = undefined;
    }
    //change to data, in order to make the data reload to the page, when click the back button from the viewSubmission
    const [answered, setAnswered] = useState(data);

    // useEffect(() => {
    //     let quesionResponseData = {
    //         sliderValue,
    //         extraQuestion,
    //         frequencyValue,
    //         importanceValue,
    //     };
    //     onQuestionChange(sectionIndex, scenarioIndex, questionIndex, quesionResponseData);
    // }, [sliderValue, extraQuestion, frequencyValue, importanceValue]);

    useEffect(() => {
        onQuestionChange(sectionIndex, scenarioIndex, questionIndex, answered);
    }, [answered]);

    // if it becomes not applicable, disable the next mcq question.
    useEffect(() => {
        if (isNotApplicable == true && isMCQ ){
            setAnswered({...answered, value: ""});
            data.value = "";
        }
    },[isNotApplicable])


// If it is an MCQ question.
    if (isMCQ) {
        return (
            <div className="question-container">
                <FormControl color="secondary" margin="dense">
                    <p>{'('}{romeNumber[questionIndex]}{')'} {description}</p>
                    <RadioGroup name="frequency" value={data.value}>
                        {MCQOptions.map((item, index) => (
                            <FormControlLabel
                                key={index}
                                value={item}
                                control={
                                    <Radio disabled={readOnly || isNotApplicable} onClick={() => setAnswered(
                                        {   
                                            ...answered, 
                                            value: item 
                                        })} />
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
                    <SliderWithTicks
                        value={data.value}
                        color="secondary"
                        step={0.1}
                        onChange={(e, val) => {
                            setAnswered({
                                ...answered,
                                value: val,
                                supplementaryValue: "",
                            })
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
                        <label>{rangeOptions[0]}</label>
                        <label className={data.value === "" || data.value === undefined? "slider-value-disappear":"slider-value-display"}>{ data.value }</label>
                        <label>{rangeOptions[1]}</label>
                    </div>
                    <p>{'('}{romeNumber[questionIndex]}{')'}</p>
                    <FormControl color="secondary" margin="dense">
                        <RadioGroup name="frequency" value={data.supplementaryValue} className="slider-checkboxes">
                            <FormControlLabel
                                value="Would not hear it."
                                control={
                                    <Radio
                                        disabled={readOnly}
                                        onClick={() =>{
                                            setAnswered({
                                                ...answered,
                                                supplementaryValue: "Would not hear it.",
                                                value:""
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
                                        onClick={() =>{
                                            setAnswered({
                                                ...answered,
                                                supplementaryValue: "Not applicable.",
                                                value:""
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
