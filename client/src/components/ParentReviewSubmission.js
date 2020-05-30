/**
 * ====================================================================
 * REACT COMPONENT FUNCTION
 * ====================================================================
 * @date created: 17th May 2020
 * @authors:    Uvin Abeysinghe, Waqas Rehmani, Ashley Curtis, 
 *              Mayank Sharma, Jian Jiao
 *
 * The ParentReviewSubmission component defines the component where the
 * information filled by the user is shown.
 *
 */

import React, { useState, useEffect } from "react";

export default function ParentReviewSubmission({
    questionnaire,
    personalDetails,
    questionnaireData,
}) {
   
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
                                            <div>
                                                <div className="review-row">
                                                    <label>Slider Value:</label>
                                                    <span>
                                                        {
                                                            questionnaireData[sectionIndex][scenarioIndex][questionIndex].sliderValue
                                                        }
                                                    </span>
                                                </div>
                                                <div className="review-row">
                                                    <label>
                                                        Supplementary Question:
                                                    </label>
                                                    <span>
                                                        {
                                                            questionnaireData[sectionIndex][scenarioIndex][questionIndex].extraQuestion
                                                        }
                                                    </span>
                                                </div>
                                                <div className="review-row">
                                                    <label>Frequency :</label>
                                                    <span>
                                                        {
                                                            questionnaireData[sectionIndex][scenarioIndex][questionIndex].frequencyValue
                                                        }
                                                    </span>
                                                </div>
                                                <div className="review-row">
                                                    <label>Importance:</label>
                                                    <span>
                                                        {
                                                            questionnaireData[sectionIndex][scenarioIndex][questionIndex].importanceValue
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}