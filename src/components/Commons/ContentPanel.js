/**
 * ====================================================================
 * REACT COMPONENT
 * ====================================================================
 * @date created: 16th May 2020
 * @authors: Guang Yang
 *
 * The content panel will display the content when people click the side bar
 *
 * This file is used to display the content panel
 *
 */

// Import Libraries
import React from "react";

// Import Screens
import {
    ManageQuestionnaires,
    DoTheTestContainer,
    InstructionsContainer,
    ViewQuestionnaireContainer,
    ShareContainer
} from "../../screens/Clinician";

import {
    SSQInstructionsList,
    CountryList,
    AdminViewStandardQuestionnaire,
    InstructionContainer,
    OrganisationList,
    OrganisationContainer,
    AdminManageQuestionnaires
} from "../../screens/Admin";

import {
    QuestionnaireContainer
} from "../../screens/Common";


// Import Utilities
import { USER_TYPE_CLINICIAN, USER_TYPE_ADMIN } from "../../utils/helper";

const ContentPanel = (props) => {
    // ========================================================================
    // Content Panel definition for Clinician
    // ========================================================================
    if (props.userType === USER_TYPE_CLINICIAN) {
        switch (props.active) {
            case 2:
                return (<DoTheTestContainer/>);
            case 3:
                return (<InstructionsContainer/>);
            case 4:
                return (
                    <QuestionnaireContainer
                        questionnaireID={props.questionnaireID}
                        redirectURL="/clinician"
                    />
                );
            case 5:
                return (
                    <ViewQuestionnaireContainer
                        questionnaireID={props.questionnaireID}
                    />
                );
            case 6:
                return (<ShareContainer/>);
            default:
                return (<ManageQuestionnaires/>);

        }

    // ========================================================================
    // Content Panel definition for admin
    // ========================================================================
    } else if (props.userType === USER_TYPE_ADMIN) {
        switch (props.active) {
            case 2:
                return (<SSQInstructionsList/>);
            case 3:
                return (<CountryList/>);
            case 4:
                return (
                    <QuestionnaireContainer
                        questionnaireID={props.questionnaireID}
                        redirectURL="/admin/Questionnaires"
                    />
                );
            case 5:
                return (
                    <AdminViewStandardQuestionnaire
                        questionnaireID={props.questionnaireID}
                    />
                );
            case 6:
                return (
                    <InstructionContainer
                        instructionType={props.instructionType}
                    />
                );
            case 7:
                return (<OrganisationList countryName={props.countryName}/>);

            case 8:
                return (<OrganisationContainer organName={props.organName}/>);
            default:
                return (<AdminManageQuestionnaires/>);

        }

    // ========================================================================
    // If not admin or clinician
    // ========================================================================
    } else {
        return null;
    }
};

export default ContentPanel;
