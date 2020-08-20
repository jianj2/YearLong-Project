/**
 * ====================================================================
 * REACT COMPONENT FUNCTION
 * ====================================================================
 * @date created: 17th May 2020
 * @authors:    Uvin Abeysinghe, Waqas Rehmani, Ashley Curtis, 
 *              Mayank Sharma, Jian Jiao
 *
 * The Questionnaire component defines a collection of questions. These
 * will be visible when questionnaires are fillable.
 *
 */

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Slider } from "@material-ui/core";

// Import components.
import Question from "./Question";

// Import styles.
import "../styles/questionnaire.css";
import "../styles/main.css";



export default function Questionnaire({
    readOnly,
    questionnaire,
    submitQuestionnaire,
    questionnaireData,
    handleQuestionnaireChange,visibleSections,
}) {
    const { register, handleSubmit, errors } = useForm();


    // Method: Called when we submit the questionnaire
    const onSubmit = (e) => {
        e.preventDefault();
        submitQuestionnaire();
    };


    // Method: Called when we something in the questionnaire changes.
    const onQuestionChange = (
        sectionIndex,
        scenarioIndex,
        questionIndex,
        data
    ) => {
        handleQuestionnaireChange(sectionIndex, scenarioIndex, questionIndex, data);
    };

    console.log(questionnaire);


    const getVisibleSection = (sections, visibilityInfoList ) => {
        const filteredSections = sections.filter((section) => {
                const foundVisibilityInfo = visibilityInfoList.find((visibilityInfo) => {
                    return (visibilityInfo.title === section.title)
                });
                return foundVisibilityInfo.visible
            }
        );
        return filteredSections;
    }

    console.table(questionnaire.sections);
    console.table(visibleSections)
    let filteredSections = getVisibleSection(questionnaire.sections, visibleSections)
    console.table(filteredSections)


    return (
        <form onSubmit={onSubmit} className="questionaire-container">
            <h1>{questionnaire.title}</h1>

            {filteredSections.map((section, sectionIndex) => (


                <div key={sectionIndex} className="section-container">
                <h2>{section.title}</h2>
                {section.scenarios.map((scenario, scenarioIndex) => (
                    <div key={scenarioIndex} className="scenario-container">
                        <p>{scenario.description}</p>
                        {scenario.questions.map(
                            (question, questionIndex) => (
                                <Question
                                    readOnly={readOnly}
                                    error={true}
                                    key={questionIndex}
                                    questionIndex={questionIndex}
                                    sectionIndex={sectionIndex}
                                    scenarioIndex={scenarioIndex}
                                    description={question.description}
                                    isMCQ={question.isMCQ}
                                    MCQOptions={question.MCQOptions}
                                    rangeOptions={question.rangeOptions}
                                    onQuestionChange={onQuestionChange}
                                    data={
                                        questionnaireData[sectionIndex][
                                            scenarioIndex
                                            ][questionIndex]
                                    }
                                />
                            )
                        )}
                    </div>
                ))}
                </div>









                )






            )}

            <div className="questionaire-submit-button">
                {readOnly ? null : (
                    <button
                        id="review"
                        className={errors.code ? "button-disabled" : "button"}
                    >
                        R E V I E W
                    </button>
                )}
            </div>
        </form>
    );
    // }
}
