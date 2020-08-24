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
        API.getAndSetSpecificQuestionnaire(props.questionnaireID,setQuestionnaire);
    }, [props.questionnaireID])


    // these function can be combine together later

    //add section to questionnaire

    //remove section to questionnaire

    //add scenario to questionnaire
    const addScenario = (sectionIndex) =>{
        const newScenario = {
            description:'',
            questions:[]
        }
        const questionnaireTemp = Object.assign({},questionnaire);
        questionnaireTemp.sections[sectionIndex].scenarios.push(newScenario);
        setQuestionnaire(questionnaireTemp);
    }

    //remove scenario to questionnaire
    const removeScenario = (sectionIndex,scenarioIndex) =>{
        const questionnaireTemp = Object.assign({},questionnaire);
        questionnaireTemp.sections[sectionIndex].scenarios.splice(scenarioIndex,1);
        setQuestionnaire(questionnaireTemp);
    }

    //add question to questionnaire
    const addQuestion = (sectionIndex,scenarioIndex) =>{
        const newQuestion = {
            isMCQ: false,
            rangeOptions: []
        }
        const questionnaireTemp = Object.assign({},questionnaire);
        questionnaireTemp.sections[sectionIndex].scenarios[scenarioIndex].questions.push(newQuestion);
        setQuestionnaire(questionnaireTemp);
    }

    //remove question from questionnaire
    const removeQuestion = (sectionIndex,scenarioIndex,questionIndex) =>{
        const questionnaireTemp = Object.assign({},questionnaire);
        questionnaireTemp.sections[sectionIndex].scenarios[scenarioIndex].questions.splice(questionIndex,1);
        setQuestionnaire(questionnaireTemp);
    }

    //add answer to the multiple choice question
    const addAnswerToMCQQuestion = (sectionIndex,scenarioIndex,questionIndex) =>{
        const newAnswer = "";
        const questionnaireTemp = Object.assign({},questionnaire);
        questionnaireTemp.sections[sectionIndex].scenarios[scenarioIndex].questions[questionIndex].MCQOptions.push(newAnswer);
        setQuestionnaire(questionnaireTemp);
    }

    //delete answer to the multiple choice question
    const deleteAnswerFromMCQQuestion = (sectionIndex,scenarioIndex,questionIndex,answerIndex) =>{
        const questionnaireTemp = Object.assign({},questionnaire);
        questionnaireTemp.sections[sectionIndex].scenarios[scenarioIndex].questions[questionIndex].MCQOptions.splice(answerIndex,1);
        setQuestionnaire(questionnaireTemp);
    }

    //change question to range question
    const changeToRangeQuestion = (sectionIndex,scenarioIndex,questionIndex) =>{
        const newQuestion = {
            isMCQ: false,
            rangeOptions: []
        }
        const questionnaireTemp = Object.assign({},questionnaire);
        questionnaireTemp.sections[sectionIndex].scenarios[scenarioIndex].questions.splice(questionIndex,1,newQuestion);
        setQuestionnaire(questionnaireTemp);
    }

    //change question to MCQ question
    const changeToMCQQuestion = (sectionIndex,scenarioIndex,questionIndex) =>{
        const newQuestion = {
            description: "",
            isMCQ: true,
            MCQOptions: []
        }
        const questionnaireTemp = Object.assign({},questionnaire);
        questionnaireTemp.sections[sectionIndex].scenarios[scenarioIndex].questions.splice(questionIndex,1,newQuestion);
        setQuestionnaire(questionnaireTemp);
    }

    // to change the content of questionnaire title
    const handleQuestionnaireTitleChange = (event) =>{
        const questionnaireTemp = Object.assign({},questionnaire);
        questionnaireTemp.title = event.target.value;
        setQuestionnaire(questionnaireTemp);
        console.log(questionnaire);
    }

      // to change the content of questionnaire title
      const handleQuestionnaireTypeChange = (event) =>{
        const questionnaireTemp = Object.assign({},questionnaire);
        if (event.target.value === "children" ){
            questionnaireTemp.isSSQ_Ch = true;
        }
        else{
            questionnaireTemp.isSSQ_Ch = false;
        }
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

    // to change the content of section title
    const handleSecTitleChange = (event,sectionIndex) =>{
        const questionnaireTemp = Object.assign({},questionnaire);
        questionnaireTemp.sections[sectionIndex].title = event.target.value;
        setQuestionnaire(questionnaireTemp);
        console.log(questionnaire);
    }

    //to change the content of scenario description
    const handleSceDesChange = (event,sectionIndex, scenarioIndex) =>{
        const questionnaireTemp = Object.assign({},questionnaire);
        questionnaireTemp.sections[sectionIndex].scenarios[scenarioIndex].description = event.target.value;
        setQuestionnaire(questionnaireTemp);
        console.log(questionnaire);
    }

    // to change the content of question description
    const handleQuestionDesChange = (event, sectionIndex, scenarioIndex, questionIndex) =>{
        const questionnaireTemp = Object.assign({},questionnaire);
        questionnaireTemp.sections[sectionIndex].scenarios[scenarioIndex].questions[questionIndex].description = event.target.value;
        setQuestionnaire(questionnaireTemp);
        console.log(questionnaire);
    }

    //tp change the content of question options
    const handleQuestionOptsChange = (event, sectionIndex, scenarioIndex, questionIndex, answerIndex) =>{
        const questionnaireTemp = Object.assign({},questionnaire);
        if (questionnaireTemp.sections[sectionIndex].scenarios[scenarioIndex].questions[questionIndex].isMCQ === false) {
            questionnaireTemp.sections[sectionIndex].scenarios[scenarioIndex].questions[questionIndex].rangeOptions[answerIndex] = event.target.value;
        } else {
            questionnaireTemp.sections[sectionIndex].scenarios[scenarioIndex].questions[questionIndex].MCQOptions[answerIndex] = event.target.value;
        }
        setQuestionnaire(questionnaireTemp);
        console.log(sectionIndex,scenarioIndex,questionIndex,answerIndex);
    }

    return (
        <div className="questionnaire-container-outer">
            <div className="questionnaire-container">

                {/*<TopContainer />*/}
                <form action="">
                    <EditQuestionnaire Questionnaire={questionnaire}
                                       addScenario={addScenario} removeScenario={removeScenario}
                                       addQuestion={addQuestion} removeQuestion={removeQuestion}
                                       addAnswerToMCQQuestion={addAnswerToMCQQuestion} deleteAnswerFromMCQQuestion={deleteAnswerFromMCQQuestion}
                                       changeToRangeQuestion={changeToRangeQuestion} changeToMCQQuestion={changeToMCQQuestion}
                                       handleQuestionnaireTitleChange={handleQuestionnaireTitleChange}
                                       handleQuestionnaireTypeChange={handleQuestionnaireTypeChange}
                                       handleQuestionnaireDesChange={handleQuestionnaireDesChange}
                                       handleSecTitleChange={handleSecTitleChange}
                                       handleSceDesChange={handleSceDesChange}
                                       handleQuestionDesChange={handleQuestionDesChange}
                                       handleQuestionOptsChange={handleQuestionOptsChange}/>
                </form>
                {/*<BottomContainer addQuestion={addQuestion} />*/}
            </div>
        </div>
    );
};

export default QuestionnaireContainer;