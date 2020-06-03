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
import QuestionnaireList from "./QuestionnaireList";

// handles rendering of QuestionnaireContainer in the Clinician Page
const DoTheTestContainer = () => {
    const { loading, isAuthenticated, loginWithRedirect, user } = useAuth0();
    const [wizardStep, setWizardStep] = useState(-1);

    const [questionnaires, setQuestionnaires] = useState([]);

    console.log(user);

    useEffect(() => {
        API.getClinicianQuestionnaires(user.name).then(res => {
            console.log(res)
            setQuestionnaires(res);
        })
            
    }, []);
 

    

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

    const onClickQuestion = (data) => {
        console.log("questionnaire clicked", data);
    };

    if (wizardStep === 0) {
        return <div className="dothetest-container">asdasd</div>;
    } else if (wizardStep === 1) {
        return <div className="dothetest-container">asdfsadf</div>;
    } else if (wizardStep === 2) {
        return <div className="dothetest-container">asdf</div>;
    } else if (wizardStep === 3) {
        return <div className="dothetest-container">asdf</div>;
    } else {
        return (
            <div className="dothetest-container">
                <QuestionnaireList
                    questionnaires={questionnaires}
                    listTitle={"My Questionnaires"}
                    isSelectable={true}
                    onClickQuestion={onClickQuestion}
                    canEdit={false}
                    canDelete={false}
                />
            </div>
        );
    }
};

export default DoTheTestContainer;
