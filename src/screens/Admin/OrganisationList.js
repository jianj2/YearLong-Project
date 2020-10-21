// Import Libraries.
import React, { useEffect, useState } from "react";
// Import Utilities.
import { getOrganisations } from "../../utils/API";

/**
 * =============================================================================
 * REACT COMPONENT CLASS
 * =============================================================================
 * @date created: 15th August 2020
 * @authors: Jin Chen
 *
 * The OrganisationList component handles rendering of OrganisationList in
 * the Admin Page.
 *
 */

////////////////////////////////////////////////////////////////////////////////
////                            Define Component                            ////
////////////////////////////////////////////////////////////////////////////////
const OrganisationList = ({ countryName }) => {
    const [OrganisationSummary, setOrganisationSummary] = useState([]);

    const OrganisationItem = ({ title }) => {
        return (
            <div
                className={
                    "organisation-list-item organisation-list-item-selectable"
                }
                onClick={() => {
                    const url = `/admin/${countryName}/` + title;
                    window.location.href = url;
                }}
            >
                <div className="q-name">{title}</div>
            </div>
        );
    };

    useEffect(() => {
        const getOrganisationList = async () => {
            try {
                //To handle the data from the API
                const [statusCode, allOrganisation] = await getOrganisations(
                    countryName
                );
                if (statusCode === 200) {
                    let OrganList = new Set(
                        allOrganisation.map((item) => {
                            return item.organisation.toLowerCase();
                        })
                    );
                    setOrganisationSummary(Array.from(OrganList));
                }
            }catch(err){
                console.error(err);
            }
        };
        getOrganisationList();
    }, [countryName]);

    return (
        <div className="organisation-list-container">
            <h1>Organisation</h1>
            {OrganisationSummary.map((organisations, index) => (
                <OrganisationItem key={index} title={organisations}/>
            ))}
        </div>
    );
};

export default OrganisationList;