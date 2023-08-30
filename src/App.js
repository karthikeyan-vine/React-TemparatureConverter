import React, { useState } from "react";
import "./APP.css";

const App = () => {
  const [temperature, setTemperature] = useState("");
  const [unit, setUnit] = useState("celsius");
  const [convertedTemperature, setConvertedTemperature] = useState("");
  const [error, setError] = useState("");

  const temperatureDescriptions = [
    { min: -Infinity, max: 0, text: "Freezing", color: "#007BFF" },
    { min: 1, max: 10, text: "Cold", color: "#00CFFF" },
    { min: 11, max: 20, text: "Cool", color: "#4BFF00" },
    { min: 21, max: 30, text: "Moderate", color: "#FFC700" },
    { min: 31, max: 40, text: "Warm", color: "#FF5733" },
    { min: 41, max: Infinity, text: "Hot", color: "#FF1700" }
  ];

  const convertTemperature = () => {
    const temp = parseFloat(temperature);

    if (!/^-?\d*\.?\d+$/.test(temperature)) {
      setError("Please enter a valid numeric temperature.");
      setConvertedTemperature("");
      return;
    }

    setError("");

    if (unit === "celsius") {
      const convertedTemp = (temp * 9) / 5 + 32;
      setConvertedTemperature(`${convertedTemp.toFixed(2)} °F`);
      updateBackgroundColor(convertedTemp);
    } else {
      const convertedTemp = ((temp - 32) * 5) / 9;
      setConvertedTemperature(`${convertedTemp.toFixed(2)} °C`);
      updateBackgroundColor(convertedTemp);
    }
  };

  const getColorClass = (temperature) => {
    const tempValue = parseFloat(temperature);

    if (isNaN(tempValue)) {
      return ""; // No specific color for invalid input
    } else if (tempValue >= 30) {
      return "hot";
    } else if (tempValue >= 20) {
      return "warm";
    } else if (tempValue >= 10) {
      return "cool";
    } else {
      return "cold";
    }
  };

  const handleSwap = () => {
    if (!/^-?\d*\.?\d+$/.test(temperature)) {
      setError("Please enter a valid numeric temperature.");
      return;
    }

    setError("");
    setUnit(unit === "celsius" ? "fahrenheit" : "celsius");
    convertTemperature();
  };

  const getTemperatureDescription = (temperature) => {
    const tempValue = parseFloat(temperature);
    const description = temperatureDescriptions.find(
      (range) => tempValue >= range.min && tempValue <= range.max
    );
    return description ? description.text : "";
  };

  const updateBackgroundColor = (temp) => {
    const description = temperatureDescriptions.find(
      (range) => temp >= range.min && temp <= range.max
    );

    if (description) {
      document.documentElement.style.setProperty(
        "--base-bg-color",
        description.color
      );
    }
  };

  return (
    <div className={`App ${getColorClass(convertedTemperature)}`}>
      <h1>Temperature Converter</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder={`Enter temperature (${
            unit === "celsius" ? "°C" : "°F"
          })`}
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
        />
        <label>
          <input
            type="radio"
            value="celsius"
            checked={unit === "celsius"}
            onChange={() => setUnit("celsius")}
          />
          Celsius
        </label>
        <label>
          <input
            type="radio"
            value="fahrenheit"
            checked={unit === "fahrenheit"}
            onChange={() => setUnit("fahrenheit")}
          />
          Fahrenheit
        </label>
        <button className="convert-button" onClick={convertTemperature}>
          Convert
        </button>
        <button className="swap-button" onClick={handleSwap}>
          Swap
        </button>
      </div>
      <div className="temperature-container">
        <p className="error">{error}</p>
        <p className={`temperature`}>
          {getTemperatureDescription(convertedTemperature)}{" "}
          {convertedTemperature}
        </p>
      </div>
    </div>
  );
};

export default App;
