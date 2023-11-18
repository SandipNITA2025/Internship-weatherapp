import React, { useState, useEffect } from "react";
import axios from "axios";

const WeatherCard = ({ data }) => {
  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);
  const [highTempCelsius, setHighTempCelsius] = useState([]);
  const [lowTempCelsius, setLowTempCelsius] = useState([]);
  const [highTempFahrenheit, setHighTempFahrenheit] = useState([]);
  const [lowTempFahrenheit, setLowTempFahrenheit] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    const getSunriseSunset = async (lat, lon) => {
      try {
        const apiKey = "b489f26d6f0c4d859e080beaeed1fa2d";
        const response = await axios.get(
          `https://api.ipgeolocation.io/astronomy?apiKey=${apiKey}&lat=${lat}&long=${lon}`
        );
        setSunrise(response.data.sunrise);
        setSunset(response.data.sunset);
      } catch (error) {
        console.error("Error fetching sunrise and sunset data", error);
      }
    };

    if (data && data.city && data.city.coord) {
      const { lat, lon } = data.city.coord;
      getSunriseSunset(lat, lon);
    }

    if (data && data.list) {
      const highsCelsius = data.list.map((day) =>
        (day.main.temp_max - 273.15).toFixed(1)
      );
      const lowsCelsius = data.list.map((day) =>
        (day.main.temp_min - 273.15).toFixed(1)
      );
      setHighTempCelsius(highsCelsius);
      setLowTempCelsius(lowsCelsius);

      const highsFahrenheit = highsCelsius.map((temp) =>
        ((temp * 9) / 5 + 32).toFixed(1)
      );
      const lowsFahrenheit = lowsCelsius.map((temp) =>
        ((temp * 9) / 5 + 32).toFixed(1)
      );
      setHighTempFahrenheit(highsFahrenheit);
      setLowTempFahrenheit(lowsFahrenheit);
    }
  }, [data]);
  const formatTime = (time) => {
    const date = new Date(time * 1000);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const renderForecast = () => {
    const uniqueDays = new Set();

    return data.list.map((day, index) => {
      const date = new Date(day.dt * 1000);
      const date1 = new Date(day.dt_txt);
      const formattedDate = date1.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
      const weatherCode = day.weather[0].main;
      const weatherImage = getWeatherImage(weatherCode);
      const city = `(${data.city.name})`;
      const coordinates = `(${data.city.coord.lat}, ${data.city.coord.lon})`;
      const humidity = day.main.humidity;

      if (uniqueDays.has(dayOfWeek)) {
        return null;
      }

      uniqueDays.add(dayOfWeek);

      return (
        <div className="w-full " key={day.dt}>
          <p className=" text-center font-semibold text-xl py-2">
            {formattedDate}
          </p>
          <div className="day-cardborder  w-[200px] md:w-[170px] p-3 border border-black flex flex-col gap-3 bg-gradient-to-t from-slate-900 to-stone-600 text-white font-semibold items-center rounded-lg overflow-hidden">
            <div className="code flex items-cente justify-center gap-2 w-full border-b pb-2">
              <img src={weatherImage} alt="Weather" />
              <p className=" text-xl">{weatherCode}</p>
            </div>
            <div className="">
              {highTempCelsius[index]}&deg;C / {highTempFahrenheit[index]}&deg;F
            </div>
            <p>
              {lowTempCelsius[index]}&deg;C / {lowTempFahrenheit[index]}&deg;F
            </p>
            <p> {humidity}%</p>
            <p> {sunrise}</p>
            <p> {sunset}</p>
          </div>
        </div>
      );
    });
  };

  const getWeatherImage = (weatherMain) => {
    switch (weatherMain.toLowerCase()) {
      case "clear":
        return "https://i.postimg.cc/X7hfyGPt/sunny.png";
      case "clouds":
        return "https://i.postimg.cc/YqjN9fd1/cloud.png";
      case "rain":
        return "https://i.postimg.cc/8kZBNnmp/rainy-day.png";
      case "snow":
        return "https://i.postimg.cc/Bb7xpXnL/winter.png";
      default:
        return "https://i.postimg.cc/X7hfyGPt/sunny.png";
    }
  };

  return (
    <div className="weather-card w-full mx-auto max-w-[1300px] p-2 flex">
      <div className="left mt-[2.4rem] pr-4">
        <div className="box flex  gap-3 flex-col">
          <div className="date">
            <p className="font-normal">Select Date:</p>
            <input
              type="date"
              value={selectedDate}
              className="bg-[#D9D9D9] p-1 w-fit rounded-sm text-[#444444] border border-black"
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          <div className="hight-temp font-semibold">High Temperature</div>
          <div className="low-temp font-semibold">Low Temperature</div>

          <div className="humidity font-semibold">Humidity</div>
          <div className="humidity font-semibold">Sunrise Time</div>
          <div className="humidity font-semibold">Sunset Time</div>
        </div>
      </div>
      <div className="right w-full flex items-center gap-4  overflow-x-scroll">
        {renderForecast()}
      </div>
    </div>
  );
};

export default WeatherCard;




