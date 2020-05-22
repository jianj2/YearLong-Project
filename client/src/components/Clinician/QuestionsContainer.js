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
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import {render} from "react-dom";
import BottomContainer from "./BottomContainer";

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

// Import styles.
import "../../styles/clinician.css";
import "../../styles/main.css";
import PropTypes from "prop-types";

// handles rendering of TopContainer in the Clinician page

const QuestionsContainer = (props) => {
        return (
            <div className="questions-container">
                {props.questionTable && props.questionTable.map((item,index) => {
                    return (
                        <QuestionTable item={item} index={index} removeQuestion={props.removeQuestion}/>
                    )
                    })
                }
                {/*{props.questionTable}*/}
                {/*<div className="questionTableThree" style={{*/}
                {/*    alignItems: 'center', borderRadius: '25px',*/}
                {/*    paddingBlock: '100px', border: '1px solid white',*/}
                {/*    marginLeft: '80px', marginRight: '80px'*/}
                {/*}}>*/}
                {/*    <div>*/}
                {/*        <ButtonGroup size="small" aria-label="small outlined button group"*/}
                {/*                     style={{width: '100%'}}>*/}
                {/*            <Button className="questionType-button" >Range Question</Button>*/}
                {/*            <Button className="questionType-button" >Multiple Choice Question</Button>*/}
                {/*            <Button className="questionRemove-button" >Remove</Button>*/}
                {/*        </ButtonGroup>*/}
                {/*    </div>*/}
                {/*    <MultipleChoiceQuestionFrom/>*/}
                {/*</div>*/}
             </div>
        );
};

const QuestionFrom = (props) =>{
    if (props.whichFrom == 0){
        return <RangeQuestionFrom />
    } else {
        return <MultipleChoiceQuestionFrom />
    }
}

const RangeQuestionFrom = () =>{
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
                               placeholder='Please select the slider to number. 0 is unlikely. 1 is will happen for sure.'/>
                    </p>
                </form>
            </div>
        );
}



const MultipleChoiceQuestionFrom = () =>{
        const [number, setState] = useState([0,1,2,3]);
        const addAnswer = () => {
            setState([...number, number.length]);
            // console.log(number.length);
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
                        <input name="Description" placeholder='Please select one of the options below:'/>
                    </p>
                    {/*add new answer textarea*/}
                    {
                        number && number.map(item => {
                            return (
                                <p key={item}>
                                    <label>Answers</label>
                                    <input name={item}/>
                                </p>
                            )
                        })
                    }
                </form>
                <button className="add-answer-button" onClick={() => setState(addAnswer)}> +</button>
            </div>
        );
}

const QuestionTable = (props) =>{

    const [whichForm,setState] = useState(0);
    const handleRangeClick = () =>{
        setState(0);
    }
    const handleMultipleClick = () =>{
        setState(1);
    }
    const handleRemoveClick = () =>{
        props.removeQuestion(props.index);
    }

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
            <QuestionFrom whichFrom={whichForm}/>
        </div>
    );
}



QuestionsContainer.protoTypes = {
    removeQuestion: PropTypes.func
}

export default QuestionsContainer;
