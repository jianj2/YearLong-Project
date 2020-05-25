/**
 * ====================================================================
 * REACT COMPONENT CLASS
 * ====================================================================
 * @date created: 17th May 2020
 * @authors: Catherine Song, Jin Chen
 *
 * The file defines BottomContainer that is part of the questionnaire
 * component. This is a screen component.
 * 
 * This file is used to display the Add New Question button
 *
 */

import React from "react";
import PropTypes from "prop-types";

// handles rendering of TopContainer in the Clinician page
const BottomContainer = (props) => {
    return (
        <div className="bottom-container">
            <button onClick={props.addQuestion}> ADD NEW QUESTION </button>
        </div>
    );
};
BottomContainer.protoTypes = {
    addQuestion: PropTypes.func
}

export default BottomContainer;
