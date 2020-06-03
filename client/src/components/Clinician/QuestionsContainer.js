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

import React, { useState } from "react";
import {
    Input,
    FormControl,
    InputLabel,
    FormHelperText,
    InputAdornment,
    IconButton,
} from "@material-ui/core";

import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import { render } from "react-dom";
import BottomContainer from "./BottomContainer";

import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

// import style
import "../../styles/main.css";

// handles rendering of TopContainer in the Clinician page
const QuestionsContainer = ({
                                questions,
                                scenarioIndex,
                                sectionIndex,
                                removeQuestion,
                                changeToRangeQuestion,
                                changeToMCQQuestion,
                                addAnswerToMCQQuestion,
                                deleteAnswerFromMCQQuestion,
                                handleQuestionDesChange,
                                handleQuestionOptsChange,
                            } ) => {

    console.log(scenarioIndex);
    return (
        <div className="questions-container">
            {questions && questions.map((item, index) => {
                    return (
                        <QuestionForm
                            item={item}
                            key={item._id}
                            questionIndex={index}
                            scenarioIndex={scenarioIndex}
                            sectionIndex={sectionIndex}
                            removeQuestion={removeQuestion}
                            changeToRangeQuestion={changeToRangeQuestion}
                            changeToMCQQuestion={changeToMCQQuestion}
                            addAnswerToMCQQuestion={addAnswerToMCQQuestion}
                            deleteAnswerFromMCQQuestion={
                                deleteAnswerFromMCQQuestion
                            }
                            handleQuestionDesChange={
                                handleQuestionDesChange
                            }
                            handleQuestionOptsChange={handleQuestionOptsChange}
                        />
                    );
                })}
        </div>
    );
};

//decide which kind of question to show
const QuestionForm = ({
    questionIndex,
    removeQuestion,
    sectionIndex,
    scenarioIndex,
    changeToMCQQuestion,
    changeToRangeQuestion,
    addAnswerToMCQQuestion,
                          deleteAnswerFromMCQQuestion,
                          handleQuestionDesChange,
                          handleQuestionOptsChange,
    item,
}) => {
    const { rangeOptions, description, mcqOptions, isMCQ} = item;

    const handleRangeClick = (e) => {
        e.preventDefault();
        changeToRangeQuestion(sectionIndex,scenarioIndex,questionIndex);
    };
    const handleMultipleClick = (e) => {
        e.preventDefault();
        changeToMCQQuestion(sectionIndex,scenarioIndex,questionIndex);
    };
    const handleRemoveClick = (e) => {
        e.preventDefault();
        removeQuestion(sectionIndex,scenarioIndex,questionIndex);
    };

    const renderHeader = () => {
        return (
            <div className="questionTable-button-group">
                <button
                    className={!isMCQ ? "questionTable-button-selected" : ""}
                    onClick={handleRangeClick}
                >
                    Range Question
                </button>
                <button
                    className={isMCQ ? "questionTable-button-selected" : ""}
                    onClick={handleMultipleClick}
                >
                    Multiple Choice Question
                </button>
                <button
                    id="questionTable-remove-button"
                    onClick={handleRemoveClick}
                >
                    Remove
                </button>
            </div>
        );
    };

    if (isMCQ == false) {
        return (
            <div className="questionTable">
                {renderHeader()}
                <RangeQuestionFrom
                    sectionIndex={sectionIndex}
                    scenarioIndex={scenarioIndex}
                    questionIndex={questionIndex}
                    rangeOptions={rangeOptions}
                    handleQuestionDesChange={handleQuestionDesChange}
                    handleQuestionOptsChange={handleQuestionOptsChange}
                />
            </div>
        );
    } else {
        return (
            <div className="questionTable">
                {renderHeader()} 
                <MultipleChoiceQuestionFrom
                    description={description}
                    mcqOptions={mcqOptions}
                    addAnswerToMCQQuestion={addAnswerToMCQQuestion}
                    deleteAnswerFromMCQQuestion={deleteAnswerFromMCQQuestion}
                    sectionIndex={sectionIndex}
                    scenarioIndex={scenarioIndex}
                    questionIndex={questionIndex}
                    handleQuestionDesChange={handleQuestionDesChange}
                    handleQuestionOptsChange={handleQuestionOptsChange}
                />
            </div>
        );
    }
};

