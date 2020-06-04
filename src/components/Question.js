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
 */

import React, { useState, useEffect } from "react";

// Import Material-UI components.
import { Slider, FormControl, FormLabel, FormControlLabel, Radio, RadioGroup, Checkbox, FormGroup, FormHelperText } from "@material-ui/core";

// Import styles.
import "../styles/questionnaire.css";
import "../styles/main.css";

export default function Question({
    readOnly,
    questionIndex,
    sectionIndex,
    scenarioIndex,
    isMCQ,
    isParentFilling,
    rangeOptions,
    mcqOptions,
    description,
    onQuestionChange,
    data,
}) {
    const [extraQuestion, setExtraQuestion] = useState(data.extraQuestion);
    const [sliderValue, setSliderValue] = useState(data.sliderValue);
    const [frequencyValue, setFrequencyValue] = useState(data.frequencyValue);
    const [importanceValue, setImportanceValue] = useState(data.importanceValue);
    const [mcqValue, setMCQValue] = useState('');

    useEffect(() => {
        let quesionResponseData = {
            sliderValue,
            extraQuestion,
            frequencyValue,
            importanceValue,
        };
        onQuestionChange(sectionIndex, scenarioIndex, questionIndex, quesionResponseData);
    }, [sliderValue, extraQuestion, frequencyValue, importanceValue]);

    // If it is an MCQ question.
    if (isMCQ) {
        return (
            <div className="question-container">
                <FormControl color="secondary" margin="dense">
                    <p>{description}</p>
                    <RadioGroup name="frequency" value={mcqValue}>
                        {mcqOptions.map((answer, answerIndex) => (
                            <FormControlLabel value={answer} control={<Radio disabled={readOnly} onClick={() => setMCQValue(answer)} />} label={answer} />
                        ))}
                    </RadioGroup>
                </FormControl>
            </div>
        );
    } else {
        return (
            <div className="question-container">
                <p>{description}</p>
                <Slider
                    value={data.sliderValue}
                    color="secondary"
                    step={0.1}
                    onChange={(e, val) => setSliderValue(val)}
                    min={0}
                    max={10}
                    disabled={readOnly}
                    valueLabelDisplay="auto"
                    name="slider"
                />
                <div className="slider-labels">
                    <label>{rangeOptions[0]}</label>
                    <label className="slider-value">{data.sliderValue}</label>
                    <label>{rangeOptions[1]}</label>
                </div>

                <FormControl color="secondary" margin="dense">
                    <RadioGroup name="frequency" value={data.extraQuestion} className="slider-checkboxes">
                        <FormControlLabel
                            value="Would not hear it."
                            control={<Radio disabled={readOnly} onClick={() => setExtraQuestion("Would not hear it.")} />}
                            label="Would not hear it."
                        />
                        <FormControlLabel
                            value="Do not know."
                            control={<Radio disabled={readOnly} onClick={() => setExtraQuestion("Do not know.")} />}
                            label="Do not know."
                        />
                        <FormControlLabel
                            value="Not applicable."
                            control={<Radio disabled={readOnly} onClick={() => setExtraQuestion("Not applicable.")} />}
                            label="Not applicable."
                        />
                    </RadioGroup>
                </FormControl>
            </div>
        );
    }
}
