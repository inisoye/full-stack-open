import React from 'react';
import WeatherView from './WeatherView';

const SingleCountryView = ({ eachCountry }) => {
  return (
    <div>
      <h2>{eachCountry.name}</h2>
      <p>
        <span>capital: {eachCountry.capital}</span>
        <br />
        <span>population: {eachCountry.population}</span>
      </p>

      <h3>languages</h3>
      <ul>
        {eachCountry.languages.map((eachLanguage) => (
          <li key={eachLanguage.iso639_2}>{eachLanguage.name}</li>
        ))}
      </ul>

      <br />

      <img
        src={eachCountry.flag}
        width={'200px'}
        alt={`${eachCountry.name} flag`}
      />

      <br />

      <WeatherView eachCountry={eachCountry} />
    </div>
  );
};

export default SingleCountryView;
