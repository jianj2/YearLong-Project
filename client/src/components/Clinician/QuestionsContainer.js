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
const QuestionsContainer = (props) => {
    const { sections } = props.questionnaire;
    const {
        removeQuestion,
        changeToRangeQuestion,
        changeToMCQQuestion,
        addAnswerToMCQQuestion,
        deleteAnswerToMCQQuestion,
        handleMultiChoiceDesChange,
        handleMultiAnsChange,
    } = props;

    return (
        <div className="questions-container">
            {sections &&
                sections[0].scenarios &&
                sections[0].scenarios[0].questions.map((item, index) => {
                    return (
                        <QuestionForm
                            item={item}
                            questionIndex={index}
                            removeQuestion={removeQuestion}
                            changeToRangeQuestion={changeToRangeQuestion}
                            changeToMCQQuestion={changeToMCQQuestion}
                            addAnswerToMCQQuestion={addAnswerToMCQQuestion}
                            deleteAnswerToMCQQuestion={
                                deleteAnswerToMCQQuestion
                            }
                            handleMultiChoiceDesChange={
                                handleMultiChoiceDesChange
                            }
                            handleMultiAnsChange={handleMultiAnsChange}
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
    changeToMCQQuestion,
    changeToRangeQuestion,
    addAnswerToMCQQuestion,
    deleteAnswerToMCQQuestion,
    handleMultiChoiceDesChange,
    handleMultiAnsChange,
    item,
}) => {
    const { rangeOptions, description, mcqOptions, isMCQ } = item;

    const handleRangeClick = (e) => {
        e.preventDefault();
        changeToRangeQuestion(questionIndex);
    };
    const handleMultipleClick = (e) => {
        e.preventDefault();
        changeToMCQQuestion(questionIndex);
    };
    const handleRemoveClick = (e) => {
        e.preventDefault();
        removeQuestion(questionIndex);
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
                    questionIndex={questionIndex}
                    rangeOptions={rangeOptions}
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
                    deleteAnswerToMCQQuestion={deleteAnswerToMCQQuestion}
                    questionIndex={questionIndex}
                    handleMultiChoiceDesChange={handleMultiChoiceDesChange}
                    handleMultiAnsChange={handleMultiAnsChange}
                />
            </div>
        );
    }
};

//display the range question
const RangeQuestionFrom = (props) => {
    // to change the question of range questions (because the scheme in the data base didn't have this para,
    // but we have in the frontend, so we need to change it later, comment this first).

    // const handleRangeQuestionChange = (event) =>{
    // }

    //same situation

    // const handleRangeDesChange = (event) =>{
    //
    // }

    return (
        <div className="questionTable-form">
            <FormControl margin="dense">
                <InputLabel>Question</InputLabel>
                <Input placeholder="Write the question." />
                <FormHelperText>Write the question.</FormHelperText>
            </FormControl>

            <FormControl margin="dense">
                <InputLabel>Description</InputLabel>
                <Input placeholder="Write the description." />
                <FormHelperText>Write the description.</FormHelperText>
            </FormControl>
        </div>
    );
};

//display the multiple choice question
const MultipleChoiceQuestionFrom = (props) => {
    const {
        addAnswerToMCQQuestion,
        deleteAnswerToMCQQuestion,
        mcqOptions,
        questionIndex,
    } = props;

    const addAnswer = (questionIndex) => {
        addAnswerToMCQQuestion(questionIndex);
    };

    const deleteAnswer = (questionIndex, answerIndex) => {
        deleteAnswerToMCQQuestion(questionIndex, answerIndex);
    };

    // to change the question of range questions (because the scheme in the data base didn't have this para,
    // but we have in the frontend, so we need to change it later, comment this first).

    // const handleMultiChoiceQuestionChange = (event) =>{
    //
    // }

    //
    const handleMultiChoiceDesChange = (event, questionIndex) => {
        props.handleMultiChoiceDesChange(event, questionIndex);
    };

    const handleMultiAnsChange = (event, questionIndex, answerIndex) => {
        props.handleMultiAnsChange(event, questionIndex, answerIndex);
    };

    return (
        <div className="questionTable-form">
            <FormControl margin="dense">
                <InputLabel>Question</InputLabel>
                <Input placeholder="Write the question." />
                <FormHelperText>Write the question.</FormHelperText>
            </FormControl>

            <FormControl margin="dense">
                <InputLabel>Description</InputLabel>
                <Input
                    placeholder="Write the description."
                    onChange={(event) =>
                        handleMultiChoiceDesChange(event, questionIndex)
                    }
                />
                <FormHelperText>Write the description.</FormHelperText>
            </FormControl>

            <h2>Answers</h2>
            {mcqOptions &&
                mcqOptions.map((item, index) => {
                    return (
                        <div className="questionTable-answer">
                            <div>
                                <FormControl margin="dense">
                                    <InputLabel>Description</InputLabel>
                                    <Input
                                        placeholder="Write the description."
                                        onChange={(event) =>
                                            handleMultiAnsChange(
                                                event,
                                                questionIndex,
                                                index
                                            )
                                        }
                                    />
                                    <FormHelperText>
                                        Write the description.
                                    </FormHelperText>
                                </FormControl>
                            </div>
                            <button
                                className="delete-answer-button"
                                type="button"
                                onClick={(event) => {
                                    event.preventDefault();
                                    return deleteAnswer(
                                        questionIndex,
                                        index
                                    );
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
                    return addAnswer(questionIndex);
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
