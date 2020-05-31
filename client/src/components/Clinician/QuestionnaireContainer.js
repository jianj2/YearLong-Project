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
    const [questionnaire, setQuestionnaire] = useState({});

    // get the questionnaire content from API
    useEffect(() =>{
        API.getSpecificQuestionnaire(props.questionnaireID,setQuestionnaire);
    },[])

    //add question from questionnaire
    const addQuestion = (event) =>{
        const newQuestion = {
            isMCQ: false,
            rangeOptions: []
        }
        const questionnaireTemp = Object.assign({},questionnaire);
        // this is because the front-end ui still cannot show the sections and scenarios
        questionnaireTemp.sections[0].scenarios[0].questions.push(newQuestion);
        setQuestionnaire(questionnaireTemp);
    }

    //remove question from questionnaire
    const removeQuestion = (questionIndex) =>{
        const questionnaireTemp = Object.assign({},questionnaire);
        questionnaireTemp.sections[0].scenarios[0].questions.splice(questionIndex,1);
        setQuestionnaire(questionnaireTemp);
    }

    //change question to range question
    const changeToRangeQuestion = (questionIndex) =>{
        const newQuestion = {
            isMCQ: false,
            rangeOptions: []
        }
        const questionnaireTemp = Object.assign({},questionnaire);
        questionnaireTemp.sections[0].scenarios[0].questions.splice(questionIndex,1,newQuestion);
        setQuestionnaire(questionnaireTemp);
    }

    //change question to MCQ question
    const changeToMCQQuestion = (questionIndex) =>{
        const newQuestion = {
            description: "",
            isMCQ: true,
            mcqOptions: []
        }
        const questionnaireTemp = Object.assign({},questionnaire);
        questionnaireTemp.sections[0].scenarios[0].questions.splice(questionIndex,1,newQuestion);
        setQuestionnaire(questionnaireTemp);
    }

    //add answer to the multiple choice question
    const addAnswerToMCQQuestion = (questionIndex) =>{
        const newAnswer = "";
        const questionnaireTemp = Object.assign({},questionnaire);
        questionnaireTemp.sections[0].scenarios[0].questions[questionIndex].mcqOptions.push(newAnswer);
        setQuestionnaire(questionnaireTemp);
    }

    //delete answer to the multiple choice question
    const deleteAnswerToMCQQuestion = (questionIndex,answerIndex) =>{
        const questionnaireTemp = Object.assign({},questionnaire);
        questionnaireTemp.sections[0].scenarios[0].questions[questionIndex].mcqOptions.splice(answerIndex,1);
        setQuestionnaire(questionnaireTemp);
    }

    // to change the content of questionnaire title
    const handleQuestionnaireTitleChange = (event) =>{
        const questionnaireTemp = Object.assign({},questionnaire);
        questionnaireTemp.title = event.target.value;
        setQuestionnaire(questionnaireTemp);
        console.log(questionnaire);
    }

    // to change the content of questionnaire description
    const handleQuestionnaireDesChange = (event) =>{
        const questionnaireTemp = Object.assign({},questionnaire);
        questionnaireTemp.description = event.target.value;
        setQuestionnaire(questionnaireTemp);
        console.log(questionnaire);
    }

    // to change the content .... (need to add more)

    return (
        <div className="questionnaire-container">

            {/*<TopContainer />*/}
            <form action="">
            <EditQuestionnaire Questionnaire={questionnaire} removeQuestion={removeQuestion}
                               changeToRangeQuestion={changeToRangeQuestion} changeToMCQQuestion={changeToMCQQuestion}
                               addQuestion={addQuestion} addAnswerToMCQQuestion={addAnswerToMCQQuestion}
                               deleteAnswerToMCQQuestion={deleteAnswerToMCQQuestion}
                               handleQuestionnaireTitleChange={handleQuestionnaireTitleChange}
                               handleQuestionnaireDesChange={handleQuestionnaireDesChange}/>
            </form>
            {/*<BottomContainer addQuestion={addQuestion} />*/}

        </div>
    );
};

export default QuestionnaireContainer;