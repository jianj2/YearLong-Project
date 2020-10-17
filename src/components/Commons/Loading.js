// Import Libraries.
import React from "react";
// Import Styles.
import "../../styles/loading.css";

/**
 * =============================================================================
 * REACT COMPONENT CLASS
 * =============================================================================
 * @date created: 10th May 2020
 * @authors: Waqas Rehmani
 *
 * The Loading component defines our Loading component for the
 * application. This
 *
 */

////////////////////////////////////////////////////////////////////////////////
////                            Define Component                            ////
////////////////////////////////////////////////////////////////////////////////
const Loading = () => {
    return (
        <div className="loading">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
            >
                <circle
                    cx="50"
                    cy="50"
                    fill="none"
                    stroke="#eeeeee"
                    strokeWidth="8"
                    r="35"
                    strokeDasharray="164.93361431346415 56.97787143782138"
                    transform="rotate(5.84712 50 50)"
                >
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        repeatCount="indefinite"
                        dur="1s"
                        values="0 50 50;360 50 50"
                        keyTimes="0;1"
                    ></animateTransform>
                </circle>
            </svg>
        </div>
    );
};

export default Loading;
