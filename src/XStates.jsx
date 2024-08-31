import React, { useState, useEffect } from "react";
import "./XStates.css"; // Assuming CSS is in XStates.css

const XStates = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [finalSelection, setFinalSelection] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://crio-location-selector.onrender.com/countries"
        );
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Failed to load countries", error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchStates = async () => {
      if (selectedCountry) {
        try {
          const response = await fetch(
            `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
          );
          const data = await response.json();
          setStates(data);
        } catch (error) {
          console.error("Failed to load states", error);
        }
      } else {
        setStates([]);
      }
    };
    fetchStates();
  }, [selectedCountry]);

  useEffect(() => {
    const fetchCities = async () => {
      if (selectedState) {
        try {
          const response = await fetch(
            `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
          );
          const data = await response.json();
          setCities(data);
        } catch (error) {
          console.error("Failed to load cities", error);
        }
      } else {
        setCities([]);
      }
    };
    fetchCities();
  }, [selectedCountry, selectedState]);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setStates([]);
    setCities([]);
    setSelectedState("");
    setSelectedCity("");
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    setCities([]);
    setSelectedCity("");
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
    setFinalSelection(
      `${event.target.value}, ${selectedState}, ${selectedCountry}`
    );
  };

  return (
    <div className="location-selector">
      <h1>Select Location</h1>
      <select value={selectedCountry} onChange={handleCountryChange}>
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
      <select
        value={selectedState}
        onChange={handleStateChange}
        disabled={!selectedCountry}
      >
        <option value="">Select State</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>
      <select
        value={selectedCity}
        onChange={handleCityChange}
        disabled={!selectedState}
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
      {finalSelection && (
        <h2>You Selected {finalSelection}</h2>
      )}
    </div>
  );
};

export default XStates;
