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
import ScenariosContainer from "./ScenariosContainer";
import {FormControl, FormHelperText, Input, InputLabel} from "@material-ui/core";

const SectionsContainer = (
        {removeQuestion,
        addQuestion,
        addScenario,
        changeToRangeQuestion,
        changeToMCQQuestion,
        addAnswerToMCQQuestion,
        deleteAnswerToMCQQuestion,
        handleMultiChoiceDesChange,
        handleMultiAnsChange,
        sections}) => {

    return (
        <div className="sections-container">
            {
                sections && sections.map((item, index) => {
                    return(
                        <Section
                            item={item}
                            key={item._id}
                            sectionIndex={index}
                            removeQuestion={removeQuestion}
                            addQuestion={addQuestion}
                            addScenario={addScenario}
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

const Section = (
        {item,
        sectionIndex,
        removeQuestion,
        addQuestion,
        addScenario,
        changeToRangeQuestion,
        changeToMCQQuestion,
        addAnswerToMCQQuestion,
        deleteAnswerToMCQQuestion,
        handleMultiChoiceDesChange,
        handleMultiAnsChange}) =>{

    const {scenarios,title} = item;

    return (
        <div className="section">

            <div className="section-title">
                <FormControl margin="dense">
                    <InputLabel>Section Title</InputLabel>
                    <Input
                        placeholder="Write the section title."
                        value={title}
                    />
                    <FormHelperText>Write the section title.</FormHelperText>
                </FormControl>
            </div>

            <ScenariosContainer
                scenarios={scenarios}
                sectionIndex={sectionIndex}
                removeQuestion={removeQuestion}
                addQuestion={addQuestion}
                changeToRangeQuestion={changeToRangeQuestion}
                changeToMCQQuestion={changeToMCQQuestion}
                addAnswerToMCQQuestion={addAnswerToMCQQuestion}
                deleteAnswerToMCQQuestion={deleteAnswerToMCQQuestion}
                handleMultiChoiceDesChange={handleMultiChoiceDesChange}
                handleMultiAnsChange={handleMultiAnsChange}/>

            <div className="add-scenario-button">
                <button className="button"
                        onClick={(event)=>{
                            event.preventDefault();
                            addScenario();
                        }}>
                    ADD NEW SCENARIO
                </button>
            </div>
        </div>
    );
}

export default SectionsContainer;