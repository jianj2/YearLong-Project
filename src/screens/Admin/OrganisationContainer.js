// Import Libraries.
import React, { useEffect, useState } from "react";
// Import Utilities.
import { getOrganisationClinicians } from "../../utils/api";

/**
 * =============================================================================
 * REACT COMPONENT CLASS
 * =============================================================================
 * @date created: 20th August 2020
 * @authors: Jin Chen
 *
 * The OrganisationContainer handles the rendering of organisation in the
 * Admin Page.
 *
 */

////////////////////////////////////////////////////////////////////////////////
////                            Define Component                            ////
////////////////////////////////////////////////////////////////////////////////
const OrganisationContainer = ({ organName }) => {
    const [AllClinicianOrgan, setAllClinicianOrgan] = useState([]);

    useEffect(() => {
        const getAllClinicianInOrgan = async () => {
            const [statusCode, clinicians] = await getOrganisationClinicians(organName);
            if (statusCode === 200) {
                const clinicianIds = clinicians.map((c) => c.clinicianId);
                setAllClinicianOrgan(clinicianIds);
            }
        };
        getAllClinicianInOrgan();
    }, [organName]);

    const MemberItem = ({ clinicianID }) => {
        return (
            <div
                className={
                    "organisation-list-item organisation-list-item-selectable"
                }
                onClick={() => {
                }}
            >
                <div className="q-name">
                    {clinicianID}
                </div>
            </div>
        );
    };

    return (
        <div>
            <h1>Members in {organName}</h1>
            {AllClinicianOrgan.map((item, index) =>
                <MemberItem
                    key={index}
                    clinicianID={item}
                />
            )}
        </div>
    );
};

export default OrganisationContainer;