/**
 * ====================================================================
 * REACT COMPONENT CLASS
 * ====================================================================
 * @date created: 18th May 2020
 * @authors: Jin Chen, Guang Yang
 *
 * The Sidebar component defines our SideBar for the application. This
 * will visible at the top of our application.
 *
 * This file is used to display the Sidebar component
 *
 */

import React,{useState} from "react";
import PropTypes from "prop-types";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import {render} from "react-dom";
import BottomContainer from "./BottomContainer";

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

// import style
import "../../styles/main.css"

// handles rendering of TopContainer in the Clinician page
const QuestionsContainer = (props) => {
    const {sections} = props.questionnaire;
    const {removeQuestion,changeToRangeQuestion,changeToMCQQuestion,
        addAnswerToMCQQuestion,deleteAnswerToMCQQuestion,handleMultiChoiceDesChange,
        handleMultiAnsChange} = props;

        return (
            <div className="questions-container">
                {
                    sections && sections[0].scenarios
                    && sections[0].scenarios[0].questions.map((item,index) => {
                    return (
                        <QuestionForm item={item}
                                      questionIndex={index}
                                      removeQuestion={removeQuestion}
                                      changeToRangeQuestion={changeToRangeQuestion}
                                      changeToMCQQuestion={changeToMCQQuestion}
                                      addAnswerToMCQQuestion={addAnswerToMCQQuestion}
                                      deleteAnswerToMCQQuestion={deleteAnswerToMCQQuestion}
                                      handleMultiChoiceDesChange={handleMultiChoiceDesChange}
                                      handleMultiAnsChange={handleMultiAnsChange}/>
                    )
                    })
                }
             </div>
        );
};

//decide which kind of question to show
const QuestionForm = (props) =>{

    const {rangeOptions,description,mcqOptions,isMCQ} = props.item;
    const {questionIndex,removeQuestion,changeToMCQQuestion,changeToRangeQuestion,
        addAnswerToMCQQuestion,deleteAnswerToMCQQuestion,handleMultiChoiceDesChange,
        handleMultiAnsChange} = props;

    // const [isMCQ,setState] = useState(props.item.isMCQ);

    const handleRangeClick = () =>{
        changeToRangeQuestion(questionIndex);
    }
    const handleMultipleClick = () =>{
        changeToMCQQuestion(questionIndex);
    }
    const handleRemoveClick = () =>{
        removeQuestion(questionIndex);
    }

    if (isMCQ == false){
        return (
            <div className="questionTable">
                <div>
                    <ButtonGroup size="small" aria-label="small outlined button group"
                                 style={{width: '100%'}}>
                        <Button className="questionType-button" onClick={handleRangeClick}>Range Question</Button>
                        <Button className="questionType-button" onClick={handleMultipleClick}>Multiple Choice Question</Button>
                        <Button className="questionRemove-button" onClick={handleRemoveClick}>Remove</Button>
                    </ButtonGroup>
                </div>
                    <RangeQuestionFrom questionIndex={questionIndex} rangeOptions={rangeOptions}/>
            </div>)
    } else {
        return (
            <div className="questionTable">
                <div>
                    <ButtonGroup size="small" aria-label="small outlined button group"
                                 style={{width: '100%'}}>
                        <Button className="questionType-button" onClick={handleRangeClick}>Range Question</Button>
                        <Button className="questionType-button" onClick={handleMultipleClick}>Multiple Choice Question</Button>
                        <Button className="questionRemove-button" onClick={handleRemoveClick}>Remove</Button>
                    </ButtonGroup>
                </div>
                <MultipleChoiceQuestionFrom description={description} mcqOptions={mcqOptions}
                                            addAnswerToMCQQuestion={addAnswerToMCQQuestion}
                                            deleteAnswerToMCQQuestion={deleteAnswerToMCQQuestion}
                                            questionIndex={questionIndex}
                                            handleMultiChoiceDesChange={handleMultiChoiceDesChange}
                                            handleMultiAnsChange={handleMultiAnsChange}/>
            </div>)
    }
}

//display the range question
const RangeQuestionFrom = (props) =>{

    // to change the question of range questions (because the scheme in the data base didn't have this para,
    // but we have in the frontend, so we need to change it later, comment this first).

    // const handleRangeQuestionChange = (event) =>{
    // }

    //same situation

    // const handleRangeDesChange = (event) =>{
    //
    // }

        return (
            <div className="range-question-from">
                <form className="rangeQuestion">
                    <p>
                        <label>Question:</label>
                        {/*<input name="Question" placeholder='How likely is this to happen?'/>*/}
                        <TextField id="standard-basic" label="Standard" />
                    </p>

                    <p>
                        <label>Description:</label>
                        <input name="Description"
                               value={props.description}/>
                    </p>
                </form>
            </div>
        );
}

//display the multiple choice question
const MultipleChoiceQuestionFrom = (props) =>{

    const {addAnswerToMCQQuestion,deleteAnswerToMCQQuestion,mcqOptions,questionIndex} = props;


    const addAnswer = (questionIndex) => {
        addAnswerToMCQQuestion(questionIndex);
    }

    const deleteAnswer = (questionIndex,answerIndex) =>{
        deleteAnswerToMCQQuestion(questionIndex,answerIndex);
    }

    // to change the question of range questions (because the scheme in the data base didn't have this para,
    // but we have in the frontend, so we need to change it later, comment this first).

    // const handleMultiChoiceQuestionChange = (event) =>{
    //
    // }

    //
    const handleMultiChoiceDesChange = (event,questionIndex) =>{
        props.handleMultiChoiceDesChange(event,questionIndex);
    }

    const handleMultiAnsChange = (event,questionIndex,answerIndex) =>{
        props.handleMultiAnsChange(event,questionIndex,answerIndex);
    }


        return (
            <div className="multiple-choice-question-from">
                <form className="multipleChoiceQuestion">
                    <p>
                        <label>Question:</label>
                        <input name="Question" placeholder='What’s your favourite fruit?'/>
                    </p>

                    <p>
                        <label>Description:</label>
                        <input name="Description" defaultValue={props.description}
                        onChange={(event) => handleMultiChoiceDesChange(event,questionIndex)}/>
                    </p>
                    {/*add new answer textarea*/}
                    {
                        mcqOptions && mcqOptions.map((item,index) => {
                            return (
                                <p>
                                    <label>Answers</label>
                                    <input name={item} defaultValue={item} onChange={(event) => handleMultiAnsChange(event,questionIndex,index)}/>
                                    <button className="delete-answer-button" type="button"
                                            onClick={(event) => {event.preventDefault(); return deleteAnswer(questionIndex,index)}}> - </button>
                                </p>
                            )
                        })
                    }
                </form>
                <button className="add-answer-button" onClick={(event) =>{event.preventDefault(); return addAnswer(questionIndex)}}> + </button>
            </div>
        );
}

QuestionsContainer.protoTypes = {
    removeQuestion: PropTypes.func
}

export default QuestionsContainer;