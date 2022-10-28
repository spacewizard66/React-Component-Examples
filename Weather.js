import React from "react";
import { useState, useEffect } from "react";

function Weather() {
	// "useState()" React hook to setup important variables
	const [unit, setUnit] = useState(null);
	const [data, setData] = useState(null);
	const [location, setLocation] = useState("");

	// Uses the "useEffect()" React hook to initialize
	// the "unit" variable to be Fahrenheit (true)
	useEffect(() => {
		setUnit(true);
	}, []);

	const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=4ebb9418ca605fa1931880e565ec065c`;

	// Function to Fetch API data when a search input is Entered
	const fetchAPI = async (event) => {
		// Checks if the "Event" was the "Enter" key, then runs
		if (event.key === "Enter") {
			try {
				const response = await fetch(url);
				const results = await response.json();
				// Sets the Data variable to the APIs response in JSON format
				setData(results);
				console.log(results);
				console.log("HEELLOOO TESTING");
			} catch (error) {
				setData(error);
			}
		}
	};

	// Function to FLIP temperature "unit" to its opposite
	const flip = (unit) => {
		unit ? setUnit(!unit) : setUnit(true);
		console.log(unit);
		return unit;
	};

	// Equation to Calculate Fahrenheit
	const fahrenheit = (c) => {
		const f = c * 1.8 + 32;
		return Math.floor(f, 10);
	};

	// Selects the Correct Unit to be shown based on the "unit" variable
	const select = (temp) => {
		return unit ? fahrenheit(temp) : Math.floor(temp, 10);
	};

	return (
		<div className="container">
			<div className="search">
				<input
					className="search-bar"
					value={location}
					onChange={(event) => setLocation(event.target.value)}
					onKeyPress={fetchAPI}
					placeholder="Enter Location"
					type="text"
				/>
				<button
					className="unit-button"
					type="button"
					onClick={() => flip(unit)}>
					    {unit ? "°C" : "°F"}
				</button>
			</div>

			<div className="temperature">
				{!data ? (
					<h1>Welcome to the Weather App</h1>
				) : (
					<h1 className="temp">{`${select(data.main.temp)}°${
						unit ? "F" : "C"
					}`}</h1>
				)}
			</div>

			<div className="location-div">
				{data ? (
					<p className="location">{`${data.name}, ${data.sys.country}`}</p>
				) : null}
			</div>

			{data ? (
				data.main ? (
					<div className="main">
						<div className="description">
							<h2>{`${data.weather[0].description}`}</h2>
						</div>

						<div className="bottom">
							<div className="feels-like">
								<h4>{`${select(data.main.feels_like)}°${
									unit ? "F" : "C"
								}`}</h4>
								<p>Feels Like</p>
							</div>
							<div className="humidity">
								<h4>{data.main.humidity}%</h4>
								<p>Humidity</p>
							</div>
							<div className="wind-speed">
								<h4>{Math.floor(data.wind.speed)} MPH</h4>
								<p>Wind Speed</p>
							</div>
						</div>
					</div>
				) : null
			) : null}
		</div>
	);
}

export default Weather;
