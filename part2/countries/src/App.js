import React, { useEffect, useState } from 'react';
import axios from 'axios';

import SingleCountryItem from './components/SingleCountryItem';
import SingleCountryView from './components/SingleCountryView';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [countryViewState, setCountryViewState] = useState(false);
  const [clickedCountry, setClickedCountry] = useState([]);

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then((response) => setCountries(response.data));
  }, []);

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
    setCountryViewState(false);
  };

  const trimString = (inputString) => {
    return inputString.trim().toLowerCase().replace(/\s+/g, '');
  };

  const searchedCountries = countries.filter((eachCountry) => {
    const trimmedInput = trimString(searchValue);
    const trimmedCountryName = trimString(eachCountry.name);
    return trimmedCountryName.includes(trimmedInput);
  });

  const handleClick = (event) => {
    setCountryViewState(!countryViewState);
    const clickedCountryName = event.target.getAttribute('data-name');
    const clickedCountry = searchedCountries.filter(
      (eachCountry) => eachCountry.name === clickedCountryName
    );
    setClickedCountry(clickedCountry);
  };

  const searchedCountriesComponents = searchedCountries.map((eachCountry) => (
    <SingleCountryItem
      countryViewState={countryViewState}
      key={eachCountry.alpha3Code}
      eachCountry={eachCountry}
      clickedCountry={clickedCountry}
      handleClick={handleClick}
    />
  ));

  const renderCountryViewComponents = (countriesArray) => {
    const countryViewComponents = countriesArray.map((eachCountry) => (
      <SingleCountryView
        key={eachCountry.alpha3Code}
        eachCountry={eachCountry}
      />
    ));

    return countryViewComponents;
  };

  const searchedCountriesViews = renderCountryViewComponents(searchedCountries);
  const clickedCountryView = renderCountryViewComponents(clickedCountry);

  const tooManyMatches = searchedCountries.length > 20;
  const onlyOneMatch = searchedCountries.length === 1;
  const singleCountryClicked = clickedCountry.length === 1 && countryViewState;
  const displayMatches =
    !tooManyMatches && !onlyOneMatch && !singleCountryClicked;

  return (
    <div>
      <input type='search' value={searchValue} onChange={handleSearch} />

      <br />

      {tooManyMatches && <span>Too many matches, specify another filter</span>}
      {onlyOneMatch && searchedCountriesViews}
      {singleCountryClicked && clickedCountryView}
      {displayMatches && searchedCountriesComponents}
    </div>
  );
};

export default App;
