/**
 * ====================================================================
 * REACT COMPONENT FUNCTION
 * ====================================================================
 * @date created: 17th May 2020
 * @authors: Uvin Abeysinghe, Waqas Rehmani, Ashley Curtis, Mayank Sharma, Jian Jiao
 *
 * The Questionnaire component defines a collection of questions. These
 * will be visible when questionnaires are fillable.
 *
 */

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Slider } from "@material-ui/core";

import Question from "./Question";
import Loading from "./Loading";

import * as API from "../utils/api";

import "../styles/questionnaire.css";
import "../styles/main.css";

export default function Questionnaire({ questionnaire, submitQuestionnaire }) {
    const { register, handleSubmit, errors } = useForm();
    const [questionnaireResponse, setQuestionnaireResponse] = useState({});

    // useEffect(() => {
    //     console.log(
    //         "init questionnaireResponse in USEEFEFECT",
    //         questionnaireResponse
    //     );
    //     let temp = [...questionnaireResponse];
    //     console.log('temp before', temp)
    //     questionnaire.sections.forEach((element, index) => {
    //         temp[index] = [];
    //     });
    //     console.log("temp after", temp);

    //     setQuestionnaireResponse(temp);

        
    // }, [questionnaire]);

    useEffect(() => {
        console.log('questionnaireResponse in USEEFEFECT',questionnaireResponse);
    }, [questionnaireResponse])

    const onSubmit = (e) => {
        e.preventDefault();

        submitQuestionnaire(questionnaireResponse);
    };

    const onQuestionChange = (sectionIndex, questionIndex, data) => { 

        // var compiledResponse = [...questionnaireResponse];

        // if (!compiledResponse[sectionIndex]) {
        //     compiledResponse[sectionIndex] = [];
        //     console.log(
        //         "compiledResponse[sectionIndex] nahi hai bc",
        //         sectionIndex
        //     );
        // } 
        var compiledResponse = {
            ...questionnaireResponse,
            [sectionIndex]: {
                ...questionnaireResponse[sectionIndex],
                [questionIndex]: data,
            },
        };

        // compiledResponse[sectionIndex][questionIndex] = data; 
        setQuestionnaireResponse(compiledResponse);
    }


    return (
        <form onSubmit={onSubmit} className="questionaire-container">
            <h1>{questionnaire.title}</h1>
            {questionnaire.sections.map((section, sectionIndex) => (
                <div key={sectionIndex}>
                    <h2>{section.title}</h2>
                    {section.scenarios.map((scenario, scenarioIndex) => (
                        <div key={scenarioIndex}>
                            <p>{scenario.description}</p>
                            {scenario.questions.map(
                                (question, questionIndex) => (
                                    <Question
                                        error={true}
                                        key={questionIndex}
                                        questionIndex={questionIndex}
                                        description={question.description}
                                        isMCQ={question.isMCQ}
                                        mcqOptions={question.mcqOptions}
                                        rangeOptions={question.rangeOptions}
                                        onQuestionChange={onQuestionChange}
                                        sectionIndex={sectionIndex}
                                    />
                                )
                            )}

                            {/* <Question
                                error={true}
                                key={questionIndex}
                                questionIndex={questionIndex}
                                description={question.description}
                                isMCQ={question.isMCQ}
                                mcqOptions={question.mcqOptions}
                                rangeOptions={question.rangeOptions}
                                onQuestionChange={onQuestionChange}
                                sectionIndex={sectionIndex}
                            /> */}
                        </div>
                    ))}
                </div>
            ))}

            <div className="questionaire-submit-button">
                <button className={errors.code ? "button-disabled" : "button"}>
                    R E V I E W
                </button>
            </div>
        </form>
    );
    // }
}
