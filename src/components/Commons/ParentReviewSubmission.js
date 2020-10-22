// Import Libraries.
import React from "react";

/**
 * =============================================================================
 * REACT COMPONENT FUNCTION
 * =============================================================================
 * @date created: 17th May 2020
 * @authors:    Uvin Abeysinghe, Waqas Rehmani, Ashley Curtis,
 *              Mayank Sharma, Jian Jiao
 *
 * The ParentReviewSubmission component defines the component where the
 * information filled by the user is shown.
 *
 */

////////////////////////////////////////////////////////////////////////////////
////                            Define Component                            ////
////////////////////////////////////////////////////////////////////////////////
const ParentReviewSubmission = ({
    questionnaire,
    personalDetails,
    questionnaireData,
    commentData,
    emailResponse,
    isStandard,
    clinicianAccess,
}) => {
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
                    <span>{personalDetails.rightDeviceType === "Other" ? personalDetails.rightDeviceTypeOther : personalDetails.rightDeviceType}</span>
                </div>
                <div className="review-row">
                    <label>Left Device:</label>
                    <span>{personalDetails.leftDeviceType === "Other" ? personalDetails.leftDeviceTypeOther : personalDetails.leftDeviceType}</span>
                </div>
            </div>

            <h1>Your Responses</h1>
            <div className="review-questionnaire">
                {questionnaire.sections.map((section, sectionIndex) => (
                    <div key={sectionIndex}
                        className="review-questionnaire-section">
                        <h2>Section: {section.title}</h2>
                        {section.scenarios.map((scenario, scenarioIndex) => (
                            <div key={scenarioIndex}
                                className="review-questionnaire-scenario">
                                <p>{scenario.description}</p>
                                {scenario.questions.map((question, questionIndex) => (
                                    <div key={questionIndex}
                                        className="review-questionnaire-question">
                                        <p>{question.description}</p>
                                        <div>
                                            {!question.isMCQ ? (
                                                <div>
                                                    <div className="review-row">
                                                        <label>Slider
                                                            Value:</label>
                                                        <span>{questionnaireData[sectionIndex][scenarioIndex][questionIndex].value}</span>
                                                    </div>
                                                    <div className="review-row">
                                                        <label>Supplementary
                                                            Question:</label>
                                                        <span>{questionnaireData[sectionIndex][scenarioIndex][questionIndex].supplementaryValue}</span>
                                                    </div>
                                                </div>
                                            ) : (
                                                    <div>
                                                        <div className="review-row">
                                                            <label>Answer</label>
                                                            <span>{questionnaireData[sectionIndex][scenarioIndex][questionIndex].value}</span>
                                                        </div>
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                ))}
                                <div className="comment-review-container">
                                    <label>Comment</label>
                                    <br />
                                    <br />
                                    {commentData[sectionIndex][scenarioIndex]}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {/* BUTTONS - SEND (SORTED)REPORT TO EMAIL */}

            { clinicianAccess 
                ? (
                    <div className="dothetest-bottom-container">
                        <label>Email Report</label>
                        <button
                            className="button"
                            onClick={() => emailResponse("PERFORMANCE")}
                        >
                            Sorted by Performance
                        </button>
                        {isStandard
                            ? (
                                <button
                                    className="button"
                                    onClick={() => emailResponse("IMPORTANCE")}
                                >
                                    Sorted by Importance
                                </button>
                            ) : null
                        }
                    </div>

                ) : null
            }
            
        </div>
    );
}

export default ParentReviewSubmission;
