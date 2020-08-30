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
import {
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    FormControl,
    FormHelperText,
    Input,
    InputLabel,
    Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const useStyles = makeStyles((theme) => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    panel: {
        width: "95%",
        backgroundColor: "#101132",
    },
    summary: {
        paddingLeft: "2vw",
    },
    details: {
        display: "block",
        padding: 0,
    },
}));

const SectionsContainer = ({
    removeQuestion,
    addQuestion,
    addScenario,
    removeScenario,
    changeToRangeQuestion,
    changeToMCQQuestion,
    addAnswerToMCQQuestion,
    deleteAnswerFromMCQQuestion,
    handleQuestionDesChange,
    handleQuestionOptsChange,
    handleSecTitleChange,
    handleSceDesChange,
    sections,
}) => {
    const classes = useStyles();
    return (
        <div className="sections-container">
            {sections &&
                sections.map((item, index) => {
                    return (
                        <ExpansionPanel
                            className={classes.panel}
                            TransitionProps={{ unmountOnExit: true }}
                        >
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                className={classes.summary}
                            >
                                {/*<div className="delete-section-button">*/}
                                {/*    <button className="button"*/}
                                {/*            onClick={(event)=>{*/}
                                {/*                event.preventDefault();*/}
                                {/*                // removeScenario(index);*/}
                                {/*            }}>*/}
                                {/*        <DeleteForeverIcon />*/}
                                {/*    </button>*/}
                                {/*</div>*/}

                                <Typography>Section {index + 1}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails className={classes.details}>
                                <Section
                                    item={item}
                                    key={item._id}
                                    sectionIndex={index}
                                    removeQuestion={removeQuestion}
                                    addQuestion={addQuestion}
                                    addScenario={addScenario}
                                    removeScenario={removeScenario}
                                    changeToRangeQuestion={
                                        changeToRangeQuestion
                                    }
                                    changeToMCQQuestion={changeToMCQQuestion}
                                    addAnswerToMCQQuestion={
                                        addAnswerToMCQQuestion
                                    }
                                    deleteAnswerFromMCQQuestion={
                                        deleteAnswerFromMCQQuestion
                                    }
                                    handleSecTitleChange={handleSecTitleChange}
                                    handleSceDesChange={handleSceDesChange}
                                    handleQuestionDesChange={
                                        handleQuestionDesChange
                                    }
                                    handleQuestionOptsChange={
                                        handleQuestionOptsChange
                                    }
                                />
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    );
                })}
        </div>
    );
};

const Section = ({
    item,
    sectionIndex,
    removeQuestion,
    addQuestion,
    addScenario,
    removeScenario,
    changeToRangeQuestion,
    changeToMCQQuestion,
    addAnswerToMCQQuestion,
    deleteAnswerFromMCQQuestion,
    handleSceDesChange,
    handleSecTitleChange,
    handleQuestionDesChange,
    handleQuestionOptsChange,
}) => {
    const { scenarios, title } = item;

    const handleTitleChange = (event, sectionIndex) => {
        handleSecTitleChange(event, sectionIndex);
    };

    return (
        <div className="section">
            <div className="section-title">
                <FormControl margin="dense">
                    <InputLabel>Section Title</InputLabel>
                    <Input
                        placeholder="Write the section title."
                        value={title}
                        onChange={(event) => {
                            handleTitleChange(event, sectionIndex);
                        }}
                    />
                    <FormHelperText>Write the section title.</FormHelperText>
                </FormControl>
            </div>
            <ScenariosContainer
                scenarios={scenarios}
                sectionIndex={sectionIndex}
                removeQuestion={removeQuestion}
                addQuestion={addQuestion}
                removeScenario={removeScenario}
                changeToRangeQuestion={changeToRangeQuestion}
                changeToMCQQuestion={changeToMCQQuestion}
                addAnswerToMCQQuestion={addAnswerToMCQQuestion}
                deleteAnswerFromMCQQuestion={deleteAnswerFromMCQQuestion}
                handleSceDesChange={handleSceDesChange}
                handleQuestionDesChange={handleQuestionDesChange}
                handleQuestionOptsChange={handleQuestionOptsChange}
            />

            <div className="add-delete-button-div">
                <div className="add-scenario-button">
                    <button
                        className="button"
                        onClick={(event) => {
                            event.preventDefault();
                            addScenario(sectionIndex);
                        }}
                    >
                        ADD NEW LISTENING SCENARIO
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SectionsContainer;