// Import Libraries.
import React, { useEffect, useState } from "react";
// Import Components.
import { getCountries } from "../../utils/API";

/**
 * =============================================================================
 * REACT COMPONENT CLASS
 * =============================================================================
 * @date created: 5th September 2020
 * @authors: Jin Chen
 *
 * The CountryList handles the rendering of CountryList in the Admin Page.
 *
 */

////////////////////////////////////////////////////////////////////////////////
////                            Define Component                            ////
////////////////////////////////////////////////////////////////////////////////
const CountryList = () => {
    const [countryList, setCountryList] = useState([]);
    const [counts, setCounts] = useState({});
    

    const CountryItem = ({ title, count }) => {
        return (
            <div
                className={"country-list-item country-list-item-selectable"}
                onClick={() => {
                    const url = "/admin/Organisation/" + title;
                    window.location.href = url;
                }}
            >
                <div className="q-name">{title}</div>
                <div>{count}</div>
            </div>
        );
    };

    const getCountryList = async () => {
        const [statusCode, allCountries] = await getCountries();

        if (statusCode === 200) {
            let Coun_List = new Set(
                allCountries.map((item) => {
                    return item.country.toUpperCase();
                })
            );

            allCountries.forEach((c) => {
                const country = c.country.toUpperCase();
                counts[country] = counts[country] ? counts[country] + 1 : 1;
            });

            const countryList = Array.from(Coun_List);
            countryList.sort((first, second) =>{
                return counts[second] - counts[first];
              }); 
            setCounts(counts);
            setCountryList(countryList);
        }
    };
    useEffect(getCountryList, []);

    countryList.map((country) => {
        return country.toUpperCase() + counts[country.toUpperCase()];
    });

    return (
        <div className="country-list-container">
            <h1>Countries</h1>
            {countryList.map((country, index) => (
                <CountryItem
                    key={index}
                    title={country}
                    count={counts[country]}
                />
            ))}
        </div>
    );
};

export default CountryList;
