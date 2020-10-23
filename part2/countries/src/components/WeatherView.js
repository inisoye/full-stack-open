import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WeatherView = ({ eachCountry }) => {
  const [weatherData, setWeatherData] = useState([]);
  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${eachCountry.capital}&appid=${apiKey}`
      )
      .then((response) => setWeatherData(response.data));
  }, [eachCountry.capital, apiKey]);

  let temp;
  let windSpeed;
  let imgUrl;
  let windDirectionIndex;
  let windDirection;

  /* The API provides wind direction in degrees and not compass direction. 
  The array below is used to convert the latter to the former.
  Explained here: https://www.campbellsci.com/blog/convert-wind-directions */
  const windDirectionsArray = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW',
    'N',
  ];

  try {
    // Convert to Celcius
    temp = (weatherData.main.temp - 273.15).toFixed();

    imgUrl = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

    // Convert to mph
    windSpeed = (weatherData.wind.speed * 2.23694).toFixed();

    //Convert to compass direction
    windDirectionIndex = (weatherData.wind.deg / 22.5 + 1).toFixed();
    windDirection = windDirectionsArray[windDirectionIndex];
  } catch (err) {}

  return (
    <>
      <h3>Weather in {eachCountry.capital}</h3>
      <p>
        <strong>temperature: </strong>
        {temp} <sup>o</sup>Celcius
      </p>
      <img src={imgUrl} alt='' />
      <p>
        <strong>wind: </strong>
        {windSpeed} mph direction {windDirection}
      </p>
    </>
  );
};

export default WeatherView;
