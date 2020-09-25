import React, {useEffect, useState} from 'react';
import {getOrganisationClinicians} from "../../utils/api";

const OrganisationContainer = ({organName}) =>{

    const [AllClinicianOrgan, setAllClinicianOrgan] = useState([]);
    const getAllClinicianInOrgan = async () => {
        const clinicians = await getOrganisationClinicians(organName);
        let res = [];
        clinicians.forEach((item)=>{
            res.push(item.clinicianId);
        });
        setAllClinicianOrgan(res);
    }

    useEffect(()=>{
        getAllClinicianInOrgan();
    },[])

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
                {AllClinicianOrgan.map((item,index)=>
                    <MemberItem
                        key={index}
                        clinicianID={item}
                    />
                )}
            </div>
        );
}

export default OrganisationContainer;