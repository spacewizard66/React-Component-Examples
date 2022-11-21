import React from "react";
/* import { useState, useEffect } from "react"; */
/* import Main from "./Main"; */
import "../index.css"

class Weather extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			unit: true,
			location: "",
			data: null,
			error: null,
			animation: true,
		}
	}
/* 
	// "useState()" React hook to setup important variables
	const [unit, setUnit] = useState(true);
	const [data, setData] = useState(null);

	const [location, setLocation] = useState("");
    const [error, setError] = useState();

	// Uses the "useEffect()" React hook to initialize
	// the "unit" variable to be Fahrenheit (true)
	useEffect(() => {
		setUnit(true);
	}, []); 
*/

	render() {

		/* let data = this.state.data */

		const url = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.location}&units=metric&appid=4ebb9418ca605fa1931880e565ec065c`;

		// Function to Fetch API data when a search input is Entered
		const fetchAPI = async (event) => {
			// Checks if the "Event" was the "Enter" key, then runs
			if (event.key === "Enter") {
				try {
					const response = await fetch(url);
					const results = await response.json();
					// Sets the Data variable to the APIs response in JSON format
					this.setState({data: results});
				} catch (err) {
					this.setState({data: err});
				}
			}
		};

		// Function to FLIP temperature "unit" to its opposite
		const flip = (unit) => {
			unit ? this.setState({unit: !unit}) : (this.setState({unit: true}));
			return unit;
		};

		// Equation to Calculate Fahrenheit
		const fahrenheit = (c) => {
			const f = c * 1.8 + 32;
			return Math.floor(f, 10);
		};

		// Selects the Correct Unit to be shown based on the "unit" variable
		const select = (temp) => {
			return this.state.unit ? fahrenheit(temp) : Math.floor(temp, 10);
		};

		
	
		return (
			<div className="container" >
				<div className="search">
					<input
						className="search-bar"
						value={this.state.location}
						onChange={(event) => this.setState({location: event.target.value})}
						onKeyPress={fetchAPI}
						placeholder="Please Enter a Location Name"
						type="text"
					/>
					{this.state.data ? (
						<button
						className="unit-button"
						type="button"
						onClick={() => flip(this.state.unit)}>
							{this.state.unit ? "°C" : "°F"}
						</button>
					) : (
						null
					)}
				</div>

				{this.state.data ? (
					this.state.data.main ? (
						<div className="main">
							<div className="location-div" id={this.state.animation ? "animate" : ""} /* onAnimationEnd={this.setState({animation: !this.state.animation})} */>
								<p className="location">{`${this.state.data.name}, ${this.state.data.sys.country}`}</p>
							</div>

							<div className="temp-div">
								<h1 className="temp">{`${select(this.state.data.main.temp)}°${this.state.unit ? "F" : "C"}`}</h1>
							</div>

							<div className="bottom">
								<div className="description">
									<p>{`${this.state.data.weather[0].description}`}</p>
								</div>

								<div className="extra">
									<div className="feels-like">
										<p>{`${select(this.state.data.main.feels_like)}°${this.state.unit ? "F" : "C"}`}</p>
										<p>Feels Like</p>
									</div>
									<div className="humidity">
										<p>{this.state.data.main.humidity}%</p>
										<p>Humidity</p>
									</div>
									<div className="wind-speed">
										<p>{Math.floor(this.state.data.wind.speed)} MPH</p>
										<p>Wind Speed</p>
									</div>
								</div>
							</div>
							{/* {this.setState({animation: !this.state.animation})} */}
							{console.log(this.state.animation)}
						</div>
						
					) : (
						<div>
							<div className="location-div">
								<p className="location">{'Sorry, city not found   :('}</p>
							</div>
						</div>
					)
				) : (
					! this.state.error ? (
						<div className="temp-div">
							<h1 className="temp">Weather Forecast</h1>
						</div>
					) : (
						<div>
							<h1>Uh oh, there seems to have been a problem :/</h1>
						</div>
					)
				)}
			{/* {this.setState({animation: true})} */}
			</div>
		);
	}
}

export default Weather;
