import React, { useState, useEffect } from "react";
import * as API from "../../utils/api";
import Questionnaire from "../Questionnaire";
const ViewQuestionnaireContainer = (props) => {


    const [questionnaire, setSelectedQuestionnaire] = useState({
        questionnaireId: "",
        title: "",
        description: "",
        sections: [],
        isStandard: false,
    });

    const [questionnaireData, setQuestionnaireData] = useState([]);
    const [loaded, setLoaded] = useState(false);


   
    // get the questionnaire content from API
    useEffect(() =>{
    
        const prepareQuestionnaire = async () => {
            const questionnaire = await API.getAndSetSpecificQuestionnaire(props.questionnaireID,setSelectedQuestionnaire);
            setSelectedQuestionnaire(questionnaire);
            let emptyResponse = [];
            console.log(`current q: ${questionnaire.title}`);
            if (questionnaire.questionnaireId !== ""){
            
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
            } else {
                console.log("An error has occured when setting empty response for questionnaire");
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
                />:<div></div>
    );



}

export default ViewQuestionnaireContainer;