// Import Libraries
import React from "react";
// Import Utilities
import { USER_TYPE_CLINICIAN, USER_TYPE_ADMIN } from "../../utils/helper";
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

/**
 * =============================================================================
 * REACT COMPONENT
 * =============================================================================
 * @date created: 16th May 2020
 * @authors: Guang Yang, Waqas Rehmani
 *
 * The content panel will display the content when people click the side bar
 *
 * This file is used to display the content panel
 *
 */

////////////////////////////////////////////////////////////////////////////////
////                            Define Component                            ////
////////////////////////////////////////////////////////////////////////////////
const ContentPanel = ({
    userType,
    active,
    questionnaireID,
    instructionType,
    organName,
    countryName,
}) => {
    // ========================================================================
    // Content Panel definition for Clinician
    // ========================================================================
    if (userType === USER_TYPE_CLINICIAN) {
        switch (active) {
            case 2:
                return (<DoTheTestContainer/>);
            case 3:
                return (<InstructionsContainer/>);
            case 4:
                return (
                    <QuestionnaireContainer
                        questionnaireID={questionnaireID}
                        redirectURL="/clinician"
                    />
                );
            case 5:
                return (
                    <ViewQuestionnaireContainer
                        questionnaireID={questionnaireID}
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
    } else if (userType === USER_TYPE_ADMIN) {
        switch (active) {
            case 2:
                return (<SSQInstructionsList/>);
            case 3:
                return (<CountryList/>);
            case 4:
                return (
                    <QuestionnaireContainer
                        questionnaireID={questionnaireID}
                        redirectURL="/admin/Questionnaires"
                    />
                );
            case 5:
                return (
                    <AdminViewStandardQuestionnaire
                        questionnaireID={questionnaireID}
                    />
                );
            case 6:
                return (
                    <InstructionContainer
                        instructionType={instructionType}
                    />
                );
            case 7:
                return (<OrganisationList countryName={countryName}/>);

            case 8:
                return (<OrganisationContainer organName={organName}/>);
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
