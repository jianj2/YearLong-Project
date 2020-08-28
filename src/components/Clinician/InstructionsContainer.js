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
    const [instruction, setInstruction] = useState({
        title: "",
        content: ""
    });

    const getInstruction = () => {
        API.getInstructions().then((res) =>{
            setInstruction({
                title: res["title"],
                content: res["content"]
            })   
        })
    };
    useEffect(() => {  getInstruction();},[]);
  

    return (
        <div className="instructions-container">
        <h1>I N S T R U C T I O N S</h1>
 
                        <div>
                            <h2>{instruction.title}</h2>
                            <p>{instruction.content}</p>
                        </div>
                
        </div>
    );
};


export default InstructionsContainer;