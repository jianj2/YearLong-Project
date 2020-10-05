
/**
 * ====================================================================
 * REACT COMPONENT CLASS
 * ====================================================================
 * @date created: 2nd September 2020
 * @authors: Cary Jin
 *
 *
 */

import SSQInstructionContainer from "./SSQInstructionContainer";
import React, { useState, useEffect } from "react";
import {getInstructionsSummary} from "../../utils/api";
const SSQInstructionsList = () => {

const [instructionsSummary, setInstructionsSummary] = useState([]); 
const setup = async ()  => {
    const [statusCode, summary] = await getInstructionsSummary();
    if(statusCode==200){
        setInstructionsSummary(summary);
    }
};



const InstructionItem = ({
    title,
    type
}) => {
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
            <div className="q-name">
                {title} 
            </div>

        </div>
    );
};


useEffect(()=>{
    setup();
},[]);




console.log(instructionsSummary);
return (
    <div className="instruction-list-container">
        <h1>SSQ Instructions</h1>
        {instructionsSummary.map((instruction, index) => (
            <InstructionItem
                key={index}
                title={instruction.title}
                type = {instruction.type}
            />
        ))}
    </div>
);
// return (<SSQInstructionContainer 
// instructionType = "CC"/>);

}

export default SSQInstructionsList;