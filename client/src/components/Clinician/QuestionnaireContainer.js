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

import React, {useState} from "react";
import TopContainer from "./TopContainer";
import EditQuestionnaire from "./EditQuestionnaire";
import BottomContainer from "./BottomContainer";

// import set from "react-hook-form/dist/utils/set";

// handles rendering of QuestionnaireContainer in the Clinician Page
const QuestionnaireContainer = () => {

    // The number of questionTable
    const [questionTable,setState] = useState([0,1]);
    const addQuestion = () =>{
        setState([...questionTable, questionTable.length]);
        // console.log(questionTable);
    }

    const removeQuestion = (index) =>{
        const list = [...questionTable];
        list.splice(index,1);
        setState(list);
        // console.log(list);
    }

    return (
        <div className="questionnaire-container">
            <TopContainer />
            <EditQuestionnaire questionTable={questionTable} removeQuestion={removeQuestion}/>
            <BottomContainer addQuestion={addQuestion} />
        </div>
    );
};


export default QuestionnaireContainer;