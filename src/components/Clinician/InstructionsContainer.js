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


import React, { useState, useEffect } from "react";
import * as API from "../../utils/api";

// handles rendering of QuestionnaireContainer in the Clinician Page
const InstructionsContainer = () => {
    const [instructionCC, setInstructionCC] = useState({
        title: "",
        content: ""
    });
    const [instructionCP, setInstructionCP] = useState({
        title: "",
        content: ""
    });

    const getInstructions = () => {
        API.getSpecificInstruction("CC").then((res) =>{
            setInstructionCC({
                title: res["title"],
                content: res["content"]
            })   
        })
        API.getSpecificInstruction("CP").then((res) =>{
            setInstructionCP({
                title: res["title"],
                content: res["content"]
            })   
        })
    };
    useEffect(() => {  getInstructions();},[]);
  

    return (
        <div className="instructions-container">
        <h1>I N S T R U C T I O N S</h1>
 
                        <div>
                            <h2>{instructionCC.title}</h2>
                            <p>{instructionCC.content}</p>
                        </div>
                    
                    <div><hr></hr></div>

                    
                    <div>
                            <h2>{instructionCP.title}</h2>
                            <p>{instructionCP.content}</p>
                    </div>
                
        </div>
    );
};


export default InstructionsContainer;