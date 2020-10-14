/**
 * =============================================================================
 * REACT COMPONENT CLASS
 * =============================================================================
 * @date created: 1st June 2020
 * @authors: Jin Chen, Guang Yang
 *
 * The ScenariosContainer component handles the container that contains the
 * scenario in the editing the questionnaire in the Clinician page.
 *
 */

// Import Libraries.
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { MdDelete } from "react-icons/md";
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
// Import Components.
import QuestionsContainer from "./QuestionsContainer";

const useStyles = makeStyles((theme) => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular
    },
    panel: {
        width: "95%",
        backgroundColor: "rgba(0,0,0,0.2)"
    },
    summary: {
        paddingLeft: "2vw"
    },
    details: {
        display: "block",
        padding: 0
    }
}));

////////////////////////////////////////////////////////////////////////////////
////                            Define Component                            ////
////////////////////////////////////////////////////////////////////////////////
const ScenariosContainer = ({
    scenarios,
    sectionIndex,
    removeQuestion,
    removeScenario,
    addQuestion,
    changeToRangeQuestion,
    changeToMCQQuestion,
    addAnswerToMCQQuestion,
    deleteAnswerFromMCQQuestion,
    handleSceDesChange,
    handleQuestionDesChange,
    handleQuestionOptsChange
}) => {
    const classes = useStyles();

    return (
        <div className="scenarios-container">
            {scenarios &&
            scenarios.map((item, index) => {
                return (
                    <ExpansionPanel className={classes.panel}>
                        <ExpansionPanelSummary
                            aria-label="Expand"
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className={classes.summary}
                        >
                            <div
                                className="delete-scenario-button"
                                onClick={(event) => event.stopPropagation()}
                                onFocus={(event) => event.stopPropagation()}
                            >
                                <button
                                    className="button"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        removeScenario(sectionIndex, index);
                                    }}
                                >
                                    <MdDelete/>
                                </button>
                            </div>
                            <Typography>Listening
                                Scenario {index + 1}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={classes.details}>
                            <Scenario
                                item={item}
                                key={item._id}
                                sectionIndex={sectionIndex}
                                scenarioIndex={index}
                                removeQuestion={removeQuestion}
                                addQuestion={addQuestion}
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



////////////////////////////////////////////////////////////////////////////////
////                            Define Component                            ////
////////////////////////////////////////////////////////////////////////////////
const Scenario = ({
    item,
    sectionIndex,
    scenarioIndex,
    removeQuestion,
    addQuestion,
    changeToRangeQuestion,
    changeToMCQQuestion,
    addAnswerToMCQQuestion,
    deleteAnswerFromMCQQuestion,
    handleSceDesChange,
    handleQuestionDesChange,
    handleQuestionOptsChange
}) => {
    const { questions, description } = item;

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
                            handleSceDesChange(
                                event,
                                sectionIndex,
                                scenarioIndex
                            );
                        }}
                    />
                    <FormHelperText>
                        Write the scenario description.
                    </FormHelperText>
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
                deleteAnswerFromMCQQuestion={deleteAnswerFromMCQQuestion}
                handleQuestionDesChange={handleQuestionDesChange}
                handleQuestionOptsChange={handleQuestionOptsChange}
            />

            <div className="add-question-button">
                <button
                    className="button"
                    onClick={(event) => {
                        event.preventDefault();
                        addQuestion(sectionIndex, scenarioIndex);
                    }}
                >
                    ADD NEW QUESTION
                </button>
            </div>
        </div>
    );
};
export default ScenariosContainer;
