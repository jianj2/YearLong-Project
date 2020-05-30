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

import React, {useState,useEffect} from "react";
import TopContainer from "./TopContainer";
import EditQuestionnaire from "./EditQuestionnaire";
import BottomContainer from "./BottomContainer";
import * as API from "../../utils/api";

// import set from "react-hook-form/dist/utils/set";

// handles rendering of QuestionnaireContainer in the Clinician Page
const QuestionnaireContainer = (props) => {

    // the questionnaire content
    const [questionnaire, setQuestionnaire] = useState({
        questionnaireId: null,
        title: '',
        description: '',
        sections: [
            {
                title:'',
                scenarios:[{
                    description:'',
                    questions:[
                        // {
                        //     description: null,
                        //     isMCQ: true,
                        //     mcqOptions: []
                        // },{
                        //     description: null,
                        //     isMCQ: false,
                        //     mcqOptions: []
                        // }
                        ],
            }]}],
        isStandard: null,
    });

    // get the questionnaire content from API

    useEffect(() =>{
        API.getSpecificQuestionnaire(props.questionnaireID,setQuestionnaire);
    },[])

    // The number of questionTable
    // const [questionTable,setState] = useState([0,1]);
    // const addQuestion = () =>{
    //     setState([...questionTable, questionTable.length]);
    // }
    //
    // const removeQuestion = (index) =>{
    //     const list = [...questionTable];
    //     list.splice(index,1);
    //     setState(list);
    // }

    // console.log(questionnaire.sections[0].scenarios);

    const addQuestion = () =>{

    }

    const removeQuestion = (index) =>{
        // const questionnaireTemp = questionnaire;
        // questionnaireTemp.sections[0].scenarios[0].questions.splice(index,1);
        // setQuestionnaire(questionnaire);
    }

    return (
        <div className="questionnaire-container">
            <TopContainer />
            {/*<EditQuestionnaire questionTable={questionTable} removeQuestion={removeQuestion}/>*/}
            <EditQuestionnaire Questionnaire={questionnaire} removeQuestion={removeQuestion}/>
            <BottomContainer addQuestion={addQuestion} />
        </div>
    );
};


export default QuestionnaireContainer;