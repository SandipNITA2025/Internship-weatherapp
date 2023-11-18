import React, { useState } from "react";
import { MdMyLocation } from "react-icons/md";
import { IoSearch } from "react-icons/io5";

const WeatherSearch = ({ onSearch, data }) => {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    onSearch(city);
    setCity("");
  };

  // console.log(data?.city);

  const cityName = data?.city;
  const coordinates = `(${data?.city?.coord?.lat}, ${data?.city?.coord?.lon})`;

  return (
    <div className="weather-search w-full max-w-[1366px] mx-auto flex  md:flex-col-reverse md:gap-2 items-center justify-between m-4 mt-5 p-2 border-b border-b-slate-700">
      <div className="location">
        <div className="flex items-center gap-2 text-2xl font-semibold">
          <MdMyLocation /> {cityName?.name}
        </div>
        <p className=" text-center">{coordinates}</p>
      </div>

      <div className="search flex items-center md:w-full md:justify-center">
        <input
          className=" p-2 focus:outline-none md:w-[80%]"
          type="text"
          placeholder="Search your city here..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className=" bg-white p-2" onClick={handleSearch}>
          <IoSearch size={24} />
        </button>
      </div>
    </div>
  );
};

export default WeatherSearch;
