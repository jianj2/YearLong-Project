/**
 * ====================================================================
 * REACT SCREEN COMPONENT CLASS
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


import React, { useState } from "react";
import { Link } from 'react-router-dom'
// Import components.
import LoginParent from '../components/LoginParent'

// Import assets.
import logoComplete from '../assets/logo_complete.png';

// Import styles.
import '../styles/parents.css';
import "../styles/landing.css";
import "../styles/main.css";

// ---------------------------------------------------------------
// This method defines the elements for this component.
// ---------------------------------------------------------------
const HomeParents = () => {
    const [step, setStep] = useState(0);

    const nextStep = () => {
        setStep(step + 1);
    }
    const resetSteps = () => {
        setStep(0);
    };
    const goToInstructions = () => {
        setStep(1);
    }

    if(step == 0) {
        return (
            <div className="landing">
                <div className="landing-logo">
                    <img src={logoComplete} />
                </div>

                <div className="landing-button-clinician ">
                    
                    <LoginParent nextStep={nextStep} />
                
                </div>
            </div>
        );
    }

    if (step == 1) {
        return (
            <div className="parents-home">
                <div className="subheader-container">
                    <button onClick={resetSteps}>C A N C E L</button>
                    <button onClick={nextStep}>N E X T</button>
                </div>
                We would have instructions here.
            </div>
        );
    }

    if (step == 2) {
        return (
            <div className="parents-home">
                <div className="subheader-container">
                    <button onClick={goToInstructions}>I N S T R U C T I O N S</button>
                    <button onClick={resetSteps}>C A N C E L</button>
                    <button onClick={nextStep}>N E X T</button>
                </div>
                We would have A FORM FOR PERSONAL DEETS here.
            </div>
        );
    }

    if (step == 3) {
        return (
            <div className="parents-home">
                <div className="subheader-container">
                    <button onClick={goToInstructions}>
                        I N S T R U C T I O N S
                    </button>
                    <button onClick={resetSteps}>C A N C E L</button>
                    <button onClick={nextStep}>S U B M I T</button>
                </div>
                QUESTIONNAIRE WOULD BE DISPLAYED HERE
            </div>
        );
    }
 
    return (
        <div className="landing">
            <div className="landing-logo">
                <img src={logoComplete} />
            </div>

            <div className="landing-button-clinician return-form">
                <h1>Response Sent</h1>
                <Link to ="/" className="button">BACK TO HOME</Link>
            </div>
        </div>
    );
};

export default HomeParents