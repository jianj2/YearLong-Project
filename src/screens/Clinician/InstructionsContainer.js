/**
 * =============================================================================
 * REACT COMPONENT CLASS
 * =============================================================================
 * @date created: 14th May 2020
 * @authors: Jin Chen, Guang Yang
 *
 * The InstructionsContainer component handles rendering of
 * QuestionnaireContainer in the Clinician Page
 *
 */

// Import Libraries.
import React, { useState, useEffect } from "react";
// Import Utilities.
import * as API from "../../utils/api";

////////////////////////////////////////////////////////////////////////////////
////                            Define Component                            ////
////////////////////////////////////////////////////////////////////////////////
const InstructionsContainer = () => {
    const [instructionCC, setInstructionCC] = useState({
        title: "",
        content: ""
    });
    const [instructionCP, setInstructionCP] = useState({
        title: "",
        content: ""
    });

    const getInstructions = async () => {
        let [statusCode, res] = await API.getSpecificInstruction("CC");
        if (statusCode === 200) {
            setInstructionCC({
                title: res["title"],
                content: res["content"]
            });
        }

        [statusCode, res] = await API.getSpecificInstruction("CP");
        if (statusCode === 200) {
            setInstructionCP({
                title: res["title"],
                content: res["content"]
            });
        }
    };
    useEffect(() => {
        getInstructions();
    }, []);

    return (
        <div className="instructions-container">
            <h1>I N S T R U C T I O N S</h1>

            <div>
                <h2>{instructionCC.title}</h2>
                <p>{instructionCC.content}</p>
            </div>

            <div>
                <hr></hr>
            </div>

            <div>
                <h2>{instructionCP.title}</h2>
                <p>{instructionCP.content}</p>
            </div>
        </div>
    );
};

export default InstructionsContainer;
