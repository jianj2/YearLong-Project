/**
 * ====================================================================
 * REACT COMPONENT CLASS
 * ====================================================================
 * @date created: 15th August 2020
 * @authors: Jin Chen
 *
 *
 */

import React, {useEffect, useState} from "react";

//import style
import "../../styles/organisationList.css";
import {getOrganisations} from "../../utils/api";

// handles rendering of OrganisationList in the Admin Page
const OrganisationList = () => {

    const [OrganisationSummary, setOrganisationSummary] = useState([]);

    const getOrganisationList = async () => { //To handle the data from the API
        const allOrganisation= await getOrganisations();
        console.log(allOrganisation)
        let OrganList = new Set(allOrganisation.map((item)=>{
            return item.organisation.toLowerCase();
        }));
        setOrganisationSummary(Array.from(OrganList));
    }

    const OrganisationItem = ({
                                  title,
                              }) => {
        return (
            <div
                className={
                    "organisation-list-item organisation-list-item-selectable"
                }
                onClick={() => {
                    const url = "/admin/Organisation/" + title;
                    window.location.href = url;
                }}
            >
                <div className="q-name">
                    {title}
                </div>

            </div>
        );
    };

    useEffect(()=>{
        getOrganisationList();
    },[]);

    return (
        <div className="organisation-list-container">
            <h1>Organisation</h1>
            {OrganisationSummary.map((organisations,index)=>
                <OrganisationItem
                    key={index}
                    title={organisations}
                />
            )}
        </div>
    );
};

export default OrganisationList;