//display the range question
const RangeQuestionFrom = ({
                               sectionIndex,
                               scenarioIndex,
                               questionIndex,
                               rangeOptions,
                               handleQuestionDesChange,
                               handleQuestionOptsChange}) => {

    return (
        <div className="questionTable-form">

            {/*<FormControl margin="dense">*/}
            {/*    <InputLabel>Description</InputLabel>*/}
            {/*    <Input*/}
            {/*        placeholder="Write the question."*/}
            {/*    />*/}
            {/*    <FormHelperText>Write the question.</FormHelperText>*/}
            {/*</FormControl>*/}

            <h3>Ranges</h3>
            <FormControl margin="dense">
                <InputLabel>RangeStarts</InputLabel>
                <Input
                    placeholder="Write the Range Starts."
                    value={rangeOptions[0]}
                    onChange={(event) =>{
                        handleQuestionOptsChange(
                            event,
                            sectionIndex,
                            scenarioIndex,
                            questionIndex,
                            0);
                    }}
                />
                <FormHelperText>Write the Range Starts.</FormHelperText>
            </FormControl>

            <FormControl margin="dense">
                <InputLabel>RangeEnds</InputLabel>
                <Input
                    placeholder="Write the Range Ends."
                    value={rangeOptions[1]}
                    onChange={(event) =>{
                        handleQuestionOptsChange(
                            event,
                            sectionIndex,
                            scenarioIndex,
                            questionIndex,
                            1);
                    }}
                />
                <FormHelperText>Write the Range Ends.</FormHelperText>
            </FormControl>
        </div>
    );
};

//display the multiple choice question
const MultipleChoiceQuestionFrom = (props) => {
    const {
        addAnswerToMCQQuestion,
        deleteAnswerFromMCQQuestion,
        mcqOptions,
        questionIndex,
        description,
        sectionIndex,
        scenarioIndex,
        handleQuestionDesChange,
        handleQuestionOptsChange
    } = props;

    // const addAnswer = (sectionIndex,scenarioIndex,questionIndex) => {
    //     addAnswerToMCQQuestion(sectionIndex,scenarioIndex,questionIndex);
    // };

    // const deleteAnswer = (sectionIndex,scenarioIndex,questionIndex, answerIndex) => {
    //     deleteAnswerToMCQQuestion(sectionIndex,scenarioIndex,questionIndex, answerIndex);
    // };

    // to change the question of range questions (because the scheme in the data base didn't have this para,
    // but we have in the frontend, so we need to change it later, comment this first).

    // const handleMultiChoiceQuestionChange = (event) =>{
    //
    // }

    //
    // const handleMultiChoiceDesChange = (event, questionIndex) => {
    //     props.handleMultiChoiceDesChange(event, questionIndex);
    // };
    //
    // const handleMultiAnsChange = (event, questionIndex, answerIndex) => {
    //     props.handleMultiAnsChange(event, questionIndex, answerIndex);
    // };

    return (
        <div className="questionTable-form">
            <FormControl margin="dense">
                <InputLabel>Description</InputLabel>
                <Input
                    placeholder="Write the description."
                    value={description}
                    onChange={(event) =>
                        handleQuestionDesChange(
                            event,
                            sectionIndex,
                            scenarioIndex,
                            questionIndex
                        )
                    }
                />
                <FormHelperText>Write the description.</FormHelperText>
            </FormControl>

            <h3>Answers</h3>
            {mcqOptions &&
                mcqOptions.map((item, index) => {
                    return (
                        <div className="questionTable-answer" key={index}>
                            <div>
                                <FormControl margin="dense">
                                    <InputLabel>Answer {index+1}</InputLabel>
                                    <Input
                                        placeholder="Write the Answer."
                                        value={mcqOptions[index]}
                                        onChange={(event) =>
                                            handleQuestionOptsChange(
                                                event,
                                                sectionIndex,
                                                scenarioIndex,
                                                questionIndex,
                                                index
                                            )
                                        }
                                    />
                                    <FormHelperText>
                                        Write the Answer.
                                    </FormHelperText>
                                </FormControl>
                            </div>
                            <button
                                className="delete-answer-button"
                                type="button"
                                onClick={(event) => {
                                    event.preventDefault();
                                    deleteAnswerFromMCQQuestion(sectionIndex,scenarioIndex,questionIndex, index);
                                }}
                            >
                                {" "}
                                -{" "}
                            </button>
                        </div> 
                    );
            })} 
            <button
                className="add-answer-button"
                onClick={(event) => {
                    event.preventDefault();
                    addAnswerToMCQQuestion(sectionIndex,scenarioIndex,questionIndex);
                }}
            >
                {" "}
                +{" "}
            </button>
        </div>
    );
};

QuestionsContainer.protoTypes = {
    removeQuestion: PropTypes.func,
};

export default QuestionsContainer;
