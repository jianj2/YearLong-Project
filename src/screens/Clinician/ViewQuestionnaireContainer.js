// Import Libraries.
import React, { useState, useEffect } from "react";
// Import Utilities.
import * as API from "../../utils/API";
// Import Components.
import { Questionnaire } from "../../components/Commons";

/**
 * =============================================================================
 * REACT COMPONENT
 * =============================================================================
 * @date created: 16th Aug 2020
 * @authors: Cary Jin
 *
 * This class handles the rendering of read-only versions of questionnaires
 * This includes both standardised and customised questionnaires.
 *
 */

////////////////////////////////////////////////////////////////////////////////
////                            Define Component                            ////
////////////////////////////////////////////////////////////////////////////////
const ViewQuestionnaireContainer = (props) => {
    const [questionnaire, setSelectedQuestionnaire] = useState({
        questionnaireId: "",
        title: "",
        description: "",
        sections: [],
        isStandard: false
    });

    const [questionnaireData, setQuestionnaireData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [message, setMessage] = useState("");

    // get the questionnaire content from API
    useEffect(() => {

        const prepareQuestionnaire = async () => {
            const [statusCode, data] = await API.getQuestionnaireById(props.questionnaireID);

            if (statusCode === 200) {
                const questionnaire = data;
                setSelectedQuestionnaire(questionnaire);
                let emptyResponse = [];

                questionnaire.sections.forEach((section, sectionIndex) => {
                    emptyResponse[sectionIndex] = [];
                    section.scenarios.forEach((scenario, scenarioIndex) => {
                        emptyResponse[sectionIndex][scenarioIndex] = [];
                        scenario.questions.forEach(
                            (question, questionIndex) => {
                                emptyResponse[sectionIndex][scenarioIndex][questionIndex] = {
                                    value: "",
                                    supplementaryValue: ""
                                };
                            }
                        );
                    });

                });

                setQuestionnaireData(emptyResponse);
                setLoaded(true);

            } else {
                setMessage("Oops! No Questionnaire Available!");
            }
        };
        prepareQuestionnaire();
    }, [props.questionnaireID]);

    return (
        loaded ?
            <Questionnaire
                readOnly={true}
                questionnaire={questionnaire}
                submitQuestionnaire={() => {}}
                questionnaireData={questionnaireData}
                handleQuestionnaireChange={() => {}}
            /> : <div>{message}</div>
    );

};

export default ViewQuestionnaireContainer;
