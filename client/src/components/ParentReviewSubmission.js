/**
 * ====================================================================
 * REACT COMPONENT FUNCTION
 * ====================================================================
 * @date created: 17th May 2020
 * @authors: Uvin Abeysinghe, Waqas Rehmani, Ashley Curtis, Mayank Sharma, Jian Jiao
 *
 * The ParentReviewSubmission component defines the component where the
 * information filled by the user is shown.
 *
 */

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Slider } from "@material-ui/core";

import Question from "./Question";
import Loading from "./Loading";

export default function ParentReviewSubmission({
    questionnaire,
    questionnaireResponse,
    personalDetails,
}) {
    console.log("questionnaire", questionnaire);
    console.log("questionnaireResponse", questionnaireResponse);
    console.log("personalDetails", personalDetails);
    return (
        <div className="review-submission">
            <h1>Personal Details</h1>
            <div className="review-personal-details">
                <div className="review-row">
                    <label>Name:</label>
                    <span>{personalDetails.name}</span>
                </div>
                <div className="review-row">
                    <label>Filled By:</label>
                    <span>{personalDetails.completedBy}</span>
                </div>
                <div className="review-row">
                    <label>Date of Birth:</label>
                    <span>{personalDetails.date}</span>
                </div>
                <div className="review-row">
                    <label>Right Device:</label>
                    <span>{personalDetails.rightDeviceType}</span>
                </div>
                <div className="review-row">
                    <label>Left Device:</label>
                    <span>{personalDetails.leftDeviceType}</span>
                </div>
            </div>

            <h1>Your Responses</h1>
            <div className="review-questionnaire">
                {questionnaire.sections.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                        <h2>{section.title}</h2>
                        {section.scenarios.map((scenario, scenarioIndex) => (
                            <div key={scenarioIndex}>
                                {scenario.questions.map(
                                    (question, questionIndex) => (
                                        <div>
                                            <p>{question.description}</p>

                                            {questionnaireResponse[
                                                sectionIndex
                                            ] &&
                                                questionnaireResponse[
                                                    sectionIndex
                                                ][scenarioIndex][
                                                    questionIndex
                                                ] && (
                                                    <div>
                                                        <div className="review-row">
                                                            <label>
                                                                Slider Value:
                                                            </label>
                                                            <span>
                                                                {
                                                                    questionnaireResponse[
                                                                        sectionIndex
                                                                    ][
                                                                        scenarioIndex
                                                                    ][
                                                                        questionIndex
                                                                    ]
                                                                        .sliderValue
                                                                }
                                                            </span>
                                                        </div>
                                                        <div className="review-row">
                                                            <label>
                                                                Supplementary
                                                                Question:
                                                            </label>
                                                            <span>
                                                                {
                                                                    questionnaireResponse[
                                                                        sectionIndex
                                                                    ][
                                                                        scenarioIndex
                                                                    ][
                                                                        questionIndex
                                                                    ]
                                                                        .extraQuestion
                                                                }
                                                            </span>
                                                        </div>
                                                        <div className="review-row">
                                                            <label>
                                                                Frequency :
                                                            </label>
                                                            <span>
                                                                {
                                                                    questionnaireResponse[
                                                                        sectionIndex
                                                                    ][
                                                                        scenarioIndex
                                                                    ][
                                                                        questionIndex
                                                                    ]
                                                                        .frequencyValue
                                                                }
                                                            </span>
                                                        </div>
                                                        <div className="review-row">
                                                            <label>
                                                                Importance:
                                                            </label>
                                                            <span>
                                                                {
                                                                    questionnaireResponse[
                                                                        sectionIndex
                                                                    ][
                                                                        scenarioIndex
                                                                    ][
                                                                        questionIndex
                                                                    ]
                                                                        .importanceValue
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                        </div>
                                    )
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {/* <div className="review-questionnaire">
                {questionnaire.sections.map((section, sectionIndex) => (
                    <div>
                        <h2>{section.title}</h2>
                        {section.questions.map((q, questionIndex) => (
                            <div>
                                <p>{q.description}</p>

                                {questionnaireResponse[sectionIndex] &&
                                    questionnaireResponse[sectionIndex][
                                        questionIndex
                                    ] && (
                                        <div>
                                            <div className="review-row">
                                                <label>Slider Value:</label>
                                                <span>
                                                    {
                                                        questionnaireResponse[
                                                            sectionIndex
                                                        ][questionIndex]
                                                            .sliderValue
                                                    }
                                                </span>
                                            </div>
                                            <div className="review-row">
                                                <label>
                                                    Supplementary Question:
                                                </label>
                                                <span>
                                                    {
                                                        questionnaireResponse[
                                                            sectionIndex
                                                        ][questionIndex]
                                                            .extraQuestion
                                                    }
                                                </span>
                                            </div>
                                            <div className="review-row">
                                                <label>Frequency :</label>
                                                <span>
                                                    {
                                                        questionnaireResponse[
                                                            sectionIndex
                                                        ][questionIndex]
                                                            .frequencyValue
                                                    }
                                                </span>
                                            </div>
                                            <div className="review-row">
                                                <label>Importance:</label>
                                                <span>
                                                    {
                                                        questionnaireResponse[
                                                            sectionIndex
                                                        ][questionIndex]
                                                            .importanceValue
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    )}
                            </div>
                        ))}
                    </div>
                ))}
            </div> */}
        </div>
    );
}
