// Import Libraries.
import React, { useState, useEffect } from "react";
// Import Utilities.
import { getInstructionsSummary } from "../../utils/API";

/**
 * =============================================================================
 * REACT COMPONENT CLASS
 * =============================================================================
 * @date created: 2nd September 2020
 * @authors: Cary Jin
 *
 * The SSQInstructionsList component renders the instuction list in the admin
 * page.
 *
 */

////////////////////////////////////////////////////////////////////////////////
////                            Define Component                            ////
////////////////////////////////////////////////////////////////////////////////
const SSQInstructionsList = () => {
    const [instructionsSummary, setInstructionsSummary] = useState([]);
    const setup = async () => {
        try {
            const [statusCode, summary] = await getInstructionsSummary();
            if (statusCode === 200) {
                setInstructionsSummary(summary);
            }
        }catch(err){
            console.error(err);
        }
    };

    const InstructionItem = ({ title, type }) => {
        return (
            <div
                className={
                    "questionnaire-list-item questionnaire-list-item-selectable"
                }
                onClick={() => {
                    const url = "/admin/instruction/" + type + "/edit";
                    window.location.href = url;
                }}
            >
                <div className="q-name">{title}</div>
            </div>
        );
    };

    useEffect(() => {
        setup();
    }, []);


    return (
        <div className="instruction-list-container">
            <h1>SSQ Instructions</h1>
            {instructionsSummary.map((instruction, index) => (
                <InstructionItem
                    key={index}
                    title={instruction.title}
                    type={instruction.type}
                />
            ))}
        </div>
    );
};

export default SSQInstructionsList;
