// Import Libraries.
import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
// Import Components.
import Question from "./Question";

/**
 * =============================================================================
 * REACT COMPONENT FUNCTION
 * =============================================================================
 * @date created: 17th May 2020
 * @authors:    Uvin Abeysinghe, Waqas Rehmani, Ashley Curtis,
 *              Mayank Sharma, Jian Jiao
 *
 * The Questionnaire component defines a collection of questions. These
 * will be visible when questionnaires are fillable.
 *
 */


const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

////////////////////////////////////////////////////////////////////////////////
////                            Define Component                            ////
////////////////////////////////////////////////////////////////////////////////
const Questionnaire = ({
    readOnly,
    questionnaire,
    submitQuestionnaire,
    questionnaireData,
    commentData,
    handleCommentChange,
    handleQuestionnaireChange
}) => {
    const { errors } = useForm();

    const [open, setOpen] = React.useState(false);
    const [unansweredSectionIndex, setUnansweredSectionIndex] = React.useState(-1);
    const [unansweredScenarioIndex, setUnansweredScenarioIndex] = React.useState(-1);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    const verifyAllScenariosAnswered = () => {
        for (let [sectionIndex, section] of questionnaireData.entries()) {
            for (let [scenarioIndex, scenario] of section.entries()) {
                if (scenario[0].supplementaryValue === "") { //if supplementaryValue is "", it means all the question's value should be filled
                    for (let question of scenario) {
                        if (question.value === undefined) {
                            setUnansweredSectionIndex(sectionIndex);
                            setUnansweredScenarioIndex(scenarioIndex);
                            return false;
                        } // if supplementaryValue is not "", others question is not applicable, we don't have to check
                    }
                }
            }
        }
        return true;
    };

    // Method: Called when we submit the questionnaire
    const onSubmit = (e) => {

        e.preventDefault();
        const flag = verifyAllScenariosAnswered();
        if (flag === true) {
            submitQuestionnaire();
        } else {
            setOpen(true);
        }
    };

    // Method: Called when we something in the questionnaire changes.
    const onQuestionChange = (
        sectionIndex,
        scenarioIndex,
        questionIndex,
        data
    ) => {
        if (sectionIndex === unansweredSectionIndex && scenarioIndex === unansweredScenarioIndex) {
            setUnansweredSectionIndex(-1);
            setUnansweredScenarioIndex(-1);
        }
        handleQuestionnaireChange(
            sectionIndex,
            scenarioIndex,
            questionIndex,
            data
        );
    };

    return (
        <form onSubmit={onSubmit} className="questionaire-container"
              id="questionaire-container">
            <h1>{questionnaire.title}</h1>

            {questionnaire.sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="section-container">
                    <h2>{section.title}</h2>
                    {section.scenarios.map((scenario, scenarioIndex) => {
                        let style = {};
                        if (unansweredSectionIndex === sectionIndex && unansweredScenarioIndex === scenarioIndex) {
                            style = { borderColor: "red" };
                        }
                        return (
                            <div
                                key={scenarioIndex}
                                className="scenario-container"
                                style={style}
                            >
                                <p><span
                                    className="scenario-number">{scenarioIndex + 1}</span> {scenario.description}
                                </p>
                                <p> Please rate your performance. </p>
                                {scenario.questions.map(
                                    (question, questionIndex) => (
                                        <Question
                                            readOnly={readOnly}
                                            error={true}
                                            key={questionIndex}
                                            questionIndex={questionIndex}
                                            sectionIndex={sectionIndex}
                                            scenarioIndex={scenarioIndex}
                                            description={question.description}
                                            isMCQ={question.isMCQ}
                                            MCQOptions={question.MCQOptions}
                                            rangeOptions={question.rangeOptions}
                                            onQuestionChange={onQuestionChange}
                                            data={
                                                questionnaireData[sectionIndex][
                                                    scenarioIndex
                                                    ][questionIndex]
                                            }
                                            // is not applicable selected for slider question
                                            isNotApplicable={questionnaireData[sectionIndex][scenarioIndex][0].supplementaryValue === "" ? false : true}

                                        />
                                    )
                                )}
                                {
                                    readOnly
                                        ? null
                                        : <div className="comment-container">
                                            <TextField
                                                className="comment-input"
                                                id="outlined-multiline-static"
                                                label="COMMENT"
                                                multiline
                                                variant="outlined"
                                                rows={4}
                                                onChange={(e) => handleCommentChange(sectionIndex, scenarioIndex, e.target.value)}
                                                value={commentData[sectionIndex][scenarioIndex]}
                                                placeholder="Add Comment Here"
                                            />
                                        </div>
                                }
                            </div>
                        );
                    })}
                </div>
            ))}

            <div className="questionaire-submit-button">
                {readOnly ? null : (
                    <button
                        id="review"
                        className={
                            errors.code ? "button-disabled" : "button"
                        }
                    >
                        R E V I E W
                    </button>
                )}
            </div>
            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }}
                      open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    Please Complete All The Questions!
                </Alert>
            </Snackbar>
        </form>
    );

};

export default Questionnaire;
