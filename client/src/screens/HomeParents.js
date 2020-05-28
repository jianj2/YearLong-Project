/**
 * ====================================================================
 * REACT SCREEN COMPONENT FUNCTION
 * ====================================================================
 * @date created: 10th May 2020
 * @authors:    Waqas Rehmani, Cary Jin, SaiEr Ding, Uvin AbeySinghe.
 *
 * 
 * The Home screen component defines our screen for the route
 * '/parents/*'. This will be the first screen parents will see
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
import Loading from '../components/Loading'

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
    const [wizardStep, setWizardStep] = useState(0);
    const [questionnaire, setQuestionnaire] = useState({
        questionnaireId: "",
        title: "",
        description: "",
        sections: [],
        isStandard: true,
    });
    const [clinicianEmail, setClinicianEmail] = useState("");
    const [personalDetails, setPersonalDetails] = useState({});
    const [questionnaireData, setQuestionnaireData] = useState([]);
    const [loading, setLoading] = useState(false);

    // This is called when the component first mounts.
    useEffect(() => {
        // Server call to get the questionnaire.
        API.getQuestionnaire(match.params.questionnaireId).then((res) => {
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
            setQuestionnaire(res);
        });
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
        setPersonalDetails(data);
        nextStep();
    };
    // Method called when we submit the questionnaire.
    const submitQuestionnaire = (data) => {
        nextStep();
    };

    const submitResponse = () => {
        let data = {
            questionnaireData,
            personalDetails,
            clinicianEmail: match.params.clinicianEmail,
        };
        console.log(data)
        
        setLoading(true)
        API.sendQuestionnaireData(data).then(res => {
            if(res) {
                setLoading(false);
                nextStep();
            }
            console.log(res)
        })
    }

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
                {
                    loading
                    ? <Loading />
                    : null
                }
                <div className="subheader-container">
                    <button className="button" onClick={prevStep}>
                        B A C K
                    </button>
                    <button className="button" onClick={submitResponse}>
                        S U B M I T
                    </button>
                </div>

                <div className="parents-container">
                    <ParentReviewSubmission
                        questionnaire={questionnaire}
                        personalDetails={personalDetails}
                        questionnaireData={questionnaireData}
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
