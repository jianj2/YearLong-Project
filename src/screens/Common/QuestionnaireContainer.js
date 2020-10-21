// Import Libraries.
import React, { useState, useEffect } from "react";
// Import Utilities.
import * as API from "../../utils/API";
// Import Components.
import { EditQuestionnaire } from "../../components/Commons";

/**
 * =============================================================================
 * REACT COMPONENT CLASS
 * =============================================================================
 * @date created: 14th May 2020
 * @authors: Jin Chen, Guang Yang
 *
 * The QuestionnaireContainer component handles rendering of
 * QuestionnaireContainer in the Clinician Page
 *
 */

////////////////////////////////////////////////////////////////////////////////
////                            Define Component                            ////
////////////////////////////////////////////////////////////////////////////////
const QuestionnaireContainer = (props) => {

    // the questionnaire content
    const [questionnaire, setQuestionnaire] = useState(null);
    console.log("\n questionnaire", questionnaire)

    // get the questionnaire content from API
    useEffect(() => {
        const setup = async () => {
            const [statusCode, data] = await API.getQuestionnaireById(props.questionnaireID);

            if (statusCode === 200) {
                setQuestionnaire(data);
            } else {
                console.error(data);
            }
        };
        setup();

    }, [props.questionnaireID]);

    //add scenario to questionnaire
    const addScenario = (sectionIndex) => {
        const newScenario = {
            description: "",
            questions: [
                {
                    isMCQ: false,
                    rangeOptions: []
                }
            ]
        };
        const questionnaireTemp = Object.assign({}, questionnaire);
        questionnaireTemp.sections[sectionIndex].scenarios.push(newScenario);
        setQuestionnaire(questionnaireTemp);
    };

    const addStandardScenario = (sectionIndex) => {
        const newScenario = {
            description: "",
            questions: [
                {
                    MCQOptions: [],
                    isMCQ: false,
                    rangeOptions: [],
                },
                {
                    description: "How often does this type of situation occur?",
                    MCQOptions: ["Very often (4 or more times in a week)",
                     "Often (1 to 3 times in a week)", 
                     "Not often (1 to 2 times in a month)",
                     "Almost Never"],
                    isMCQ: true,
                    rangeOptions: [],
                },
                {
                    description: "How important do you think it is?",
                    MCQOptions: ["Very important", 
                    "Important", 
                    "Only a little bit mportant",
                    "Not important"],
                    isMCQ: true,
                    rangeOptions: [],
                }
            ]
        };
        const questionnaireTemp = Object.assign({}, questionnaire);
        questionnaireTemp.sections[sectionIndex].scenarios.push(newScenario);
        setQuestionnaire(questionnaireTemp);
    };

    //remove scenario to questionnaire
    const removeScenario = (sectionIndex, scenarioIndex) => {
        const questionnaireTemp = Object.assign({}, questionnaire);
        questionnaireTemp.sections[sectionIndex].scenarios.splice(scenarioIndex, 1);
        setQuestionnaire(questionnaireTemp);
    };

    //add question to questionnaire(Only MCQ)
    const addQuestion = (sectionIndex, scenarioIndex) => {
        const newQuestion = {
            isMCQ: true,
            MCQOptions: []
        };
        const questionnaireTemp = Object.assign({}, questionnaire);
        questionnaireTemp.sections[sectionIndex].scenarios[scenarioIndex].questions.push(newQuestion);
        setQuestionnaire(questionnaireTemp);
    };

    //remove question from questionnaire
    const removeQuestion = (sectionIndex, scenarioIndex, questionIndex) => {
        const questionnaireTemp = Object.assign({}, questionnaire);
        questionnaireTemp.sections[sectionIndex].scenarios[scenarioIndex].questions.splice(questionIndex, 1);
        setQuestionnaire(questionnaireTemp);
    };

    //add answer to the multiple choice question
    const addAnswerToMCQQuestion = (sectionIndex, scenarioIndex, questionIndex) => {
        const newAnswer = "";
        const questionnaireTemp = Object.assign({}, questionnaire);
        questionnaireTemp.sections[sectionIndex].scenarios[scenarioIndex].questions[questionIndex].MCQOptions.push(newAnswer);
        setQuestionnaire(questionnaireTemp);
    };

    //delete answer to the multiple choice question
    const deleteAnswerFromMCQQuestion = (sectionIndex, scenarioIndex, questionIndex, answerIndex) => {
        const questionnaireTemp = Object.assign({}, questionnaire);
        questionnaireTemp.sections[sectionIndex].scenarios[scenarioIndex].questions[questionIndex].MCQOptions.splice(answerIndex, 1);
        setQuestionnaire(questionnaireTemp);
    };

    //change question to range question
    const changeToRangeQuestion = (sectionIndex, scenarioIndex, questionIndex) => {
        const newQuestion = {
            isMCQ: false,
            rangeOptions: []
        };
        const questionnaireTemp = Object.assign({}, questionnaire);
        questionnaireTemp.sections[sectionIndex].scenarios[scenarioIndex].questions.splice(questionIndex, 1, newQuestion);
        setQuestionnaire(questionnaireTemp);
    };

    //change question to MCQ question
    const changeToMCQQuestion = (sectionIndex, scenarioIndex, questionIndex) => {
        const newQuestion = {
            description: "",
            isMCQ: true,
            MCQOptions: []
        };
        const questionnaireTemp = Object.assign({}, questionnaire);
        questionnaireTemp.sections[sectionIndex].scenarios[scenarioIndex].questions.splice(questionIndex, 1, newQuestion);
        setQuestionnaire(questionnaireTemp);
    };

    // to change the content of questionnaire title
    const handleQuestionnaireTitleChange = (event) => {
        const questionnaireTemp = Object.assign({}, questionnaire);
        questionnaireTemp.title = event.target.value;
        setQuestionnaire(questionnaireTemp);

    };

    // to change the content of questionnaire title
    const handleQuestionnaireTypeChange = (event) => {
        const questionnaireTemp = Object.assign({}, questionnaire);
        if (event.target.value === "children") {
            questionnaireTemp.isSSQ_Ch = true;
        } else {
            questionnaireTemp.isSSQ_Ch = false;
        }
        setQuestionnaire(questionnaireTemp);

    };

    // to change the content of questionnaire description
    const handleQuestionnaireDesChange = (event) => {
        const questionnaireTemp = Object.assign({}, questionnaire);
        questionnaireTemp.description = event.target.value;
        setQuestionnaire(questionnaireTemp);

    };

    // to change the content of section title
    const handleSecTitleChange = (event, sectionIndex) => {
        const questionnaireTemp = Object.assign({}, questionnaire);
        questionnaireTemp.sections[sectionIndex].title = event.target.value;
        setQuestionnaire(questionnaireTemp);

    };

    //to change the content of scenario description
    const handleSceDesChange = (event, sectionIndex, scenarioIndex) => {
        const questionnaireTemp = Object.assign({}, questionnaire);
        questionnaireTemp.sections[sectionIndex].scenarios[scenarioIndex].description = event.target.value;
        setQuestionnaire(questionnaireTemp);

    };

    // to change the content of question description
    const handleQuestionDesChange = (event, sectionIndex, scenarioIndex, questionIndex) => {
        const questionnaireTemp = Object.assign({}, questionnaire);
        questionnaireTemp.sections[sectionIndex].scenarios[scenarioIndex].questions[questionIndex].description = event.target.value;
        setQuestionnaire(questionnaireTemp);

    };

    //tp change the content of question options
    const handleQuestionOptsChange = (event, sectionIndex, scenarioIndex, questionIndex, answerIndex) => {
        const questionnaireTemp = Object.assign({}, questionnaire);
        if (questionnaireTemp.sections[sectionIndex].scenarios[scenarioIndex].questions[questionIndex].isMCQ === false) {
            questionnaireTemp.sections[sectionIndex].scenarios[scenarioIndex].questions[questionIndex].rangeOptions[answerIndex] = event.target.value;
        } else {
            questionnaireTemp.sections[sectionIndex].scenarios[scenarioIndex].questions[questionIndex].MCQOptions[answerIndex] = event.target.value;
        }
        setQuestionnaire(questionnaireTemp);

    };

    return (
        <div className="questionnaire-container-outer">
            <div className="questionnaire-container">
                <form action="">
                    <EditQuestionnaire
                        questionnaire={questionnaire}
                        addScenario={addScenario}
                        addStandardScenario = {addStandardScenario}
                        removeScenario={removeScenario}
                        addQuestion={addQuestion}
                        removeQuestion={removeQuestion}
                        addAnswerToMCQQuestion={addAnswerToMCQQuestion}
                        deleteAnswerFromMCQQuestion={deleteAnswerFromMCQQuestion}
                        changeToRangeQuestion={changeToRangeQuestion}
                        changeToMCQQuestion={changeToMCQQuestion}
                        handleQuestionnaireTitleChange={handleQuestionnaireTitleChange}
                        handleQuestionnaireTypeChange={handleQuestionnaireTypeChange}
                        handleQuestionnaireDesChange={handleQuestionnaireDesChange}
                        handleSecTitleChange={handleSecTitleChange}
                        handleSceDesChange={handleSceDesChange}
                        handleQuestionDesChange={handleQuestionDesChange}
                        handleQuestionOptsChange={handleQuestionOptsChange}
                        redirectURL={props.redirectURL}/>
                </form>
            </div>
        </div>
    );
};

export default QuestionnaireContainer;