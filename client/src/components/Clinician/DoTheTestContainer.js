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

import * as API from '../../utils/api'

// handles rendering of QuestionnaireContainer in the Clinician Page
const DoTheTestContainer = () => {

    useEffect(() => {
        // Server call to get the questionnaire.
        
        // API.getQuestionnaire(match.params.questionnaireId).then((res) => {
        //     // Define initial values for the Questionnaire
        //     let tempResponse = [];
        //     res.sections.forEach((section, sectionIndex) => {
        //         tempResponse[sectionIndex] = [];
        //         section.scenarios.forEach((scenario, scenarioIndex) => {
        //             tempResponse[sectionIndex][scenarioIndex] = [];
        //             scenario.questions.forEach((question, questionIndex) => {
        //                 tempResponse[sectionIndex][scenarioIndex][
        //                     questionIndex
        //                 ] = {
        //                     extraQuestion: "",
        //                     sliderValue: 0,
        //                     frequencyValue: "",
        //                     importanceValue: "",
        //                 };
        //             });
        //         });
        //     });
        //     // Updating the state using the initial data and the questionnaire
        //     // retrieved from the server.
        //     setQuestionnaireData(tempResponse);
        //     setQuestionnaire(res);
        // });
    }, []);


    const [wizardStep, setWizardStep] = useState(-1);

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
    const submitDetails = (data) => {
        // setPersonalDetails(data);
        nextStep();
    };
    // Method called when we submit the questionnaire.
    const submitQuestionnaire = (data) => {
        nextStep();
    };

    if (wizardStep === 0) {
        return (
            <div className="dothetest-container">
                asdasd
            </div>
        );
    } else if (wizardStep === 1) {
        return (
            <div className="dothetest-container">
                asdfsadf
            </div>
        );
    } else if (wizardStep === 2) {
        return (
            <div className="dothetest-container">
                asdf
            </div>
        );
    } else if (wizardStep === 3) {
        return (
            <div className="dothetest-container">
                asdf
            </div>
        );
    } else {
        return (
            <div className="dothetest-container">
                Questonnaire list
            </div>
        );
    }

};


export default DoTheTestContainer;