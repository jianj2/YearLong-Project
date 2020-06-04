/**
 * ====================================================================
 * REACT COMPONENT CLASS
 * ====================================================================
 * @date created: 14th May 2020
 * @authors: Jin Chen, Guang Yang
 *
 * The Sidebar component defines our SideBar for the application. This
 * will visible at the top of our application.
 *
 * This file is used to display the Sidebar component
 *
 */

import React, { useEffect, useState } from "react";
import { useAuth0 } from "../../utils/react-auth0-spa";

import * as API from "../../utils/api";
import QuestionnaireList from "../QuestionnaireList";
import Questionnaire from "../Questionnaire";
import ParentReviewSubmission from "../ParentReviewSubmission";
import FormParentDetails from "../FormParentDetails";

import "../../styles/clinicianDoTheTest.css";


// handles rendering of QuestionnaireContainer in the Clinician Page
const DoTheTestContainer = () => {
    const { loading, isAuthenticated, loginWithRedirect, user } = useAuth0();
    const [wizardStep, setWizardStep] = useState(-1);

    const [personalDetails, setPersonalDetails] = useState({});

    const [questionnaires, setQuestionnaires] = useState([]);
    const [questionnaireData, setQuestionnaireData] = useState([]);

    const [selectedQuestionnaire, setSelectedQuestionnaire] = useState({
        questionnaireId: "",
        title: "",
        description: "",
        sections: [],
        isStandard: false,
    });

    useEffect(() => {
        API.getClinicianQuestionnaires(user.name).then((res) => {
            console.log(res);
            setQuestionnaires(res);
        });
    }, []);

    // Method called to go to the next page in the wizard.
    const nextStep = () => {
        setWizardStep(wizardStep + 1);
    };
    // Method called to go to the preivious page in the wizard.
    const prevStep = () => {
        setWizardStep(wizardStep - 1);
    }; 
    // Method called to reset wizard.
    const resetStep = () => {
        setWizardStep(-1);
    }; 

    // Method called to go to the instructions page in the wizard.
    const submitDetails = (data) => {
        setPersonalDetails(data);
        console.log("details submitted", data);
        nextStep();
    };
    // Method called when we submit the questionnaire.
    const submitQuestionnaire = (data) => {
        nextStep();
        console.log("questionnaire submitted", data);
    };

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

    const onClickQuestion = (questionnaireId) => {
        console.log("questionnaire clicked", questionnaireId);
        setWizardStep(0);
        API.getQuestionnaire(questionnaireId).then((res) => {
            console.log(res);
            // Define initial values for the Questionnaire
            let tempResponse = [];
            res.sections.forEach((section, sectionIndex) => {
                tempResponse[sectionIndex] = [];
                section.scenarios.forEach((scenario, scenarioIndex) => {
                    tempResponse[sectionIndex][scenarioIndex] = [];
                    scenario.questions.forEach((question, questionIndex) => {
                        tempResponse[sectionIndex][scenarioIndex][
                            questionIndex
                        ] = {
                            extraQuestion: "",
                            sliderValue: 0,
                            frequencyValue: "",
                            importanceValue: "",
                        };
                    });
                });
            });
            // Updating the state using the initial data and the questionnaire
            // retrieved from the server.
            setQuestionnaireData(tempResponse);
            setSelectedQuestionnaire(res);
        });
    };

    const submitResponse = () => {
        let data = {
            questionnaireData,
            personalDetails,
        };
        console.log("RESPONSE: ", data);
        setWizardStep(3);
    };
    console.log("wizardStep", wizardStep);
    if (wizardStep === 0) {
        return (
            <div className="dothetest-container">
                <div className="dothetest-subheader-container">
                    <button className="button" onClick={prevStep}>
                        B A C K
                    </button>
                </div>

                <FormParentDetails
                    submitDetails={submitDetails}
                    clinicianAccess={true}
                />
            </div>
        );
    } else if (wizardStep === 1) {
        return (
            <div className="dothetest-container">
                <div className="dothetest-subheader-container">
                    <button className="button" onClick={prevStep}>
                        B A C K
                    </button>
                </div>

                <div className="dothetest-scrollable-container">
                    <Questionnaire
                        questionnaire={selectedQuestionnaire}
                        submitQuestionnaire={submitQuestionnaire}
                        questionnaireData={questionnaireData}
                        handleQuestionnaireChange={handleQuestionnaireChange}
                    />
                </div>
            </div>
        );
    } else if (wizardStep === 2) {
        return (
            <div className="dothetest-container">
                <div className="dothetest-subheader-container">
                    <button className="button" onClick={prevStep}>
                        B A C K
                    </button>
                    <button className="button" onClick={submitResponse}>
                        S U B M I T
                    </button>
                </div>

                <div className="dothetest-scrollable-container">
                    <ParentReviewSubmission
                        questionnaire={selectedQuestionnaire}
                        personalDetails={personalDetails}
                        questionnaireData={questionnaireData}
                    />
                </div>
            </div>
        );
    } else if (wizardStep === 3) {
        return (
            <div className="dothetest-container">
                <div className="dothetest-submit">
                    <h1>Questionnaire Responses Recorded!</h1>
                    <p>A report will be sent to your registered email address.</p>
                    <button className="button" onClick={resetStep}>
                        G O &nbsp; B A C K
                    </button>
                </div>
            </div>
        );
    } else {
        return (
            <div className="dothetest-container">
                <QuestionnaireList
                    questionnaires={questionnaires}
                    listTitle={"My Questionnaires"}
                    isSelectable={true}
                    onClickQuestion={onClickQuestion}
                    canEdit={false}
                    onClickEdit={() => {}}
                    canDelete={false}
                    onClickDelete={() => {}}
                />
            </div>
        );
    }
};

export default DoTheTestContainer;
