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

// handles rendering of TopContainer in the Clinician page

const QuestionsContainer = (props) => {
        return (
            <div className="questions-container">
                {
                    props.questionnaire.sections && props.questionnaire.sections[0].scenarios
                    && props.questionnaire.sections[0].scenarios[0].questions.map((item,index) => {
                    return (
                        <QuestionForm item={item} index={index} removeQuestion={props.removeQuestion}/>
                    )
                    })
                }
             </div>
        );
};

const QuestionForm = (props) =>{

    const [isMCQ,setState] = useState(props.item.isMCQ);
    console.log(isMCQ);

    const handleRangeClick = () =>{
        setState(false);
    }
    const handleMultipleClick = () =>{
        setState(true);
    }
    const handleRemoveClick = () =>{
        props.removeQuestion(props.index);
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
                    <RangeQuestionFrom rangeOptions={props.item.rangeOptions}/>
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
                <MultipleChoiceQuestionFrom description={props.item.description} mcqOptions={props.item.mcqOptions}/>
            </div>)
    }
}

const RangeQuestionFrom = (props) =>{
        return (
            <div className="range-question-from">
                <form className="rangeQuestion">
                    <p>
                        <label>Question:</label>
                        <input name="Question" placeholder='How likely is this to happen?'/>
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


const MultipleChoiceQuestionFrom = (props) =>{
    const [mcqOptions, setState] = useState(props.mcqOptions);

        const addAnswer = () => {
            setState([...mcqOptions, mcqOptions.length]);
        }

        const deleteAnswer = (index) =>{
            const list = [...mcqOptions];
            list.splice(index,1);
            setState(list);
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
                        <input name="Description" defaultValue={props.description}/>
                    </p>
                    {/*add new answer textarea*/}
                    {
                        props.mcqOptions && props.mcqOptions.map((item,index) => {
                            return (
                                <p key={item} index={index}>
                                    <label>Answers</label>
                                    <input name={item} defaultValue={item}/>
                                    <button className="delete-answer-button" type="button" onClick={(index) => deleteAnswer(index)}> - </button>
                                </p>
                            )
                        })
                    }
                </form>
                <button className="add-answer-button" onClick={addAnswer}> + </button>
            </div>
        );
}

QuestionsContainer.protoTypes = {
    removeQuestion: PropTypes.func
}

export default QuestionsContainer;