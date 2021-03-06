// Import Libraries.
import React, { useState, useEffect } from "react";
// Import Utilities.
import { getSpecificInstruction } from "../../utils/API";

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

    useEffect(() => {
        const getInstructions = async () => {
            let [statusCode, res] = await getSpecificInstruction("CC");
            if (statusCode === 200) {
                setInstructionCC({
                    title: res["title"],
                    content: res["content"]
                });
            }

            [statusCode, res] = await getSpecificInstruction("CP");
            if (statusCode === 200) {
                setInstructionCP({
                    title: res["title"],
                    content: res["content"]
                });
            }
        };

        getInstructions();
    }, []);

    return (
        <div className="instructions-container">
            <h1>I N S T R U C T I O N S</h1>

            <div>
                <h2>{instructionCC.title}</h2>
                <p style={{whiteSpace:'pre-line'}}>{instructionCC.content}</p>
            </div>

            <div>
                <hr></hr>
            </div>

            <div>
                <h2>{instructionCP.title}</h2>
                <p style={{whiteSpace: 'pre-line'}}>{instructionCP.content}</p>
            </div>
        </div>
    );
};

export default InstructionsContainer;
