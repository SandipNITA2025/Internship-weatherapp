import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
import WeatherSearch from './components/WeatherSearch';

import Navbar from './components/Navbar';


const App = () => {
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = async (city) => {
    try {
      const apiKey = 'fdd461298f9bc2cb455b5460cb9bd6db';
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
      );
      setWeatherData(response.data);
      // console.log(response.data)
    } catch (error) {
      console.error('Error fetching weather data', error);
    }
  };

  useEffect(() => {
    fetchWeatherData('Agartala'); 
  }, []);

  return (
    <div className="app w-full ">
      <Navbar/>
      <WeatherSearch data={weatherData} onSearch={fetchWeatherData} />
      {weatherData && <WeatherCard data={weatherData} />}
    </div>
  );
};

export default App;
