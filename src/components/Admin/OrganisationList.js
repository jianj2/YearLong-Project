/**
 * ====================================================================
 * REACT COMPONENT CLASS
 * ====================================================================
 * @date created: 15th August 2020
 * @authors: Jin Chen
 *
 *
 */

import React from "react";

//import style
import "../../styles/organisationList.css";

// handles rendering of OrganisationList in the Admin Page
const OrganisationList = () => {

    const OrganisationItem = ({
                                  title,
                              }) => {
        return (
            <div
                className={
                    "organisation-list-item organisation-list-item-selectable"
                }
            >
                <div className="q-name">
                    {/*{title}*/}
                    test
                </div>

            </div>
        );
    };


    return (
        <div className="organisation-list-container">
            <h1>Organisation</h1>
            <OrganisationItem />
        </div>
    );
};


export default OrganisationList;