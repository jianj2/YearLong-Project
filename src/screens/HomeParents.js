// Import Libraries.
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
// Import Utilities.
import * as API from "../utils/API";
// Import Components.
import { FormParentDetails } from "../components/Forms";
import {
    Questionnaire,
    ParentReviewSubmission,
    Loading
} from "../components/Commons";
// Import assets.
import logoComplete from "../assets/logo_complete.png";

/**
 * =============================================================================
 * REACT SCREEN COMPONENT FUNCTION
 * =============================================================================
 * @date created: 10th May 2020
 * @authors: Waqas Rehmani, Cary Jin, SaiEr Ding, Uvin AbeySinghe.
 *
 *
 * The Home screen component defines our screen for the route
 * '/parents/*'. This will be the first screen parents will see
 * when they choose the Parents option.
 *
 * This file is used to display the Parents Home screen.
 *
 */

const INSTRUCTIONS_READ_ONLY =
    "Go to the next page to view the questions. These would be the questions asked to you by the clinician on the call.";

////////////////////////////////////////////////////////////////////////////////
////                            Define Component                            ////
////////////////////////////////////////////////////////////////////////////////
const HomeParents = ({ match }) => {
    const [wizardStep, setWizardStep] = useState(-2);
    const [questionnaire, setQuestionnaire] = useState({
        questionnaireId: "",
        title: "",
        description: "",
        sections: [],
        isStandard: true
    });
    const [clinicianEmail, setClinicianEmail] = useState("");
    const [sortBy, setSortBy] = useState("PERFORMANCE");

    const [personalDetails, setPersonalDetails] = useState({
        name: "",
        date: "",
        completedBy: "parent",
        rightDeviceType: "",
        leftDeviceType: ""
    });

    const [questionnaireData, setQuestionnaireData] = useState([]);
    const [commentData, setCommentData] = useState([]);
    const [readOnly, setReadOnly] = useState(false);
    const [loading, setLoading] = useState(false);

    const [instruction, setInstruction] = useState({
        title: "",
        content: ""
    });

    const getPersonalDetails = (data) => {
        setPersonalDetails(data);
    };

    const setQuestionnaireInstruction = async (isSSQ_ch) => {
        let instructionType;
        if (isSSQ_ch) {
            instructionType = "RC";
        } else {
            instructionType = "RP";
        }
        const [statusCode, res] = await API.getSpecificInstruction(instructionType);
        if (statusCode === 200) {
            setInstruction({
                title: res["title"],
                content: res["content"]
            });
        }
    };

    //////////// Share section update /////////////////////////////
    // get a list of the visible sections
    const getVisibleSections = (sections, visibilityInfoList) => {
        const filteredSections = sections.filter((section) => {
            const foundVisibilityInfo = visibilityInfoList.find(
                (visibilityInfo) => {
                    return visibilityInfo.title === section.title;
                }
            );
            if (foundVisibilityInfo !== undefined) {
                return foundVisibilityInfo.isVisible;
            } else {
                return null;
            }
        });
        return filteredSections;
    };

    // set the updates questionnaire sections.
    const updateSections = (questionnaire, sectionVisibility) => {
        if (sectionVisibility !== undefined) {
            questionnaire.sections = getVisibleSections(
                questionnaire.sections,
                sectionVisibility
            );
        }
    };

    //////////////////////////////////////////////////////////////

    // This is called when the component first mounts.
    useEffect(() => {
        // Server call to get the questionnaireId
        const getDetails = async () => {
            const [statusCode, shareResponse] = await API.getShareDetails(match.params.shareId);
            if (statusCode === 200) {
                // Server call to get the questionnaire.
                setSortBy(shareResponse.sortBy);
                setClinicianEmail(shareResponse.clinicianEmail);
                setReadOnly(shareResponse.readOnly);
                API.getQuestionnaireById(
                    shareResponse.questionnaireId
                ).then((res) => {
                    const [statusCode, data] = res;
                    // Define initial values for the Questionnaire
                    if (statusCode === 200) {
                        updateSections(data, shareResponse.shareSection);
                        let tempResponse = [];
                        let tempComments = [];
                        data.sections.forEach((section, sectionIndex) => {
                            tempResponse[sectionIndex] = [];
                            tempComments[sectionIndex] = [];
                            section.scenarios.forEach(
                                (scenario, scenarioIndex) => {
                                    tempResponse[sectionIndex][
                                        scenarioIndex
                                        ] = [];
                                    tempComments[sectionIndex][scenarioIndex] =
                                        "";
                                    scenario.questions.forEach(
                                        (question, questionIndex) => {
                                            tempResponse[sectionIndex][
                                                scenarioIndex
                                                ][questionIndex] = {
                                                value: "",
                                                supplementaryValue: ""
                                            };
                                        }
                                    );
                                }
                            );
                        });
                        // Updating the state using the initial data and the questionnaire
                        // retrieved from the server.
                        setCommentData(tempComments);
                        setQuestionnaireData(tempResponse);
                        setQuestionnaire(data);

                        setQuestionnaireInstruction(data.isSSQ_Ch);

                        setWizardStep(0);
                    } else {
                        setWizardStep(-1);
                    }
                });
            } else {
                setWizardStep(-1);
            }

        };
        getDetails();

    }, []);

    // Method called to update questionnaire data when a question is updated.
    const handleQuestionnaireChange = (
        sectionIndex,
        scenarioIndex,
        questionIndex,
        data
    ) => {
        let temp = [...questionnaireData];
        temp[sectionIndex][scenarioIndex][questionIndex] = data;
        setQuestionnaireData(temp);
    };
    // Method called to update comment data when a scenario comment is updated.
    const handleCommentChange = (sectionIndex, scenarioIndex, data) => {
        let temp = [...commentData];
        temp[sectionIndex][scenarioIndex] = data;
        setCommentData(temp);
    };

    // Method called to go to the next page in the wizard.
    const nextStep = () => {
        setWizardStep(wizardStep + 1);
    };
    // Method called to go to the preivious page in the wizard.
    const prevStep = () => {
        setWizardStep(wizardStep - 1);
    };
    const goToInstructions = () => {
        setWizardStep(0);
    };
    // Method called to go to the instructions page in the wizard.
    const submitDetails = () => {
        nextStep();
    };
    // Method called when we submit the questionnaire.
    const submitQuestionnaire = (data) => {
        nextStep();
    };

    const submitResponse = async () => {
        let data = {
            questionnaireData,
            comments: commentData,
            personalDetails,
            clinicianEmail: clinicianEmail,
            questionnaireId: questionnaire.questionnaireId,
            sortBy
        };

        setLoading(true);
        const [statusCode, response] = await API.sendQuestionnaireData(
            data,
            match.params.shareId
        );
        if (statusCode === 200) {
            setLoading(false);
            nextStep();
        } else {
            console.error(response);
        }
    };

    if (wizardStep === -2) {
        return (
            <div className="parents-home">
                <Loading/>
            </div>
        );
    }

    if (wizardStep === -1) {
        return (
            <div className="parents-home">
                <div className="subheader-container"></div>
                <div className="parents-container">
                    <h1 style={{ textAlign: "center" }}>
                        I N V A L I D &nbsp; L I N K
                    </h1>
                </div>
            </div>
        );
    }

    if (wizardStep === 0) {
        return (
            <div className="parents-home">
                <div className="subheader-container">
                    <button className="button" onClick={nextStep}>
                        N E X T
                    </button>
                </div>
                <div className="parents-container">
                    <h1>I N S T R U C T I O N S</h1>
                    {readOnly ? (
                        <p>{INSTRUCTIONS_READ_ONLY}</p>
                    ) : (
                        <div>
                            <h2>{instruction.title}</h2>
                            <p>{instruction.content}</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    if (wizardStep === 1) {
        // If it is read only, we skip this step
        if (readOnly) nextStep();
        return (
            <div className="parents-home">
                <div className="subheader-container">
                    <button
                        id="instructions"
                        className="button"
                        onClick={goToInstructions}
                    >
                        I N S T R U C T I O N S
                    </button>
                </div>

                <div className="parents-container">
                    <FormParentDetails
                        submitDetails={submitDetails}
                        clinicianAccess={false}
                        defaultValue={personalDetails}
                        getPersonalDetails={getPersonalDetails}
                        isSSQ_Ch={questionnaire.isSSQ_Ch}
                    />
                </div>
            </div>
        );
    }

    if (wizardStep === 2) {
        return (
            <div className="parents-home">
                <div className="subheader-container">
                    <button
                        id="instructions"
                        className="button"
                        onClick={goToInstructions}
                    >
                        I N S T R U C T I O N S
                    </button>
                    {readOnly ? null : (
                        <button id="back" className="button" onClick={prevStep}>
                            B A C K
                        </button>
                    )}
                </div>

                <div className="parents-container">
                    <Questionnaire
                        readOnly={readOnly}
                        questionnaire={questionnaire}
                        submitQuestionnaire={submitQuestionnaire}
                        questionnaireData={questionnaireData}
                        commentData={commentData}
                        handleCommentChange={handleCommentChange}
                        handleQuestionnaireChange={handleQuestionnaireChange}
                    />
                </div>
            </div>
        );
    }

    if (wizardStep === 3) {
        return (
            <div className="parents-home">
                {loading ? <Loading/> : null}
                <div className="subheader-container">
                    <button
                        id="instructions"
                        className="button"
                        onClick={goToInstructions}
                    >
                        I N S T R U C T I O N S
                    </button>
                    <button id="back" className="button" onClick={prevStep}>
                        B A C K
                    </button>
                    <button
                        id="submit"
                        className="button"
                        onClick={submitResponse}
                    >
                        S U B M I T
                    </button>
                </div>

                <div className="parents-container">
                    <ParentReviewSubmission
                        questionnaire={questionnaire}
                        personalDetails={personalDetails}
                        questionnaireData={questionnaireData}
                        commentData={commentData}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="landing">
            <div className="landing-logo">
                <img src={logoComplete}/>
            </div>

            <div className="form-completed">
                <h1>Questionnaire response sent to your clinician!</h1>
                <h2>Thank you!</h2>
            </div>
        </div>
    );
};

export default withRouter(HomeParents);
