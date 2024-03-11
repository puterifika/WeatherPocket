function getWeather() {
    var city = document.getElementById("city_input").value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9fd7a449d055dba26a982a3220f32aa2`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            var weatherInfo = '';

            // City name
            weatherInfo += `<div class="weather-box">
                                <h2>City</h2>
                                <div>${data.name}</div>
                            </div>`;
            
            // Country
            weatherInfo += `<div class="weather-box">
                                <h2>Country</h2>
                                <div>${data.sys.country}</div>
                            </div>`;
            
            // Coordinate
            weatherInfo += `<div class="weather-box">
                                <h2>Coordinate</h2>
                                <div>[${data.coord.lon}, ${data.coord.lat}]</div>
                            </div>`;
            
            // Weather description
            weatherInfo += `<div class="weather-box">
                                <h2>Description</h2>
                                <div>${data.weather[0].description}</div>
                            </div>`;
            
            // Current temperature
            var temperatureInCelsius = data.main.temp - 273.15;
            weatherInfo += `<div class="weather-box">
                                <h2>Current Temperature</h2>
                                <div>${temperatureInCelsius.toFixed(2)}°C</div>
                            </div>`;
            
            // Min & Max temperature (converted to Celsius)
            var minTemperatureInCelsius = data.main.temp_min - 273.15;
            var maxTemperatureInCelsius = data.main.temp_max - 273.15;
            weatherInfo += `<div class="weather-box">
                                <h2>Min Temperature</h2>
                                <div>${minTemperatureInCelsius.toFixed(2)}°C</div>
                            </div>`;
            weatherInfo += `<div class="weather-box">
                                <h2>Max Temperature</h2>
                                <div>${maxTemperatureInCelsius.toFixed(2)}°C</div>
                            </div>`;
            
            // Humidity
            weatherInfo += `<div class="weather-box">
                                <h2>Humidity</h2>
                                <div>${data.main.humidity}%</div>
                            </div>`;
            
            // Pressure
            weatherInfo += `<div class="weather-box">
                                <h2>Pressure</h2>
                                <div>${data.main.pressure} hPa</div>
                            </div>`;
            
            // Wind speed
            weatherInfo += `<div class="weather-box">
                                <h2>Wind Speed</h2>
                                <div>${data.wind.speed} m/s</div>
                            </div>`;
            
            // Sunrise & Sunset
            var sunriseTime = new Date(data.sys.sunrise * 1000);
            var sunsetTime = new Date(data.sys.sunset * 1000);
            weatherInfo += `<div class="weather-box">
                                <h2>Sunrise</h2>
                                <div>${sunriseTime.toLocaleTimeString()}</div>
                            </div>`;
            weatherInfo += `<div class="weather-box">
                                <h2>Sunset</h2>
                                <div>${sunsetTime.toLocaleTimeString()}</div>
                            </div>`;

            // Display weather information in the weather_info div
            document.getElementById("weather_info").innerHTML = weatherInfo;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById("weather_info").innerText = "Failed to fetch weather data. Please try again.";
        });
}
