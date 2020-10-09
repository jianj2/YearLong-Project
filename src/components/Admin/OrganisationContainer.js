import React, { useEffect, useState } from 'react';
import { getOrganisationClinicians } from "../../utils/api";

const OrganisationContainer = ({ organName }) => {

    const [AllClinicianOrgan, setAllClinicianOrgan] = useState([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getAllClinicianInOrgan = async () => {
        const [statusCode, clinicians] = await getOrganisationClinicians(organName);
        if (statusCode === 200) {
            const clinicianIds = clinicians.map((c) => c.clinicianId);
            setAllClinicianOrgan(clinicianIds);
        }
    }

    useEffect(() => {
        getAllClinicianInOrgan();
    }, [getAllClinicianInOrgan])

    const MemberItem = ({
        clinicianID,
    }) => {
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
}

export default OrganisationContainer;