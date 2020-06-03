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
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    FormControl,
    FormHelperText,
    Input,
    InputLabel,
    Typography
} from "@material-ui/core";
import QuestionsContainer from "./QuestionsContainer";

const useStyles = makeStyles(theme => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    panel:{
        width: '90%',
        backgroundColor:'rgba(0,0,0,0.2)',
    },
    summary:{
        paddingLeft:'2vw',
    },
    details:{
        display:'block',
        padding:0,
    },
}));

const ScenariosContainer = (
        {scenarios,
        sectionIndex,
        removeQuestion,
        removeScenario,
        addQuestion,
        changeToRangeQuestion,
        changeToMCQQuestion,
        addAnswerToMCQQuestion,
        deleteAnswerToMCQQuestion,
        handleSceDesChange,
        handleMultiChoiceDesChange,
        handleMultiAnsChange}) => {

    const classes = useStyles();

    return (
        <div className="scenarios-container">

                    {
                        scenarios && scenarios.map((item, index) => {
                            return(
                                    <ExpansionPanel className={classes.panel}>
                                        <ExpansionPanelSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            className={classes.summary}
                                        >
                                            <div className="delete-scenario-button">
                                                <button className="button"
                                                        onClick={(event)=>{
                                                            event.preventDefault();
                                                            removeScenario(sectionIndex,index);
                                                        }}>
                                                    <DeleteForeverIcon />
                                                </button>
                                            </div>

                                            <Typography>Scenario {index+1}</Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails className={classes.details}>
                                    <Scenario
                                        item={item}
                                        key={item._id}
                                        sectionIndex={sectionIndex}
                                        scenarioIndex={index}
                                        removeQuestion={removeQuestion}
                                        addQuestion={addQuestion}
                                        changeToRangeQuestion={changeToRangeQuestion}
                                        changeToMCQQuestion={changeToMCQQuestion}
                                        addAnswerToMCQQuestion={addAnswerToMCQQuestion}
                                        deleteAnswerToMCQQuestion={deleteAnswerToMCQQuestion}
                                        handleSceDesChange={handleSceDesChange}
                                        handleMultiChoiceDesChange={handleMultiChoiceDesChange}
                                        handleMultiAnsChange={handleMultiAnsChange}/>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                            )})}
        </div>
    );
};

const Scenario = (
        {item,
        sectionIndex,
        scenarioIndex,
        removeQuestion,
        addQuestion,
        changeToRangeQuestion,
        changeToMCQQuestion,
        addAnswerToMCQQuestion,
        deleteAnswerToMCQQuestion,
        handleSceDesChange,
        handleMultiChoiceDesChange,
        handleMultiAnsChange}) =>{

    const {questions,description} = item;

    // const handleDesChange = (event,sectionIndex,scenarioIndex) =>{
    //     handleSceDesChange(event,sectionIndex,scenarioIndex);
    // }

    return (
        <div className="scenario">

            <div className="scenario-description">
                <FormControl margin="dense">
                    <InputLabel>Scenario description</InputLabel>
                    <Input
                        value={description}
                        placeholder="Write the scenario description."
                        onChange={(event) => {
                            handleSceDesChange(event, sectionIndex, scenarioIndex);
                        }}
                    />
                    <FormHelperText>Write the scenario description.</FormHelperText>
                </FormControl>
            </div>

            <QuestionsContainer
                questions={questions}
                scenarioIndex={scenarioIndex}
                sectionIndex={sectionIndex}
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
                            addQuestion(sectionIndex,scenarioIndex);
                        }}>
                    ADD NEW QUESTION
                </button>
            </div>
        </div>

    )
}
export default ScenariosContainer;