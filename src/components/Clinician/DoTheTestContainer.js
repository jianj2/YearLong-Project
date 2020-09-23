/**
 * ====================================================================
 * REACT COMPONENT CLASS
 * ====================================================================
 * @date created: 14th May 2020
 * @authors: Jin Chen, Guang Yang
 *
 * The Sidebar component defines our SideBar for the application. This
 * will visible at the top of our application.
 *
 * This file is used to display the Sidebar component
 *
 */

// Import Libraries
import React, { useEffect, useState } from "react";
import { useAuth0 } from "../../utils/react-auth0-spa";

// Import Components
import QuestionnaireList from "../QuestionnaireList";
import Questionnaire from "../Questionnaire";
import ParentReviewSubmission from "../ParentReviewSubmission";
import FormParentDetails from "../FormParentDetails";

// Import Utils
import {
    getClinicianQuestionnaires,
    getQuestionnaireById,
    completeQuestionnaire,
    getStandardisedQuestionnaires,
} from "../../utils/api";

// Import Styles
import "../../styles/clinicianDoTheTest.css";
import Loading from "../Loading";

// handles rendering of QuestionnaireContainer in the Clinician Page
const DoTheTestContainer = () => {
    const { user, token } = useAuth0();
    const [wizardStep, setWizardStep] = useState(-1);
    const [loading, setLoading] = useState(false);
    const [personalDetails, setPersonalDetails] = useState({
        name: "",
        date: "",
        completedBy: "clinician",
        rightDeviceType: "",
        leftDeviceType: "",
    });

    const [questionnaires, setQuestionnaires] = useState([]);
    const [
        standardisedQuestionnaires,
        setStandardisedQuestionnaires,
    ] = useState([]);
    const [questionnaireData, setQuestionnaireData] = useState([]);


    console.log("questionnaires", questionnaires)
    console.log("standardisedQuestionnaires", standardisedQuestionnaires)
    // ==================================================================
    // TODO: USE THIS VARIABLE TO STORE COMMENT DATA
    const [commentData, setCommentData] = useState([]);
    // ==================================================================

    const [selectedQuestionnaire, setSelectedQuestionnaire] = useState({
        questionnaireId: "",
        title: "",
        description: "",
        sections: [],
        isStandard: false,
    });

    // This is called whenever "user" changes
    useEffect(() => {
        async function retrieveStandardisedQuestionnaires() {
            const [statusCode, data] = await getStandardisedQuestionnaires();
            if (statusCode === 200) {
                setStandardisedQuestionnaires(data);
            }else{
                console.error(data);
            }
        }
        async function retrieveCustomisedQuestionnaires() {
            const [statusCode, data] = await getClinicianQuestionnaires(token, user.name);
            if (statusCode === 200){
                setQuestionnaires(data);
            }else{
                console.error(data);
            }
        }
        if (user && token !== "") {
            retrieveCustomisedQuestionnaires();
            retrieveStandardisedQuestionnaires();
        }
    }, [user, token]);

    // Method called to go to the next page in the wizard.
    const nextStep = () => {
        setWizardStep(wizardStep + 1);
    };
    // Method called to go to the preivious page in the wizard.
    const prevStep = () => {
        setWizardStep(wizardStep - 1);
    };
    // Method called to reset wizard.
    const resetStep = () => {
        setWizardStep(-1);
    };

    // Method called to go to the instructions page in the wizard.
    const submitDetails = (data) => {
        // to make sure field is not empty.
        getPersonalDetails["completedBy"] = "clinician";
        setPersonalDetails(getPersonalDetails);
        console.log("details submitted", data);
        nextStep();
    };
    // Method called when we submit the questionnaire.
    const submitQuestionnaire = (data) => {
        nextStep();
    };

    // Method called to update questionnaire data when a question is updated.
    const handleQuestionnaireChange = (
        sectionIndex,
        scenarioIndex,
        questionIndex,
        data
    ) => {
        let temp = [...questionnaireData];
        temp[sectionIndex][scenarioIndex][questionIndex] = data;
        setQuestionnaireData(temp);
    };

    // Method called to update comment data when a scenario comment is updated.
    const handleCommentChange = (sectionIndex, scenarioIndex, data) => {
        let temp = [...commentData];
        temp[sectionIndex][scenarioIndex] = data;
        setCommentData(temp);
    }

    const onClickQuestion = async (questionnaireId) => {
        console.log("questionnaire clicked", questionnaireId);
        setWizardStep(0);
        const [statusCode, data] = await getQuestionnaireById(
            questionnaireId
        );

        if (statusCode === 200) {
            const questionnaire = data;
            let tempResponse = [];
            let tempComments = [];
            questionnaire.sections.forEach((section, sectionIndex) => {
                tempResponse[sectionIndex] = [];
                tempComments[sectionIndex] = [];
                section.scenarios.forEach((scenario, scenarioIndex) => {
                    tempResponse[sectionIndex][scenarioIndex] = [];
                    tempComments[sectionIndex][scenarioIndex] = "";
                    scenario.questions.forEach((question, questionIndex) => {
                        tempResponse[sectionIndex][scenarioIndex][
                            questionIndex
                        ] = {
                            value: "",
                            supplementaryValue: "",
                        };
                    });
                });
            });
            // Updating the state using the initial data and the questionnaire
            // retrieved from the server.
            setCommentData(tempComments);
            setQuestionnaireData(tempResponse);
            setSelectedQuestionnaire(questionnaire);
        } else {
            console.log(data);
        }
    };

    const getPersonalDetails = (data) => {
        setPersonalDetails(data);
    };

    const submitResponse = () => {
        setLoading(true);
        let data = {
            questionnaireData,
            personalDetails,
            clinicianEmail: user.name,
            questionnaireId: selectedQuestionnaire.questionnaireId,
            comments:commentData
        };

        completeQuestionnaire(token, data)
            .then((res) => {
                console.log("complete question", res);
                setWizardStep(3);
                setLoading(false);
            });
    };

    if (wizardStep === 0) {
        return (
            <div className="dothetest-container">
                <div className="dothetest-subheader-container">
                    <button className="button" onClick={prevStep}>
                        B A C K
                    </button>
                    <button
                        className="button"
                        form="parents-detail-form"
                        type="submit"
                    >
                        N E X T
                    </button>
                </div>

                <FormParentDetails
                    submitDetails={submitDetails}
                    clinicianAccess={true}
                    defaultValue={personalDetails}
                    getPersonalDetails={getPersonalDetails}
                />
            </div>
        );
    } else if (wizardStep === 1) {
        return (
            <div className="dothetest-container">
                <div className="dothetest-subheader-container">
                    <button className="button" onClick={prevStep}>
                        B A C K
                    </button>
                </div>

                <Questionnaire
                    questionnaire={selectedQuestionnaire}
                    submitQuestionnaire={submitQuestionnaire}
                    questionnaireData={questionnaireData}
                    commentData={commentData}
                    handleCommentChange={handleCommentChange}
                    handleQuestionnaireChange={handleQuestionnaireChange}
                />
            </div>
        );
    } else if (wizardStep === 2) {
        return (
            <div className="dothetest-container">
                <div className="dothetest-subheader-container">
                    <button className="button" onClick={prevStep}>
                        B A C K
                    </button>
                    <button className="button" onClick={submitResponse}>
                        S U B M I T
                    </button>
                </div>

                {loading ? <Loading /> : null}

                <ParentReviewSubmission
                    questionnaire={selectedQuestionnaire}
                    personalDetails={personalDetails}
                    questionnaireData={questionnaireData}
                    commentData={commentData}
                />
            </div>
        );
    } else if (wizardStep === 3) {
        return (
            <div className="dothetest-container">
                <div className="dothetest-submit">
                    <h1>Questionnaire Completed!</h1>
                    <p>
                        A report will be sent to your registered email address.
                    </p>
                    <button className="button" onClick={resetStep}>
                        G O &nbsp; B A C K
                    </button>
                </div>
            </div>
        );
    } else {
        return (
            <div className="dothetest-container">
                <QuestionnaireList
                    questionnaires={standardisedQuestionnaires}
                    listTitle={"Standard Questionnaires"}
                    isSelectable={true}
                    onClickQuestion={onClickQuestion}
                    canEdit={false}
                    onClickEdit={() => {}}
                    canDelete={false}
                    onClickDelete={() => {}}
                />
                <QuestionnaireList
                    questionnaires={questionnaires}
                    listTitle={"My Customised Questionnaires"}
                    isSelectable={true}
                    onClickQuestion={onClickQuestion}
                    canEdit={false}
                    onClickEdit={() => {}}
                    canDelete={false}
                    onClickDelete={() => {}}
                />
            </div>
        );
    }
};

export default DoTheTestContainer;
