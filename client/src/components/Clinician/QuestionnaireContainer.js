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
    const [questionnaire, setQuestionnaire] = useState(null);

    // get the questionnaire content from API
    useEffect(() =>{
        API.getSpecificQuestionnaire(props.questionnaireID,setQuestionnaire);
    },[])

    //add question to questionnaire
    const addQuestion = (scenarioIndex) =>{
        const newQuestion = {
            isMCQ: false,
            rangeOptions: []
        }
        const questionnaireTemp = Object.assign({},questionnaire);
        questionnaireTemp.sections[0].scenarios[scenarioIndex].questions.push(newQuestion);
        setQuestionnaire(questionnaireTemp);
    }

    //remove question from questionnaire
    const removeQuestion = (scenarioIndex,questionIndex) =>{
        const questionnaireTemp = Object.assign({},questionnaire);
        questionnaireTemp.sections[0].scenarios[scenarioIndex].questions.splice(questionIndex,1);
        setQuestionnaire(questionnaireTemp);
    }

    //add scenario to questionnaire
    const addScenario = () =>{
        const newScenario = {
            description:'',
            questions:[]
        }
        const questionnaireTemp = Object.assign({},questionnaire);
        questionnaireTemp.sections[0].scenarios.push(newScenario);
        setQuestionnaire(questionnaireTemp);
    }
    //remove scenario to questionnaire

    //add section to questionnaire

    //remove section to questionnaire


    //change question to range question
    const changeToRangeQuestion = (scenarioIndex,questionIndex) =>{
        const newQuestion = {
            isMCQ: false,
            rangeOptions: []
        }
        const questionnaireTemp = Object.assign({},questionnaire);
        questionnaireTemp.sections[0].scenarios[scenarioIndex].questions.splice(questionIndex,1,newQuestion);
        setQuestionnaire(questionnaireTemp);
    }

    //change question to MCQ question
    const changeToMCQQuestion = (scenarioIndex,questionIndex) =>{
        const newQuestion = {
            description: "",
            isMCQ: true,
            mcqOptions: []
        }
        const questionnaireTemp = Object.assign({},questionnaire);
        questionnaireTemp.sections[0].scenarios[scenarioIndex].questions.splice(questionIndex,1,newQuestion);
        setQuestionnaire(questionnaireTemp);
    }

    //add answer to the multiple choice question
    const addAnswerToMCQQuestion = (scenarioIndex,questionIndex) =>{
        const newAnswer = "";
        const questionnaireTemp = Object.assign({},questionnaire);
        questionnaireTemp.sections[0].scenarios[scenarioIndex].questions[questionIndex].mcqOptions.push(newAnswer);
        setQuestionnaire(questionnaireTemp);
    }

    //delete answer to the multiple choice question
    const deleteAnswerToMCQQuestion = (scenarioIndex,questionIndex,answerIndex) =>{
        const questionnaireTemp = Object.assign({},questionnaire);
        questionnaireTemp.sections[0].scenarios[scenarioIndex].questions[questionIndex].mcqOptions.splice(answerIndex,1);
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

    // to change the question of range questions (because the scheme in the data base didn't have this para,
    // but we have in the frontend, so we need to change it later, comment this first).

    // const handleRangeQuestionChange = (event,questionIndex) =>{
    // }

    //same situation

    // const handleRangeDesChange = (event) =>{
    // }

    // to change the question of multi choice questions (because the scheme in the data base didn't have this para,
    // but we have in the frontend, so we need to change it later, comment this first).
    // const handleMultiChoiceQuestionChange = () =>{
    //
    // }


    const handleMultiChoiceDesChange = (event,questionIndex) =>{
        const questionnaireTemp = Object.assign({},questionnaire);
        questionnaireTemp.sections[0].scenarios[0].questions[questionIndex].description = event.target.value;
        setQuestionnaire(questionnaireTemp);
        console.log(questionnaire);
    }

    const handleMultiAnsChange = (event,questionIndex,answerIndex) =>{
        const questionnaireTemp = Object.assign({},questionnaire);
        questionnaireTemp.sections[0].scenarios[0].questions[questionIndex].mcqOptions[answerIndex] = event.target.value;
        setQuestionnaire(questionnaireTemp);
        console.log(questionnaire);
    }


    return (
        <div className="questionnaire-container">

            {/*<TopContainer />*/}
            <form action="">
            <EditQuestionnaire Questionnaire={questionnaire} removeQuestion={removeQuestion}
                               changeToRangeQuestion={changeToRangeQuestion} changeToMCQQuestion={changeToMCQQuestion}
                               addQuestion={addQuestion} addAnswerToMCQQuestion={addAnswerToMCQQuestion}
                               addScenario={addScenario}
                               deleteAnswerToMCQQuestion={deleteAnswerToMCQQuestion}
                               handleQuestionnaireTitleChange={handleQuestionnaireTitleChange}
                               handleQuestionnaireDesChange={handleQuestionnaireDesChange}
                               handleMultiChoiceDesChange={handleMultiChoiceDesChange}
                               handleMultiAnsChange={handleMultiAnsChange}/>
            </form>
            {/*<BottomContainer addQuestion={addQuestion} />*/}
        </div>
    );
};

export default QuestionnaireContainer;