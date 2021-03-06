// Import Libraries.
import React from "react";
import {
    Input,
    FormControl,
    InputLabel,
    FormHelperText
} from "@material-ui/core";
import PropTypes from "prop-types";

/**
 * =============================================================================
 * REACT COMPONENT CLASS
 * =============================================================================
 * @date created: 18th May 2020
 * @authors: Jin Chen, Guang Yang
 *
 * The QuestionsContainer component handles the container that contains the
 * question in the editing the questionnaire in the Clinician page.
 *
 */

////////////////////////////////////////////////////////////////////////////////
////                            Define Component                            ////
////////////////////////////////////////////////////////////////////////////////
const QuestionsContainer = ({
    isStandard,
    questions,
    scenarioIndex,
    sectionIndex,
    removeQuestion,
    changeToRangeQuestion,
    changeToMCQQuestion,
    addAnswerToMCQQuestion,
    deleteAnswerFromMCQQuestion,
    handleQuestionDesChange,
    handleQuestionOptsChange
}) => {
    return (
        <div className="questions-container">
            {questions && questions.map((item, index) => {
                return (
                    <QuestionForm
                        isStandard={isStandard}
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
    isStandard,
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
    item
}) => {
    const { rangeOptions, description, MCQOptions, isMCQ } = item;

    const handleRangeClick = (e) => {
        e.preventDefault();
        changeToRangeQuestion(sectionIndex, scenarioIndex, questionIndex);
    };
    const handleMultipleClick = (e) => {
        e.preventDefault();
        changeToMCQQuestion(sectionIndex, scenarioIndex, questionIndex);
    };
    const handleRemoveClick = (e) => {
        e.preventDefault();
        removeQuestion(sectionIndex, scenarioIndex, questionIndex);
    };

    const renderHeader = () => {
        return (
            <div className="questionTable-button-group">
                {isStandard ?
                    {
                        0: <button
                            className={!isMCQ ? "questionTable-button-selected" : ""}
                            id="display100"
                            disabled>
                            Performance Rating
                        </button>,
                        1: <button
                            className={isMCQ ? "questionTable-button-selected" : ""}
                            id="display100"
                            disabled
                        >
                            Multiple Choice Question
                        </button>,
                        2: <button
                            className={isMCQ ? "questionTable-button-selected" : ""}
                            id="display100"
                            disabled
                        >
                            Multiple Choice Question
                        </button>
                    }[questionIndex]
                    : isMCQ ?
                        <div className="questionTable-button-group">
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
                        :
                        <div className="questionTable-button-group">
                            <button
                                className={!isMCQ ? "questionTable-button-selected" : ""}
                                onClick={handleRangeClick}
                            >
                                Performance Rating
                            </button>
                        </div>
                }
            </div>
        );
    };

    if (isMCQ === false) {
        return (
            <div className="questionTable">
                {renderHeader()}
                <RangeQuestionFrom
                    isStandard={isStandard}
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
                    isStandard={isStandard}
                    description={description}
                    MCQOptions={MCQOptions}
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
    handleQuestionOptsChange
}) => {
    return (
        <div className="questionTable-form">
            <h3>Ranges</h3>
            <FormControl margin="dense">
                <InputLabel>Minimum Label</InputLabel>
                <Input
                    value={rangeOptions[0]}
                    onChange={(event) => {
                        handleQuestionOptsChange(
                            event,
                            sectionIndex,
                            scenarioIndex,
                            questionIndex,
                            0);
                    }}
                />
                <FormHelperText>Write a word to describe the minimum value on
                    the slider.</FormHelperText>
            </FormControl>

            <FormControl margin="dense">
                <InputLabel>Maximum Label</InputLabel>
                <Input
                    value={rangeOptions[1]}
                    onChange={(event) => {
                        handleQuestionOptsChange(
                            event,
                            sectionIndex,
                            scenarioIndex,
                            questionIndex,
                            1);
                    }}
                />
                <FormHelperText>Write a word to describe the maximum value on
                    the slider.</FormHelperText>
            </FormControl>
        </div>
    );
};

//display the multiple choice question
const MultipleChoiceQuestionFrom = ({
    isStandard,
    addAnswerToMCQQuestion,
    deleteAnswerFromMCQQuestion,
    MCQOptions,
    questionIndex,
    description,
    sectionIndex,
    scenarioIndex,
    handleQuestionDesChange,
    handleQuestionOptsChange
}) => {

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
            {MCQOptions &&
            MCQOptions.map((item, index) => {
                return (
                    <div className="questionTable-answer" key={index}>
                        <div>
                            <FormControl margin="dense">
                                <InputLabel>Answer {index + 1}</InputLabel>
                                <Input
                                    placeholder="Write the Answer."
                                    value={MCQOptions[index]}
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
                        {
                            isStandard ? "" :
                                <button
                                    className="button-circle"
                                    type="button"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        deleteAnswerFromMCQQuestion(sectionIndex, scenarioIndex, questionIndex, index);
                                    }}
                                >
                                    {" "}
                                    -{" "}
                                </button>
                        }

                    </div>
                );
            })}
            {
                isStandard ? "" :
                    <button
                        className="button-circle"
                        onClick={(event) => {
                            event.preventDefault();
                            addAnswerToMCQQuestion(sectionIndex, scenarioIndex, questionIndex);
                        }}
                    >+
                    </button>
            }
        </div>
    );
};

QuestionsContainer.protoTypes = {
    removeQuestion: PropTypes.func
};

export default QuestionsContainer;
