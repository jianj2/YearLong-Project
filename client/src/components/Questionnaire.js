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

export default function Questionnaire({
    questionnaire,
    submitQuestionnaire,
    questionnaireData,
    handleQuestionnaireChange,
}) {
    const { register, handleSubmit, errors } = useForm();
    const [questionnaireResponse, setQuestionnaireResponse] = useState({});
    // const [questionnaireData, setQuestionnaireData] = useState({
    //     extraQuestion: "",
    //     sliderValue: 0,
    //     frequencyValue: "",
    //     importanceValue: "",
    // })

    useEffect(() => {
        // var newQuestionnaireResponse = {};
        // questionnaire.sections.forEach((section, sectionIndex) => {
        //     section.scenarios.forEach((scenario, scenarioIndex) => {
        //         scenario.questions.forEach((question, questionIndex) => {
        //             newQuestionnaireResponse = {
        //                 ...newQuestionnaireResponse,
        //                 [sectionIndex]: {
        //                     ...newQuestionnaireResponse[sectionIndex],
        //                     [scenarioIndex]: {
        //                         ...newQuestionnaireResponse[sectionIndex][
        //                             scenarioIndex
        //                         ],
        //                         [questionIndex]: {
        //                             extraQuestion: "",
        //                             frequencyValue: "",
        //                             importanceValue: "",
        //                             sliderValue: 0,
        //                         },
        //                     },
        //                 },
        //             };
        //         });
        //     });
        // });
        // console.log('newQuestionnaireResponse', newQuestionnaireResponse);
        // questionnaireResponse;
    }, []);

    // useEffect(() => {

    //     console.log('questionnaireResponse in USEEFEFECT',questionnaireResponse);
    // }, [questionnaireResponse])

    const onSubmit = (e) => {
        e.preventDefault();

        submitQuestionnaire(questionnaireResponse);
    };

    const handleChange = () => {
        // handleQuestionnaireChange();
    };

    const onQuestionChange = (
        sectionIndex,
        scenarioIndex,
        questionIndex,
        data
    ) => {
        handleQuestionnaireChange(sectionIndex, scenarioIndex, questionIndex, data);
    };

    // const onQuestionChange = (
    //     sectionIndex,
    //     scenarioIndex,
    //     questionIndex,
    //     data
    // ) => {
    //     // var compiledResponse = [...questionnaireResponse];

    //     // if (!compiledResponse[sectionIndex]) {
    //     //     compiledResponse[sectionIndex] = [];
    //     //     console.log(
    //     //         "compiledResponse[sectionIndex] ",
    //     //         sectionIndex
    //     //     );
    //     // }
    //     var compiledResponse = {
    //         ...questionnaireResponse,
    //         [sectionIndex]: {
    //             ...questionnaireResponse[sectionIndex],
    //             [scenarioIndex]: {
    //                 ...questionnaireResponse[scenarioIndex],
    //                 [questionIndex]: data,
    //             },
    //         },
    //     };

    //     // compiledResponse[sectionIndex][questionIndex] = data;
    //     setQuestionnaireResponse(compiledResponse);
    // };

    console.log("questionnaireData in Questionnaire", questionnaireData);

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
                                        sectionIndex={sectionIndex}
                                        scenarioIndex={scenarioIndex}
                                        description={question.description}
                                        isMCQ={question.isMCQ}
                                        mcqOptions={question.mcqOptions}
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
