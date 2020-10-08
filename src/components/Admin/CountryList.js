import React, { useEffect, useState } from "react";

//import style
import "../../styles/organisationList.css";
// import { getCountries } from "../../utils/api";

// handles rendering of CountryList in the Admin Page
const CountryList = () => {

  const [CountryList, setCountryList] = useState([]);

  const getCountryList = async () => { //To handle the data from the API
    const [statusCode, allCountries] = await getCountires();
    if (statusCode === 200) {
      let Coun_List = new Set(allCountries.map((item) => {
        return item.organisation.toLowerCase();
      }));
      setCountryList(Array.from(OrganList));
    }
  }

  const CountryItem = ({
    title,
  }) => {
    return (
      <div
        className={
          "country-list-item country-list-item-selectable"
        }
        onClick={() => {
          const url = "/admin/country/" + title;
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

  return (
    <div className="country-list-container">
      <h1>Countries</h1>
      {CountryList.map((countries, index) =>
        <CountryItem
          key={index}
          title={countries}
        />
      )}
    </div>
  );
};

export default CountryList;