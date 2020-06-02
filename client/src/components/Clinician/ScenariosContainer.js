/**
 * ====================================================================
 * REACT COMPONENT CLASS
 * ====================================================================
 * @date created: 1st June 2020
 * @authors: Jin Chen, Guang Yang
 *
 * The Sidebar component defines our SideBar for the application. This
 * will visible at the top of our application.
 *
 * This file is used to display the Sidebar component
 *
 */

import React from "react";
import {FormControl, FormHelperText, Input, InputLabel} from "@material-ui/core";
import QuestionsContainer from "./QuestionsContainer";

const ScenariosContainer = (
        {scenarios,
        removeQuestion,
        addQuestion,
        changeToRangeQuestion,
        changeToMCQQuestion,
        addAnswerToMCQQuestion,
        deleteAnswerToMCQQuestion,
        handleMultiChoiceDesChange,
        handleMultiAnsChange}) => {
    return (
        <div className="scenarios-container">
            {
                scenarios && scenarios.map((item, index) => {
                    return(
                        <Scenario
                            item={item}
                            key={item._id}
                            scenarioIndex={index}
                            removeQuestion={removeQuestion}
                            addQuestion={addQuestion}
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

const Scenario = (
        {item,
        removeQuestion,
        addQuestion,
        changeToRangeQuestion,
        changeToMCQQuestion,
        addAnswerToMCQQuestion,
        deleteAnswerToMCQQuestion,
        handleMultiChoiceDesChange,
        handleMultiAnsChange}) =>{

    const {questions,description} = item;

    return (
        <div className="scenario">

            <FormControl margin="dense">
                <InputLabel>Scenario description</InputLabel>
                <Input
                    value={description}
                    placeholder="Write the scenario description."
                />
                <FormHelperText>Write the scenario description.</FormHelperText>
            </FormControl>

            <QuestionsContainer
                questions={questions}
                removeQuestion={removeQuestion}
                addQuestion={addQuestion}
                changeToRangeQuestion={changeToRangeQuestion}
                changeToMCQQuestion={changeToMCQQuestion}
                addAnswerToMCQQuestion={addAnswerToMCQQuestion}
                deleteAnswerToMCQQuestion={deleteAnswerToMCQQuestion}
                handleMultiChoiceDesChange={handleMultiChoiceDesChange}
                handleMultiAnsChange={handleMultiAnsChange}/>
                
            <div className="add-question-button">
                <button className="button"
                        onClick={(event)=>{
                            event.preventDefault();
                            addQuestion();
                        }}>
                    ADD NEW QUESTION
                </button>
            </div>
        </div>

    )
}
export default ScenariosContainer;