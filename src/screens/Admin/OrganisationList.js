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
    const [counts, setCounts] = useState({});

    const OrganisationItem = ({ title, count }) => {
        return (
            <div
                className={
                    "organisation-list-item organisation-list-item-selectable"
                }
                onClick={() => {
                    const url = `/admin/Organisation/${countryName}/` + title.toLowerCase();
                    window.location.href = url;
                }}
            >
                <div className="q-name">{title}</div>
                <div>{count}</div>
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
                            return item.organisation.toUpperCase();
                        })
                    );
                    allOrganisation.forEach((o) => {
                        const org = o.organisation.toUpperCase();
                        counts[org] = counts[org] ? counts[org] + 1 : 1;
                    });
                    setCounts(counts);
                    const organisationList = Array.from(OrganList);
                    organisationList.sort((first, second) =>{
                        return counts[second] - counts[first];
                      }); 
                    setOrganisationSummary(organisationList);
                    
                }
            }catch(err){
                console.error(err);
            }
        };
        getOrganisationList();
    }, [countryName, counts]);

    return (
        <div className="organisation-list-container">
            <h1>Organisation</h1>
            {OrganisationSummary.map((organisation, index) => (
                <OrganisationItem key={index} 
                title={organisation}
                count = {counts[organisation]}/>
            ))}
        </div>
    );
};

export default OrganisationList;
