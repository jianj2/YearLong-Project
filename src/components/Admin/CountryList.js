import React, { useEffect, useState } from "react";

//import style
import "../../styles/countryList.css";
import { getCountries } from "../../utils/api";

// handles rendering of CountryList in the Admin Page
const CountryList = () => {

  // console.log(getCountries());
  const [countryList, setCountryList] = useState([]);

  const getCountryList = async () => { //To handle the data from the API
    try {
      const [statusCode, allCountries] = await getCountries();

      if (statusCode === 200) {
        let Coun_List = new Set(allCountries.map((item) => {
          return item.country.toUpperCase();
        }));
        setCountryList(Array.from(Coun_List));
      }
    }catch(error){
      console.error(error);
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
