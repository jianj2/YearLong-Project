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

// Import Libraries.
import React, { useEffect, useState } from "react";
// Import Components.
import { getCountries } from "../../utils/api";

////////////////////////////////////////////////////////////////////////////////
////                            Define Component                            ////
////////////////////////////////////////////////////////////////////////////////
const CountryList = () => {
    const [countryList, setCountryList] = useState([]);

    const getCountryList = async () => { //To handle the data from the API
        const [statusCode, allCountries] = await getCountries();

        if (statusCode === 200) {
            let Coun_List = new Set(allCountries.map((item) => {
                return item.country.toUpperCase();
            }));
            setCountryList(Array.from(Coun_List));
        }
    };

    const CountryItem = ({ title }) => {
        return (
            <div
                className={
                    "country-list-item country-list-item-selectable"
                }
                onClick={() => {
                    const url = "/admin/" + title + "/Organisation";
                    window.location.href = url;
                }}
            >
                <div className="q-name">
                    {title}
                </div>

            </div>
        );
    };

    useEffect(() => {
        getCountryList();
    }, []);

    console.log(countryList);

    return (
        <div className="country-list-container">
            <h1>Countries</h1>
            {countryList.map((countries, index) =>
                <CountryItem
                    key={index}
                    title={countries}
                />)
            }
        </div>
    );
};

export default CountryList;