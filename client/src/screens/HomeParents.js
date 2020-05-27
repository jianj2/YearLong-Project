/**
 * ====================================================================
 * REACT SCREEN COMPONENT FUNCTION
 * ====================================================================
 * @date created: 10th May 2020
 * @authors: Waqas Rehmani, Cary Jin, SaiEr Ding
 *
 * The Home screen component defines our screen for the route
 * '/parents'. This will be the first screen parents will see
 * when they choose the Parents option.
 *
 * This file is used to display the Parents Home screen.
 *
 */

import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";

// Import components.
import FormParentDetails from "../components/FormParentDetails";
import Questionnaire from "../components/Questionnaire";
import ParentReviewSubmission from "../components/ParentReviewSubmission";

// Import assets.
import logoComplete from "../assets/logo_complete.png";

// Import utils
import * as API from "../utils/api";

// Import styles.
import "../styles/parents.css";
import "../styles/landing.css";
import "../styles/main.css";

// ---------------------------------------------------------------
// This method defines the elements for this component.
// ---------------------------------------------------------------
const HomeParents = ({ match }) => { 

    const [wizardStep, setWizardStep] = useState(2);
    const [questionnaire, setQuestionnaire] = useState({
        questionnaireId: "",
        title: "",
        description: "",
        sections: [],
        isStandard: true,
    });

    // const [questionnaire, setQuestionnaire] = useState({});
    const [clinicianEmail, setClinicianEmail] = useState("");
    const [personalDetails, setPersonalDetails] = useState({});
    const [questionnaireResponse, setQuestionnaireResponse] = useState(null);
    const [questionnaireData, setQuestionnaireData] = useState([]);

    // This is called when the component first mounts.
    useEffect(() => {
        // Do server call here to initialize everything.

        API.getQuestionnaire(match.params.questionnaireId).then((res) => {
            console.log("response from server", res);
            console.log("set Questionnaire", res);
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
            console.log("tempResponse", tempResponse);
            setQuestionnaireData(tempResponse);

            setQuestionnaire(res);

        });
    }, []);

    

    useEffect(() => {
        console.log("questionnaireData changed in homeparents", questionnaireData);
    }, [questionnaireData])

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

    const nextStep = () => {
        setWizardStep(wizardStep + 1);
    };

    const prevStep = () => {
        setWizardStep(wizardStep - 1);
    };
    const goToInstructions = () => {
        setWizardStep(0);
    };

    const submitDetails = (data) => {
        setPersonalDetails(data);
        nextStep();
    };

    const submitQuestionnaire = (data) => {
        setQuestionnaireResponse(data);
        nextStep();
    };

    // console.log(questionnaireResponse);

    if (wizardStep == 0) {
        return (
            <div className="parents-home">
                <div className="subheader-container">
                    <button className="button" onClick={nextStep}>
                        N E X T
                    </button>
                </div>
                <div className="parents-container">
                    We would have instructions here stored by the admin.
                </div>
            </div>
        );
    }

    if (wizardStep == 1) {
        return (
            <div className="parents-home">
                <div className="subheader-container">
                    <button className="button" onClick={goToInstructions}>
                        I N S T R U C T I O N S
                    </button>
                    <button className="button" onClick={prevStep}>
                        B A C K
                    </button>
                </div>

                <div className="parents-container">
                    <FormParentDetails submitDetails={submitDetails} />
                </div>
            </div>
        );
    }

    if (wizardStep == 2) {
        return (
            <div className="parents-home">
                <div className="subheader-container">
                    <button className="button" onClick={goToInstructions}>
                        I N S T R U C T I O N S
                    </button>
                    <button className="button" onClick={prevStep}>
                        B A C K
                    </button>
                </div>

                <div className="parents-container">
                    <Questionnaire
                        questionnaire={questionnaire}
                        submitQuestionnaire={submitQuestionnaire}
                        questionnaireData={questionnaireData}
                        handleQuestionnaireChange={handleQuestionnaireChange}
                    />
                </div>
            </div>
        );
    }

    if (wizardStep == 3) {
        return (
            <div className="parents-home">
                <div className="subheader-container">
                    <button className="button" onClick={prevStep}>
                        B A C K
                    </button>
                    <button className="button" onClick={nextStep}>
                        S U B M I T
                    </button>
                </div>

                <div className="parents-container">
                    <ParentReviewSubmission
                        questionnaire={questionnaire}
                        personalDetails={personalDetails}
                        questionnaireResponse={questionnaireResponse}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="landing">
            <div className="landing-logo">
                <img src={logoComplete} />
            </div>

            <div className="form-completed">
                <h1>Response Sent</h1>
                <h2>Thank you!</h2>
            </div>
        </div>
    );
};

export default withRouter(HomeParents);
