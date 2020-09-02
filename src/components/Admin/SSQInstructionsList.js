
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
    const summary = await getInstructionsSummary();
    setInstructionsSummary(summary);


};
useEffect(()=>{
    setup();
},[]);


console.log(instructionsSummary);
return (<SSQInstructionContainer 
instructionType = "CC"/>);

}

export default SSQInstructionsList;