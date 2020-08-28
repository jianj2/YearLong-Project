import React, { useState, useEffect } from "react";
import * as API from "../../utils/api";
import Questionnaire from "../Questionnaire";
/**
 * ====================================================================
 * REACT COMPONENT
 * ====================================================================
 * @date created: 16th Aug 2020
 * @authors: Cary Jin
 *
 * This class handles the rendering of read-only versions of questionnaires
 * This includes both standardised and customised questionnaires.
 *
 */

const AdminViewStandardQuestionnaire = (props)=>{
    const [questionnaire, setSelectedQuestionnaire] = useState({
        questionnaireId: "",
        title: "",
        description: "",
        sections: [],
        isStandard: true,
    });

    const [questionnaireData, setQuestionnaireData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(()=>{

        const prepareQuestionnaire = async () => {
            const questionnaire = await API.getAndSetSpecificQuestionnaire(props.questionnaireID,setSelectedQuestionnaire);
            if (questionnaire != null){
                setSelectedQuestionnaire(questionnaire);
                let emptyResponse = [];
                console.log(`current q: ${questionnaire.title}`);
               
                
                    questionnaire.sections.forEach((section, sectionIndex) => {
                    emptyResponse[sectionIndex] = [];
                    section.scenarios.forEach((scenario, scenarioIndex) => {
                        emptyResponse[sectionIndex][scenarioIndex] = [];
                        scenario.questions.forEach(
                            (question, questionIndex) => {
                                emptyResponse[sectionIndex][scenarioIndex][questionIndex] = {
                                    value: "",
                                    supplementaryValue: "",
                                };
                            }
                        );
                    });
                
                });
            
                setQuestionnaireData(emptyResponse);
                setLoaded(true);
                
            }else{
                console.log("An error has occured when retrieving questionnaire.");
                    setMessage("Oops! No Questionnaire Available!");
            }
        }
        prepareQuestionnaire();
    }, [props.questionnaireID]);

    return (
        loaded?
            <Questionnaire
                readOnly = {true}
                questionnaire={questionnaire}
                submitQuestionnaire={()=>{}}
                questionnaireData={questionnaireData}
                handleQuestionnaireChange={()=>{}}
            />:<div>{message}</div>
    )
}

export default AdminViewStandardQuestionnaire;